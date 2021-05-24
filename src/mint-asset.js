// This is the main script for minting 1 dino and thus would run it 1/5/10 times and 
// output the ASSET_ID from below as we need that to send it back


const fs = require("fs");
const getPolicyID = require("./get-policy-id")
const cardano = require("./cardano");  // Main cardano-cli


const mintAsset = async (ASSET_NAME) => {
    try {
        const wallet = cardano.wallet("cardinomaster"); // Will change name but its all in private folder with keys

        const { policyId: POLICY_ID, mintScript } = getPolicyID()
        const ASSET_ID = POLICY_ID + "." + ASSET_NAME;

        let rawdata = fs.readFileSync('src/assets.json');
        let allDinos = JSON.parse(rawdata);
        const currentDino = allDinos.filter(dino => dino[ASSET_NAME])[0];
        const dino = currentDino[ASSET_NAME];
        console.log(dino)
        const metadata = {  
            721: {
                [POLICY_ID]: {
                    [ASSET_NAME]: {  // This whole Metadata below will come from the JSON 
                        name: ASSET_NAME,
                        image:dino.image,
                        src: dino.src,
                        type: dino.type,
                        species: dino.species,
                        dinoRarity: dino.dinoRarity,
                        attributes: {
                            badge: dino.attributes.badge,
                            background: dino.attributes.background,
                            items: [
                                { lefthand: dino.attributes.items[0].lefthand, rarity: dino.attributes.items[0].rarity },
                                { righthand: dino.attributes.items[1].righthand, rarity: dino.attributes.items[1].rarity },
                                { tail: dino.attributes.items[2].tail, rarity: dino.attributes.items[2].rarity },
                                { eye: dino.attributes.items[3].eye, rarity: dino.attributes.items[3].rarity },
                                { shoes: dino.attributes.items[4].shoes, rarity: dino.attributes.items[4].rarity },
                                { tummy: dino.attributes.items[5].tummy, rarity: dino.attributes.items[5].rarity }
                            ]
                        },
                        publisher: dino.publisher,
                        artist: dino.artist,
                        creators: dino.creators,
                        release: dino.release
                    },
                },
            },
        };


        const tx = {
            txIn: wallet.balance().utxo,
            txOut: [
                {
                    address: wallet.paymentAddr,
                    amount: { ...wallet.balance().amount, [ASSET_ID]: 1 },
                },
            ],
            mint: [{ action: "mint", amount: 1, token: ASSET_ID }],
            metadata,
            witnessCount: 2,
        };

        const buildTransaction = (tx) => {
            const raw = cardano.transactionBuildRaw(tx);
            const fee = cardano.transactionCalculateMinFee({
                ...tx,
                txBody: raw,
            });
            tx.txOut[0].amount.lovelace -= fee;
            return cardano.transactionBuildRaw({ ...tx, fee });
        };

        const signTransaction = (wallet, tx, script) => {
            return cardano.transactionSign({
                signingKeys: [wallet.payment.skey, wallet.payment.skey],
                scriptFile: script,
                txBody: tx,
            });
        };


        const raw = buildTransaction(tx);
        console.log('r', raw)
        const signed = signTransaction(wallet, raw, mintScript);
        console.log('s', signed)
        const txHash = cardano.transactionSubmit(signed);
        console.log('txhash mint', txHash);
        return ASSET_NAME;
    } catch (err) {
        console.log('Minting Error')
        return
    }
}

module.exports = mintAsset;