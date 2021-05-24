// This is the script to send back the assets to the person 

const cardano = require("./cardano")
const sender = cardano.wallet("cardinos")

const sendBack1 = async (mintedAssets, senderAddr) => {
    try {

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
                    address: senderAddr,
                    amount: {
                        lovelace: cardano.toLovelace(1.6),
                        mintedAssets: 1, // Key part as thats the token
                    }
                }
            ]
        }

        const raw = cardano.transactionBuildRaw(txInfo(mintedAssets,senderAddr))

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
    } catch (err) {
        console.log('sendback', err);
    }
}
// console.log(txHash)

module.exports = sendBack1;

