// const Client = require("@replit/database");
// const repClient = new Client();
// repClient.delete()
//const mintAsset = require('./mint-asset');
//const sendAssetOne = require('./sendback1');
//const sendAssetFive = require('./sendback5');
const cardano = require("./cardano");
// const express = require('express')
// const cors = require('cors')
const axios = require('axios');
const sendAsset1 = require('./sendback1Mint');
// const app = express()
// const port = 3000

const generateAssets = async () => {
  try {

    //mintedAssets = ["cardino2833", "cardino3991", "cardino5090", "cardino5615", "cardino5722", "cardino590", "cardino6220", "cardino7478", "cardino8717", "cardino9140"]
    //mintedAssets = ["cardino2863", "cardino3408", "cardino6000", "cardino6615", "cardino9484"]
    //mintedAssets = ["cardino8668", "cardino6132"]
    mintedAssets = ['cardino3761', 'cardino1360', 'cardino1944', 'cardino6134', 'cardino6779', 'cardino9177', 'cardino3352', 'cardino7554', 'cardino2340', 'cardino8523']

    senderAddress = "addr1qxu4gtn7xe26qkp8svvxwf7q2xu7p7nvdyxhez690kxavd4ggy7qjpt55gkchfck96mga05jtw0g6lwf6z4h7cr879usmurxm3"
    let res;
    if (mintedAssets.length > 0) {
      res = await sendAsset1({ receiver: senderAddress, assets: mintedAssets, noMinted: mintedAssets.length });
    }
  }
  catch (err) {
    console.log(err)
    return
  }
}

generateAssets();