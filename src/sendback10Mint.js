const cardano = require("./cardano")
const axios = require('axios');
//const assets = require("./assets.json")
const getPolicyId = require('./get-policy-id')

const sender = cardano.wallet("cardinomaster")

console.log(
    "Balance of Sender address" +
    cardano.toAda(sender.balance().amount.lovelace) + " ADA"
)

const { policyId: POLICY_ID } = getPolicyId()

async function sendAsset1({  }) {



    const txOut_amount_sender = assets.reduce((result, asset) => {

        const ASSET_ID = POLICY_ID + "." + asset
        delete result[ASSET_ID]
        return result
    }, {
        ...sender.balance().amount
    })

    
    
    /*
    const txOut_amount_receiver = assets.reduce((result, asset) => {

        const ASSET_ID = POLICY_ID + "." + asset
        result[ASSET_ID] = 1
        return result
    }, {})

    let MIN_ADA;
    // This is depedent at the network, try to increase this amount of ADA
    // if you get an error saying: OutputTooSmallUTxO 
    
    if (noMinted === 1) {
        MIN_ADA = 1.7;
    } else if (noMinted === 5) {
        MIN_ADA = 2.5; 
    } else if (noMinted >= 20) {
        MIN_ADA = 5; 
    } else {
        MIN_ADA = 3.5;
    }
    
    const existingWalletTokens = [];
    const walletResponse = await axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1qxzrlvdgjeympu9h9umgk68sewxma8gkn56j6zjyqv2sty3ve8umwdgdt90mqz0eyxmn2e3fh2u2jalecuu4ekrtrntsecw7aa`, {
        headers: {
          project_id: 'zTZDBIGGhr99fhG8QfcdR15zFLy0FSs2'
        },
      })
      //console.log(walletResponse)
      // loop tokens and if not ada grab output info and push to existing wallet tokens.
    const loopedWallet = await Promise.all(walletResponse.data.amount.map(async res => {
        if(res.unit !== 'lovelace') {
            const assetCheck = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/assets/369f94930c93112c0cf9fe628a14d281474d79cc40dedf227ff2725b44696e6f396e6f6465', {
                headers: {
                    project_id: 'zTZDBIGGhr99fhG8QfcdR15zFLy0FSs2'
                  },
            });
            const data = assetCheck.data;

            const outputInfo = `${data.policy_id}.${data.onchain_metadata.name}`;
            //console.log('output', outputInfo)
            existingWalletTokens.push(outputInfo);
        }
        return;
    }));

    */
    //console.log('existingWallettokens', existingWalletTokens);
    const txInfo = {
        txIn: cardano.queryUtxo(sender.paymentAddr),
        txOut: [
            {
                address: sender.paymentAddr,
                amount: {
                    ...txOut_amount_sender,
                    lovelace: txOut_amount_sender.lovelace - cardano.toLovelace(17),
                    "29b013dd11dadee4155e6d5239854542939115f28a08e68d81bee965.Dino2": 1,
                }
            },
            {
                address: "addr1qy3kpd3w5w7stww2xdyqft6wv50vs93vpsjjyhuuc9sqzp0626mcpvnqds96j8f6val0x4p4zyxraw0z688590xmfrts3vq7sa",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino3193": 1,
                }
            },
            {
                address: "addr1q8rkdjjvw0j5gcyz2e742s0k383z6dn6l9fyqr7l0ck8vvl2jcsdsvpe7x8r48y8ymtgzrmx5a4nkvtwhtkd7lrekcwsgznqmm",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino778": 1,
                }
            },
            {
                address: "addr1q82mz7xhl3y6dlf8t0377pxkf9ezmwdtlg0p2n5c8hjg90trr3frpjsnjqkvnzlph66uwd6v0u3kxqkat2twaemp74yq06s98j",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino3028": 1,
                }
            },
            {
                address: "addr1qyh8u63fc0ds9vxhnqzl6h4903um2fjy3nunc58ehflgtetrr3frpjsnjqkvnzlph66uwd6v0u3kxqkat2twaemp74yqn0udv7",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino3225": 1,
                }
            },
            {
                address: "addr1q922relq9pv94cnuyg7kufdz6mfazy207q2p7undgqaqet9wup6ywdqglush2swm3t40ncgyqruwr8xkpk54r0f4p30s9xt4zz",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino9924": 1,
                }
            },
            {
                address: "addr1q9s5d6dmzmfphfv0ldhxr595534fea8mfe73f7v8yx8p5tyn0j4zahvukmaqusdlaty0jal2r0ekss8g83ga49x3lz9sp099wj",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino1534": 1,
                }
            },
            {
                address: "addr1q9arz37pn6zw92n5j5gejlcwju4gfaudpevaycum4a9lxxwgkheyju49t0t4cqq233r0qwweutkvnksznd47pyhu59ms5k88c0",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino9171": 1,
                }
            },
            {
                address: "addr1qyv2jygdhg284l52cxv76tj3gjw6trtgke42hfgh5qx0ckgqt7x5jq3h7s0n5fjsh5l8ze3tv9ltvstkr9dghvsg53pshunq03",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino9486": 1,
                }
            },
            {
                address: "addr1q8avw60rs4jjuv5sm2mmmumlkf3vy0xjrgaa0xdvkqz32c8j6sgux977z5lgqp6z7cfyvtzlsl5nhtc07wk5zuyrch4q8x3dmk",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino8139": 1,
                }
            },
            {
                address: "addr1q9hrlp46u738tu3kwwygem0p3dukenrr54q3pg2rcxr78325yccucuzay2y69gv7us8xcehnlavtykx2ge7turl097dsshrkwn",
                amount: {
                    lovelace: cardano.toLovelace(1.7),
                    "4a7f6db810294738dae82fdb201230f32ac18c0640d02fa0100756c0.cardino230": 1,
                }
            }
        ]
    }

    const raw = cardano.transactionBuildRaw(txInfo)

    const fee = cardano.transactionCalculateMinFee({
        ...txInfo,
        txBody: raw,
        witnessCount: 1
    })

    txInfo.txOut[0].amount.lovelace -= fee

    const tx = cardano.transactionBuildRaw({ ...txInfo, fee })

    const txSigned = cardano.transactionSign({
        txBody: tx,
        signingKeys: [sender.payment.skey]
    })

    const txHash = cardano.transactionSubmit(txSigned)

    console.log("hash transaction" + txHash)

    return (txHash)
}
/*
sendAsset1({
    receiver: "addr1qy32w0lfvnvjf9mfs3zqymfxvhrggvvmvknls4xgg47h9ulw52t0xr8e6e8kwtq9nz23z4hwv757n7exwx9zv7eeek0qkgpdtt",
    assets: assets.map(asset => asset.id)
})
*/

//module.exports = sendAsset1;

sendAsset1()