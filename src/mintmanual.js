// const Client = require("@replit/database");
// const repClient = new Client();
// repClient.delete()
const mintAsset = require('./mint-asset');
//const sendAssetOne = require('./sendback1');
//const sendAssetFive = require('./sendback5');
const cardano = require("./cardano");
// const express = require('express')
// const cors = require('cors')
const axios = require('axios');
const sendAsset1 = require('./sendback1Mint');
// const app = express()
// const port = 3000

const getAssets = amount => {
  if (amount > 120 && amount < 122) return 10;
  if (amount > 80 && amount < 82) return 5;
  if (amount > 18 && amount < 20) return 1;
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



const checkHash = (total) => {
  return total > 0;
}

const generateAssets = async (data) => {
    for (let i = 0; i < data.length; i++) {
      try {
        // Get TXNs 
        /*
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
        const newHashes = []
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
        */

        //computedHashes.forEach(async (hash) => {
        //const totalAssets = getAssets(computedHashes[0].senderAmount);


        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
          path: 'out3.csv',
          header: [
            { id: 'senderaddr', title: 'SenderAddr' },
            { id: 'noDinos', title: 'dinos' },
            { id: 'txhash', title: 'txhash' },
          ]
        });
        const totalAssets = data[i][1]
        if (totalAssets > 0) {
          console.log('totalAssets', totalAssets);
          const mintedAssets = [];
          const sentTrans = [];
          // Mint each asset;
          //console.log("Sender amount is:" +hash.senderAmount);
          // Add in the first ID to match the amount sent 
          //const amountID = getAmountId(hash.senderAmount);
          //const chosenDino = await axios.get('https://cardinos.herokuapp.com/dinos?amount=' + amountID)
          //mintedAssets.push(chosenDino.data.data[0].name);

          //for (let index = 0; index < totalAssets; index++) {
          while (mintedAssets.length < totalAssets) {
            // Needs to be refactored based on exact spec for dino ids (do we pull them here and pass to mint asset func? or just mark as closed temporarily?)
            const dinos = await axios.get('https://cardinos.herokuapp.com/dinos?status=open');

            const numberOfOpenDinos = dinos.data.data.length;
            console.log(numberOfOpenDinos + "available")
            if (numberOfOpenDinos > 0) {
              console.log('num dinos', numberOfOpenDinos)
              const randomDino = dinos.data.data[(Math.floor((Math.random() * numberOfOpenDinos)))];
              console.log(randomDino)
              console.log(randomDino.name)
              //await axios.patch(`https://cardinos.herokuapp.com/dinos/${randomDino._id}`, {
              //  status: 'reserved',
              //});
              let dinoName = randomDino.name
              //let mintedAsset =""
              try {
                const mintedAsset = await mintAsset(dinoName);
                console.log('mintedAsset', mintedAsset);
                if (typeof (mintedAsset) != "undefined") {


                  mintedAssets.push(mintedAsset); // change to randomDino 
                }
                console.log("Dinos made so far:", mintedAssets.length)
              } catch (err) {
                console.log("DinoError")
              }
              //await axios.put(`https://cardinos.herokuapp.com/dinos/${randomDino._id}`, {
              //  status: 'minted',
              //});
              //console.log('mintedAsset', mintedAsset);
              //mintedAssets.push(mintedAsset);
            }
          }
          console.log('mintedAssets made:', mintedAssets.length);
          // Do we neeed to send asset ideas back?
          while (sentTrans < 1) {
            try {
              let res;
              senderAddress = data[i][0]
              if (mintedAssets.length > 0) {
                res = await sendAsset1({ receiver: senderAddress, assets: mintedAssets, noMinted: mintedAssets.length });
              }
              if (typeof (res) != "Undefined") {
                sentTrans.push(res)

              }
                } catch (err) {
                  console.log("Sending Error")
                }
          }
          const data2 = [
            {
              senderaddr: data[i][0],
              noDinos: data[i][1],
              txhash: txhash,
            }
          ];
          
          csvWriter
            .writeRecords(data2);
        }

      } catch (err) {
        console.log(err)
      }
    }
}

let data = [['addr1q8rl3vq5uuvmvgx4cytcpg7sam8j58m8vzs7s9u3tkydrgrmfc3kk7qzjttkxdkkr957ydw64yajc6rah0vx52v6j3wsjag9vy',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1q9ns305j5zxrfaajzp6jmd92vxs59gytmu35ztyfpl3s89y7dug57p50cnxk6d8xesgcu7ntpavsj7yhqfv84fyc85gqcd45f0',10],['addr1qx8y5jlzuv04wlg3kkchev5xjj2xyg5l0jfwd6p8dtq53wr8s26pjx8jf77qe0ueg70wc572zee9gxwtxj9p9hhrh4ts2ncjgq',10],['addr1qygefyl033gzczpzedlw4mxkakukwe6eljqc3waa6hd6rnue97wlpse080xzdvjna26xv5vtu8q2dyp3xyywfahly56qshtmyc',10],['addr1q9hmeverqcemtrhxd6t4dnly6330lur2n27k3kp0ghfrclad00fq5dk4k8cl4dgjx2030cmdmlm77emxs9s5jw6vx9fsv2pg35',5],['addr1qx9jgtzpvmk8lz2u4c6jrscyss2edgk8qqehk92xrtunh9hgq34vr3yxw2x4q2e62js3cvhyyctsyqf8v8ttl6rs5j4qg9v5w2',1],['addr1qx9jgtzpvmk8lz2u4c6jrscyss2edgk8qqehk92xrtunh9hgq34vr3yxw2x4q2e62js3cvhyyctsyqf8v8ttl6rs5j4qg9v5w2',10]]
//let senderPers = "addr1qxzrnxedq9lkh9spq6c4jra6vgjxg8g3dehmg4em4znmg9pqujygqn7m5gamppkvky28c3rlsdkad9z93jk3qg7nx2nqh79hm6"
//let totalDinos = 10

generateAssets(data);