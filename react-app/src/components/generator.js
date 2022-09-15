import { Button, Section } from "./ui";
import * as React from 'react';
require('dotenv').config();
const axios = require('axios').default;

function GetPicture () {
    const generatorEndpoint = process.env.GENERATOR_ENDPOINT ;
    const [displayImage, setDisplayImage] = React.useState();

    // Want to use async/await? Add the `async` keyword to your outer function/method.
    async function handleClick() {
        console.log(generatorEndpoint);
        try {
            await axios({
                method: 'get',
                url: `${generatorEndpoint}/images/1.png`,
                headers: {"Content-Type": "application/json"},
                responseType: 'blob' 
            })
            .then(function (response) {
                // handle success
                console.log(response);
                setDisplayImage(URL.createObjectURL(response.data));
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                alert(error);
            })
            .then(function () {
                // always executed
            });
        } catch (error) {
            console.error(error);
        }
  }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  async function getHybrid() {
    console.log(generatorEndpoint);
    const NFT1 = getRandomInt(1, 12);
    const NFT2 = getRandomInt(1, 12);
    let imageURL = '';
    try {
    await axios({
            method: 'get',
            url: `${generatorEndpoint}/gethybrid?NFT1=${NFT1}&NFT2=${NFT2}`,
            headers: {"Content-Type": "application/json"}
        })
        .then(function (response) {
            // handle success
            console.log(response);
            if (response.data.imageURL !== '') {
                imageURL = response.data.imageURL;
            } else {
                alert("hybrid failed!");
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            alert(error);
        })
        .then(function () {
            // always executed
        });
    } catch (error) {
        console.error(error);
    }

    if (imageURL && imageURL !== '') {
        console.log(imageURL);
        const hybridResponse = await axios({
            method: 'get',
            url: `${generatorEndpoint}${imageURL.substring(14)}`,
            headers: {"Content-Type": "application/json"},
            responseType: 'blob' 
        });
        setDisplayImage(URL.createObjectURL(hybridResponse.data));
    }
}
    
    return (
      <>
        <form onSubmit={getHybrid} method="post">
            <Section>
                <label>
                    NFT1:
                    <input type="number" name="NFT1"/>
                </label>
                <label>
                    NFT2:
                    <input type="number" name="NFT2"/>
                </label>
            </Section>
            <Button type='submit' onClick={getHybrid} >
                START TO HYBRID &gt;&gt;&gt;
            </Button>
        </form>
        {displayImage && <img
        src={displayImage}
        alt="1" style={{ width: "50%", height: "50%" }}
        />}
        
      </>
    );
};

export default GetPicture;