from collections import Counter
from PIL import Image
import argparse
import random
import json
import os

from lib.util.io import loadJSON, pathExists

# input: kumato_tokenId1, kumato_tokenId2

def create_new_image(config, existed_traits):
  new_image = {}

  for layer in config["layers"]:
    new_image[layer["name"]] = random.choices(layer["values"], layer["weights"])[0]
    # Future work:
    # if a certain trait is fully used, should have it removed from the config file for accelerating purpose.

  # check for incompatibilities
  for incomp in config["incompatibilities"]:
    for attr in new_image:
      if new_image[incomp["layer"]] == incomp["value"] and new_image[attr] in incomp["incompatible_with"]:
        return create_new_image(config, existed_traits)

  encoded_traits = ''
  for trait in new_image:
    encoded_traits += new_image[trait] + '/'

  if encoded_traits not in existed_traits:
    return new_image
  else:
    return create_new_image(config, existed_traits)

def gen_hybrid(tokenId_1, tokenId_2, config, prefix_path):
  father = loadJSON(prefix_path + tokenId_1 + '.json')
  mother = loadJSON(prefix_path + tokenId_2 + '.json')

  # check sterilization error
  father_sterilization_risk = father['sterilizationRisk']
  mother_sterilization_risk = mother['sterilizationRisk']
  child_sterilization_risk = int((father_sterilization_risk + mother_sterilization_risk) / 2)

  risk = random.randint(0, 100)

  if risk < child_sterilization_risk:
    return "HYBRID FAILED"

  # check origin type
  father_origin = father['originType']
  mother_origin = mother['originType']
  origin = "hybrid"
  if father_origin == "heirloom" and mother_origin == "heirloom":
    origin = "heirloom"
  fancy_chance = random.randint(1, 100)
  if fancy_chance % 49 == 0: # 2% chance to be "fancy"
    origin = "fancy"

  # check time to reproduce
  father_time = father['time2reproduce']
  mother_time = mother['time2reproduce']
  waitTime = max(father_time, mother_time)
  time2reproduce = int((father_time + mother_time) / 2)

  # to-do: if origin is "fancy", the tomato body should be found in a fancy tomato body pool!
  # currently we don't have any fancy tomato body img, will add in the future.
  trait_files = {}

  # build trait dict
  for trait in config["layers"]:
    trait_files[trait["name"]] = {}
    for x, key in enumerate(trait["values"]):
      trait_files[trait["name"]][key] = trait["filename"][x]

  for incomp in config["incompatibilities"]:
    if "default" in incomp:
      for layer in trait_files:
        trait_files[layer][incomp["default"]["value"]] = incomp["default"]["filename"]

  # generate a unique image
  # existed traits
  with open('./usedTraits/existedNFT.json') as outfile:
    existed_traits = json.load(outfile)
  try:
    token = create_new_image(config, existed_traits)
  except:
    print("No available NFT for now, please expand trait DB!")
    return "NOT ENOUGH TRAITS"
  print("Traits for new NFT")
  for trait in token:
    print(trait + ": " + token[trait])
  print("*" * 30)

  # For now, we just use some increasing integers.
  # Will use encoded string in future vers.
  new_tokenId = len(existed_traits) + 1

  # dump unique images
  attributes = []
  encoded_attr = ''
  for key in token:
    attributes.append({"trait_type": key, "value": token[key]})
    encoded_attr += token[key] + '/'

  token_metadata = {
    "image": config["baseURI"] + "/images/" + str(new_tokenId) + '.png',
    "tokenId": new_tokenId,
    "name": config["name"] + str(new_tokenId), # Future work: considering about padding.
    "description": config["description"],
    "attributes": attributes,
    "encodedAttributes": encoded_attr,
    "sterilizationRisk": child_sterilization_risk,
    "originType": origin,
    "time2reproduce": time2reproduce,
    "waitTime": waitTime,
    "origin#": max(father["origin#"], mother["origin#"]) + 1
  }
  with open('./metadata/' + str(new_tokenId) + '.json', 'w') as outfile:
    json.dump(token_metadata, outfile, indent=4)
  with open('./usedTraits/existedNFT.json') as outfile:
    json_decoded = json.load(outfile)
    json_decoded[encoded_attr] = new_tokenId
  json.dump(json_decoded, open('./usedTraits/existedNFT.json', 'w'))

  # save img
  layers = []
  for index, attr in enumerate(token):
    if attr != 'tokenId':
      layers.append([])

      if "/" in trait_files[attr][token[attr]]:
        layers[index] = Image.open(f'{trait_files[attr][token[attr]]}.png').convert('RGBA')
      else:
        layers[index] = Image.open(
          f'{config["layers"][index]["trait_path"]}/{trait_files[attr][token[attr]]}.png').convert('RGBA')

  if len(layers) == 1:
    rgb_im = layers[0].convert('RGBA')
    file_name = str(new_tokenId) + ".png"
    rgb_im.save("./images/" + file_name)
  elif len(layers) == 2:
    main_composite = Image.alpha_composite(layers[0], layers[1])
    rgb_im = main_composite.convert('RGBA')
    file_name = str(new_tokenId) + ".png"
    rgb_im.save("./images/" + file_name)
  elif len(layers) >= 3:
    main_composite = Image.alpha_composite(layers[0], layers[1])
    layers.pop(0)
    layers.pop(0)
    for index, remaining in enumerate(layers):
      main_composite = Image.alpha_composite(main_composite, remaining)
    rgb_im = main_composite.convert('RGBA')
    file_name = str(new_tokenId) + ".png"
    rgb_im.save("./images/" + file_name)

  return str(new_tokenId)


if __name__ == '__main__':

  hybrid_generator = argparse.ArgumentParser(prog='hybrid generate', usage='hybrid.py [options]')

  hybrid_generator.add_argument('-id1', '--NFT1', help="NFT tokenID 1")
  hybrid_generator.add_argument('-id2', '--NFT2', help="NFT tokenID 2")
  hybrid_generator.add_argument('-c', '--config', help="Configs")

  args = hybrid_generator.parse_args()

  # preset path
  prefix_path = './metadata/'
  NFTpath1 = prefix_path + args.NFT1 + '.json'
  NFTpath2 = prefix_path + args.NFT2 + '.json'

  if args.NFT1 and args.NFT2 and args.config:
    if pathExists(NFTpath1) and pathExists(NFTpath2) and pathExists(args.config):
      gen_hybrid(args.NFT1, args.NFT2, loadJSON(args.config), prefix_path)
    elif not pathExists(NFTpath1):
      print('hybrid generator: [error]: NFT file 1 specified doesn\'t exist.\n')
    elif not pathExists(NFTpath2):
      print('hybrid generator: [error]: NFT file 2 specified doesn\'t exist.\n')
    else:
      print('hybrid generator: [error]: config file specified doesn\'t exist.\n')
  else:
    print('generator: [error]: Missing inputs. Use -h to show the help menu.\n')