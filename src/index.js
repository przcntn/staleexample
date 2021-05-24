// const Client = require("@replit/database");
// const repClient = new Client();
// repClient.delete()
const mintAsset = require('./mint-asset');
const sendAssetOne = require('./sendback1');
const sendAssetFive = require('./sendback5');
const cardano = require("./cardano");
// const express = require('express')
// const cors = require('cors')
const axios = require('axios');
const sendAsset1 = require('./sendback1Mint');
// const app = express()
// const port = 3000

const getAssets = amount => {
  if (amount > 120 && amount <122) return 10;
  if (amount > 80 && amount <82 ) return 5;
  if (amount > 18 && amount <20 ) return 1;
  return 0;
}

const getAmountId = amount => {
  if (amount > 120) return amount - 119;
  if (amount > 80) return amount - 79
  return amount - 17;
}
// app.use(cors())
// app.use(express.json());

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// app.use('/', async (req, res) => {
//   if(req.method === 'GET') {

const checkHash  = (total) => {
    return total > 0;
}

const generateAssets = async () => {
  try {
    // Get TXNs
    const txnResponse = await axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1qxzrlvdgjeympu9h9umgk68sewxma8gkn56j6zjyqv2sty3ve8umwdgdt90mqz0eyxmn2e3fh2u2jalecuu4ekrtrntsecw7aa/utxos?order=asc&count=100`, {
      headers: {
        project_id: 'zTZDBIGGhr99fhG8QfcdR15zFLy0FSs2'
      },
    })
    const data = txnResponse.data;
    console.log('txnResponse.data', data);
    const newHashes = []
    const allHashes = await Promise.all(data.map(async d => {
      const hash = d.tx_hash;
      console.log(hash)
      // Db call
      const hashRes = await axios.get(`https://cardinos.herokuapp.com/utxos?hash=${hash}`)
      const hashExists = hashRes.data.length > 0
      if(!checkHash(hashRes.data.total)) newHashes.push(hash)
      return;
    }));
    console.log('filteredHash', newHashes)
    // Compute new hashes and return
    const computedHashes = await Promise.all(newHashes.map(async txn => {
      console.log('individualtxn', txn);
      // DB add checked txns
      const res = await axios.post("https://cardinos.herokuapp.com/utxos/", {
        hash: txn,
      });
      const addressResponse = await axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/txs/${txn}/utxos`, {
        headers: {
          project_id: 'zTZDBIGGhr99fhG8QfcdR15zFLy0FSs2',
        },
      });
      const addressData = addressResponse.data;
      const senderAddress = addressData.inputs[0].address;
      console.log("checking tx = " + senderAddress)
      const senderAmount = addressData.outputs[0].amount.filter(amount => amount.unit === 'lovelace');
      //const senderAmount = cardano.toAda(addressData.outputs[0].amount[0].quantity);
      console.log("SenderAmount = "+cardano.toAda(senderAmount[0].quantity))
      return { senderAddress, senderAmount: cardano.toAda(senderAmount[0].quantity) };
    }));

    computedHashes.forEach(async (hash) => {
      const totalAssets = getAssets(computedHashes[0].senderAmount);
      if (totalAssets > 0) {
        console.log('totalAssets', totalAssets);
        const mintedAssets = [];
        // Mint each asset;
        console.log("Sender amount is:" +hash.senderAmount);
        // Add in the first ID to match the amount sent 
        //const amountID = getAmountId(hash.senderAmount);
        //const chosenDino = await axios.get('https://cardinos.herokuapp.com/dinos?amount=' + amountID)
        //mintedAssets.push(chosenDino.data.data[0].name);
  
        for (let index = 0; index < totalAssets; index++) {
          // Needs to be refactored based on exact spec for dino ids (do we pull them here and pass to mint asset func? or just mark as closed temporarily?)
          const dinos = await axios.get('https://cardinos.herokuapp.com/dinos?status=open');
          
          const numberOfOpenDinos = dinos.data.data.length;
          console.log(numberOfOpenDinos + "available")
          if (numberOfOpenDinos > 0) {
            console.log('num dinos', numberOfOpenDinos)
            const randomDino = dinos.data.data[Math.floor(Math.random() * numberOfOpenDinos)];
            console.log(randomDino._id)
            await axios.patch(`https://cardinos.herokuapp.com/dinos/${randomDino._id}`, {
              status: 'reserved',
            });
            const mintedAsset = await mintAsset('cardino5'); // change to randomDino 
            await axios.put(`https://cardinos.herokuapp.com/dinos/${randomDino._id}`, {
              status: 'minted',
            });
            console.log('mintedAsset', mintedAsset);
            mintedAssets.push(mintedAsset);
          }
        }
        console.log('mintedAssets', mintedAssets.length);
        // Do we neeed to send asset ideas back?
        let res;
        if (mintedAssets.length > 0) {
          res = await sendAsset1({receiver: hash.senderAddress, assets: mintedAssets, noMinted: mintedAssets.length });
        }
      }
    })
    // Calculate number of assets
   
    const begin = setTimeout(() => generateAssets(), 2500);
    // Will we have a sendback10?

  } catch (err) {
    console.log(err)
  }
}

generateAssets();