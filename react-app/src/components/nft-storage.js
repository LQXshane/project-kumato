import { NFTStorage } from 'nft.storage';
import { Button } from "./ui";
import * as React from 'react';


function FileUploader () {
  const client = new NFTStorage({ token: process.env.API_KEY })
  const hiddenFileInput = React.useRef(null);
  const [tokenId, setTokenId] = React.useState(1);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  async function handleChange(event) {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    const metadata = await client.store({
        id: tokenId,
        name: 'Tomato blob',
        description: 'Test upload',
        image: fileUploaded,
      });
      setTokenId(tokenId + 1);
    alert(metadata.url);
  };
  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
      </Button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
    </>
  );
};
export default FileUploader;