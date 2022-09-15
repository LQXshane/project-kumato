
# Kumato Generator Service

Supoprts creation of single NFT through traits defined under your `/Kumato` folder, and hybridization of two tomatoes. 

Note: traits image folder `\Kumato` is by design in .gitignore to protect rights of original drawings. 

## Usage

**Python Version:** py3.9

**Install requirements:**

`python3 -m pip install -r requirements.txt`

(May need manually install some more pip pkgs(e.g. fastapi, uvicorn), please just follow the error msg - -;)

**Gen0 Generator**

Run the command `python3 generate.py --amount AMOUNT --config CONFIG`
   
   where:
   1. `AMOUNT` is the amount of images to generate
   2. `CONFIG` is the path pointing to a `.json` file containing valid program configuration.
   
E.g. python3 generate.py --amount 16 --config config.json

**Hybrid Generator**

Run the command `python3 hybrid.py --NFT1 NFT_ID1 --NFT2 NFT_ID2 --config CONFIG`
   
   where:
   1. `NFT1`, `NFT2` are the ids of existed NFTs
   2. `CONFIG` is the path pointing to a `.json` file containing valid program configuration.
   
E.g. python3 hybrid.py --NFT1 1 --NFT2 10 --config config.json


## API

Run the command `uvicorn api:app --reload` to start service

**Gen0 Generator**

Curl:
```
curl -X 'GET' \
  'http://localhost:8000/getgen0?amount=16' \
  -H 'accept: application/json'
```
Request URL:
```
http://localhost:8000/getgen0?amount=16
```

Gen0 Generator only generates Gen0 NFTs and returns nothing.

Please check generated images and metadata in ./images and ./metadata folder.

You can change the amount by yourself, 24 is the maximum under current settings.

**Hybrid Generator(JSON ver)**

Curl:
```
curl -X 'GET' \
  'http://localhost:8000/gethybrid?NFT1=4&NFT2=5' \
  -H 'accept: application/json'
```
Request URL:
```
http://localhost:8000/gethybrid?NFT1=4&NFT2=5
```
Returned Content(JSON):
```
{
 "NFT ID":"21",
 "imageURL":"localhost:8000/images/21.png",
 "metadata":"localhost:8000/metadata/21.json"
}
```
You can change NFT1 and NFT2 by yourself.
