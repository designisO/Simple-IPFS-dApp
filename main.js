// connection to wallet from moralis sdk

const serverUrl = "#";
const appId = "#";
Moralis.start({ serverUrl, appId });

// Login Function 

async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Welcome to IPFS Upload project by Orion. Enjoy!" })
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}

document.getElementById("btn-login").onclick = login;


// Upload an Image

uploadImage = async () => {
    const data = fileInput.files[0]
    const file = new Moralis.File(data.name, data)
    await file.saveIPFS();  

    console.log(file.ipfs(), file.hash())

    // provides the URL of the image
    return file.ipfs();
}



// Upload metadata object name and description

uploadMetadata = async (imageURL) => {
    // build the metadata object
    const name = document.getElementById('metadataName');
    const description = document.getElementById('metadataDescription');

    const metadata = {
        "name": name,
        "description": description,
        "image": imageURL

    }

    // saves the file to ipfs
    const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(metadata))});
    await file.saveIPFS();

    console.log(file.ipfs());
    console.log("learn this instead of just copying code is the best recommendation I can give you :) - Orion");


}



// Function for the upload button 

uploading = async () => {
    const image = await uploadImage();
    await uploadMetadata(image)
}
