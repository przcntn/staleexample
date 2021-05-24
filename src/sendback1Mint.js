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

async function sendAsset1({ receiver, assets, noMinted }) {



    const txOut_amount_sender = assets.reduce((result, asset) => {

        const ASSET_ID = POLICY_ID + "." + asset
        delete result[ASSET_ID]
        return result
    }, {
        ...sender.balance().amount
    })

    
    

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

    const txInfo = {
        txIn: cardano.queryUtxo(sender.paymentAddr),
        txOut: [
            {
                address: sender.paymentAddr,
                amount: {
                    ...txOut_amount_sender,
                    lovelace: txOut_amount_sender.lovelace - cardano.toLovelace(MIN_ADA),
                    "29b013dd11dadee4155e6d5239854542939115f28a08e68d81bee965.Dino2": 1,
                }
            },
            {
                address: receiver,
                amount: {
                    lovelace: cardano.toLovelace(MIN_ADA),
                    ...txOut_amount_receiver
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

module.exports = sendAsset1;

