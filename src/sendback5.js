// This is the script to send back the assets to the person 


const cardano = require("./cardano")
const sender = cardano.wallet("cardinos")

// Below address is what we got from the UTXO
const receiver = "addr1q9jha0mhje8g9za42xc47vh9p0e39x8rmzsjrslp9hywjc0w52t0xr8e6e8kwtq9nz23z4hwv757n7exwx9zv7eeek0q9ngfcx"
const ASSET_ID1 = "xxx"  // Pulled in from the minting script
const ASSET_ID2 = "xxx"  // Pulled in from the minting script
const ASSET_ID3 = "xxx"  // Pulled in from the minting script
const ASSET_ID4 = "xxx"  // Pulled in from the minting script
const ASSET_ID5 = "xxx"  // Pulled in from the minting script

const txInfo = {
    txIn: cardano.queryUtxo(sender.paymentAddr),
    txOut: [
        {
            address: sender.paymentAddr,
            amount: {
                lovelace: sender.balance().amount.lovelace - cardano.toLovelace(1.6)
            }
        },
        {
            address: receiver,
            amount: {
                lovelace: cardano.toLovelace(1.6),
                ASSET_ID1: 1, // Key part as thats the token
                ASSET_ID2: 1, // Key part as thats the token
                ASSET_ID3: 1, // Key part as thats the token
                ASSET_ID4: 1, // Key part as thats the token
                ASSET_ID5: 1, // Key part as thats the token
            }
        }
    ]
}

// Build the transaction and check working working 

const sendBack5 = async () => {

const raw = cardano.transactionBuildRaw(txInfo)

// Calculate the fee

const fee = cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 1
})

// Pay the fee by subtracting it from the sender utxo

txInfo.txOut[0].amount.lovelace -= fee

// Build the final transaction

const tx = cardano.transactionBuildRaw({ ...txInfo, fee })

// Sign the transaction

const txSigned = cardano.transactionSign({
    txBody: tx,
    signingKeys: [sender.payment.skey]
})

// Submit the transaction

const txHash = cardano.transactionSubmit(txSigned)

}
// console.log(txHash)

module.exports = sendBack5;