const cardano = require("./cardano")
const getPolicyId = require("./get-policy-id")
const assets = require("./10asset.json")
const fs = require("fs");
const wallet = cardano.wallet("cardinomaster")

const { policyId: POLICY_ID, mintScript } = getPolicyId()
/*
const metadata_assets = assets.reduce((result, asset) => {

    const ASSET_ID = asset.id // PIADA0

    // remove id property from the asset metadata
    const asset_metadata = {
        ...asset
    }

    delete asset_metadata.id

    return {
        ...result,
        [ASSET_ID]: asset_metadata
    }
}, {})

*/

let rawdata = fs.readFileSync('src/10asset.json');

asset_names = ['cardino3761', 'cardino1360', 'cardino1944', 'cardino6134', 'cardino6779', 'cardino9177', 'cardino3352', 'cardino7554', 'cardino2340', 'cardino8523']

asset1 = asset_names[0]
asset2 = asset_names[1]
asset3 = asset_names[2]
asset4 = asset_names[3]
asset5 = asset_names[4]
asset6 = asset_names[5]
asset7 = asset_names[6]
asset8 = asset_names[7]
asset9 = asset_names[8]
asset10 = asset_names[9]


allDinos = JSON.parse(rawdata)

dino1 = allDinos.filter(dino => dino[asset1])[0]
dino1detail = dino1[asset1]

dino2 = allDinos.filter(dino => dino[asset2])[0]
dino2detail = dino2[asset2]

dino3 = allDinos.filter(dino => dino[asset3])[0]
dino3detail = dino3[asset3]

dino4 = allDinos.filter(dino => dino[asset4])[0]
dino4detail = dino4[asset4]

dino5 = allDinos.filter(dino => dino[asset5])[0]
dino5detail = dino5[asset5]

dino6 = allDinos.filter(dino => dino[asset6])[0]
dino6detail = dino6[asset6]

dino7 = allDinos.filter(dino => dino[asset7])[0]
dino7detail = dino7[asset7]

dino8 = allDinos.filter(dino => dino[asset8])[0]
dino8detail = dino8[asset8]

dino9 = allDinos.filter(dino => dino[asset9])[0]
dino9detail = dino9[asset9]

dino10 = allDinos.filter(dino => dino[asset10])[0]
dino10detail = dino10[asset10]

//meta1 = metadata_assets[asset1]

const metadata = {
    721: {
        [POLICY_ID]: {
            [asset1]: {  // This whole Metadata below will come from the JSON 
                name: dino1detail.name,
                image: dino1detail.image,
                src: dino1detail.src,
                type: dino1detail.type,
                species: dino1detail.species,
                dinoRarity: dino1detail.dinoRarity,
                attributes: {
                    badge: dino1detail.attributes.badge,
                    background: dino1detail.attributes.background,
                    items: [
                        { lefthand: dino1detail.attributes.items[0].lefthand, rarity: dino1detail.attributes.items[0].rarity },
                        { righthand: dino1detail.attributes.items[1].righthand, rarity: dino1detail.attributes.items[1].rarity },
                        { tail: dino1detail.attributes.items[2].tail, rarity: dino1detail.attributes.items[2].rarity },
                        { eye: dino1detail.attributes.items[3].eye, rarity: dino1detail.attributes.items[3].rarity },
                        { shoes: dino1detail.attributes.items[4].shoes, rarity: dino1detail.attributes.items[4].rarity },
                        { tummy: dino1detail.attributes.items[5].tummy, rarity: dino1detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino1detail.publisher,
                artist: dino1detail.artist,
                creators: dino1detail.creators,
                release: dino1detail.release
            },
            [asset2]: {  // This whole Metadata below will come from the JSON 
                name: dino2detail.name,
                image: dino2detail.image,
                src: dino2detail.src,
                type: dino2detail.type,
                species: dino2detail.species,
                dinoRarity: dino2detail.dinoRarity,
                attributes: {
                    badge: dino2detail.attributes.badge,
                    background: dino2detail.attributes.background,
                    items: [
                        { lefthand: dino2detail.attributes.items[0].lefthand, rarity: dino2detail.attributes.items[0].rarity },
                        { righthand: dino2detail.attributes.items[1].righthand, rarity: dino2detail.attributes.items[1].rarity },
                        { tail: dino2detail.attributes.items[2].tail, rarity: dino2detail.attributes.items[2].rarity },
                        { eye: dino2detail.attributes.items[3].eye, rarity: dino2detail.attributes.items[3].rarity },
                        { shoes: dino2detail.attributes.items[4].shoes, rarity: dino2detail.attributes.items[4].rarity },
                        { tummy: dino2detail.attributes.items[5].tummy, rarity: dino2detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino2detail.publisher,
                artist: dino2detail.artist,
                creators: dino2detail.creators,
                release: dino2detail.release
            },
            [asset3]: {  // This whole Metadata below will come from the JSON 
                name: dino3detail.name,
                image: dino3detail.image,
                src: dino3detail.src,
                type: dino3detail.type,
                species: dino3detail.species,
                dinoRarity: dino3detail.dinoRarity,
                attributes: {
                    badge: dino3detail.attributes.badge,
                    background: dino3detail.attributes.background,
                    items: [
                        { lefthand: dino3detail.attributes.items[0].lefthand, rarity: dino3detail.attributes.items[0].rarity },
                        { righthand: dino3detail.attributes.items[1].righthand, rarity: dino3detail.attributes.items[1].rarity },
                        { tail: dino3detail.attributes.items[2].tail, rarity: dino3detail.attributes.items[2].rarity },
                        { eye: dino3detail.attributes.items[3].eye, rarity: dino3detail.attributes.items[3].rarity },
                        { shoes: dino3detail.attributes.items[4].shoes, rarity: dino3detail.attributes.items[4].rarity },
                        { tummy: dino3detail.attributes.items[5].tummy, rarity: dino3detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino3detail.publisher,
                artist: dino3detail.artist,
                creators: dino3detail.creators,
                release: dino3detail.release
            },
            [asset4]: {  // This whole Metadata below will come from the JSON 
                name: dino4detail.name,
                image: dino4detail.image,
                src: dino4detail.src,
                type: dino4detail.type,
                species: dino4detail.species,
                dinoRarity: dino4detail.dinoRarity,
                attributes: {
                    badge: dino4detail.attributes.badge,
                    background: dino4detail.attributes.background,
                    items: [
                        { lefthand: dino4detail.attributes.items[0].lefthand, rarity: dino4detail.attributes.items[0].rarity },
                        { righthand: dino4detail.attributes.items[1].righthand, rarity: dino4detail.attributes.items[1].rarity },
                        { tail: dino4detail.attributes.items[2].tail, rarity: dino4detail.attributes.items[2].rarity },
                        { eye: dino4detail.attributes.items[3].eye, rarity: dino4detail.attributes.items[3].rarity },
                        { shoes: dino4detail.attributes.items[4].shoes, rarity: dino4detail.attributes.items[4].rarity },
                        { tummy: dino4detail.attributes.items[5].tummy, rarity: dino4detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino4detail.publisher,
                artist: dino4detail.artist,
                creators: dino4detail.creators,
                release: dino4detail.release
            },
            [asset5]: {  
                name: dino5detail.name,
                image: dino5detail.image,
                src: dino5detail.src,
                type: dino5detail.type,
                species: dino5detail.species,
                dinoRarity: dino5detail.dinoRarity,
                attributes: {
                    badge: dino5detail.attributes.badge,
                    background: dino5detail.attributes.background,
                    items: [
                        { lefthand: dino5detail.attributes.items[0].lefthand, rarity: dino5detail.attributes.items[0].rarity },
                        { righthand: dino5detail.attributes.items[1].righthand, rarity: dino5detail.attributes.items[1].rarity },
                        { tail: dino5detail.attributes.items[2].tail, rarity: dino5detail.attributes.items[2].rarity },
                        { eye: dino5detail.attributes.items[3].eye, rarity: dino5detail.attributes.items[3].rarity },
                        { shoes: dino5detail.attributes.items[4].shoes, rarity: dino5detail.attributes.items[4].rarity },
                        { tummy: dino5detail.attributes.items[5].tummy, rarity: dino5detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino5detail.publisher,
                artist: dino5detail.artist,
                creators: dino5detail.creators,
                release: dino5detail.release
            },
            [asset6]: {  
                name: dino6detail.name,
                image: dino6detail.image,
                src: dino6detail.src,
                type: dino6detail.type,
                species: dino6detail.species,
                dinoRarity: dino6detail.dinoRarity,
                attributes: {
                    badge: dino6detail.attributes.badge,
                    background: dino6detail.attributes.background,
                    items: [
                        { lefthand: dino6detail.attributes.items[0].lefthand, rarity: dino6detail.attributes.items[0].rarity },
                        { righthand: dino6detail.attributes.items[1].righthand, rarity: dino6detail.attributes.items[1].rarity },
                        { tail: dino6detail.attributes.items[2].tail, rarity: dino6detail.attributes.items[2].rarity },
                        { eye: dino6detail.attributes.items[3].eye, rarity: dino6detail.attributes.items[3].rarity },
                        { shoes: dino6detail.attributes.items[4].shoes, rarity: dino6detail.attributes.items[4].rarity },
                        { tummy: dino6detail.attributes.items[5].tummy, rarity: dino6detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino6detail.publisher,
                artist: dino6detail.artist,
                creators: dino6detail.creators,
                release: dino6detail.release
            },
            [asset7]: {  
                name: dino7detail.name,
                image: dino7detail.image,
                src: dino7detail.src,
                type: dino7detail.type,
                species: dino7detail.species,
                dinoRarity: dino7detail.dinoRarity,
                attributes: {
                    badge: dino7detail.attributes.badge,
                    background: dino7detail.attributes.background,
                    items: [
                        { lefthand: dino7detail.attributes.items[0].lefthand, rarity: dino7detail.attributes.items[0].rarity },
                        { righthand: dino7detail.attributes.items[1].righthand, rarity: dino7detail.attributes.items[1].rarity },
                        { tail: dino7detail.attributes.items[2].tail, rarity: dino7detail.attributes.items[2].rarity },
                        { eye: dino7detail.attributes.items[3].eye, rarity: dino7detail.attributes.items[3].rarity },
                        { shoes: dino7detail.attributes.items[4].shoes, rarity: dino7detail.attributes.items[4].rarity },
                        { tummy: dino7detail.attributes.items[5].tummy, rarity: dino7detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino7detail.publisher,
                artist: dino7detail.artist,
                creators: dino7detail.creators,
                release: dino7detail.release
            },
            [asset8]: {  
                name: dino8detail.name,
                image: dino8detail.image,
                src: dino8detail.src,
                type: dino8detail.type,
                species: dino8detail.species,
                dinoRarity: dino8detail.dinoRarity,
                attributes: {
                    badge: dino8detail.attributes.badge,
                    background: dino8detail.attributes.background,
                    items: [
                        { lefthand: dino8detail.attributes.items[0].lefthand, rarity: dino8detail.attributes.items[0].rarity },
                        { righthand: dino8detail.attributes.items[1].righthand, rarity: dino8detail.attributes.items[1].rarity },
                        { tail: dino8detail.attributes.items[2].tail, rarity: dino8detail.attributes.items[2].rarity },
                        { eye: dino8detail.attributes.items[3].eye, rarity: dino8detail.attributes.items[3].rarity },
                        { shoes: dino8detail.attributes.items[4].shoes, rarity: dino8detail.attributes.items[4].rarity },
                        { tummy: dino8detail.attributes.items[5].tummy, rarity: dino8detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino8detail.publisher,
                artist: dino8detail.artist,
                creators: dino8detail.creators,
                release: dino8detail.release
            },
            [asset9]: {  
                name: dino9detail.name,
                image: dino9detail.image,
                src: dino9detail.src,
                type: dino9detail.type,
                species: dino9detail.species,
                dinoRarity: dino9detail.dinoRarity,
                attributes: {
                    badge: dino9detail.attributes.badge,
                    background: dino9detail.attributes.background,
                    items: [
                        { lefthand: dino9detail.attributes.items[0].lefthand, rarity: dino9detail.attributes.items[0].rarity },
                        { righthand: dino9detail.attributes.items[1].righthand, rarity: dino9detail.attributes.items[1].rarity },
                        { tail: dino9detail.attributes.items[2].tail, rarity: dino9detail.attributes.items[2].rarity },
                        { eye: dino9detail.attributes.items[3].eye, rarity: dino9detail.attributes.items[3].rarity },
                        { shoes: dino9detail.attributes.items[4].shoes, rarity: dino9detail.attributes.items[4].rarity },
                        { tummy: dino9detail.attributes.items[5].tummy, rarity: dino9detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino9detail.publisher,
                artist: dino9detail.artist,
                creators: dino9detail.creators,
                release: dino9detail.release
            },
            [asset10]: {  
                name: dino10detail.name,
                image: dino10detail.image,
                src: dino10detail.src,
                type: dino10detail.type,
                species: dino10detail.species,
                dinoRarity: dino10detail.dinoRarity,
                attributes: {
                    badge: dino10detail.attributes.badge,
                    background: dino10detail.attributes.background,
                    items: [
                        { lefthand: dino10detail.attributes.items[0].lefthand, rarity: dino10detail.attributes.items[0].rarity },
                        { righthand: dino10detail.attributes.items[1].righthand, rarity: dino10detail.attributes.items[1].rarity },
                        { tail: dino10detail.attributes.items[2].tail, rarity: dino10detail.attributes.items[2].rarity },
                        { eye: dino10detail.attributes.items[3].eye, rarity: dino10detail.attributes.items[3].rarity },
                        { shoes: dino10detail.attributes.items[4].shoes, rarity: dino10detail.attributes.items[4].rarity },
                        { tummy: dino10detail.attributes.items[5].tummy, rarity: dino10detail.attributes.items[5].rarity }
                    ]
                },
                publisher: dino10detail.publisher,
                artist: dino10detail.artist,
                creators: dino10detail.creators,
                release: dino10detail.release
            }

        }
    }
}

const txOut_amount = asset_names.reduce((result, asset_names) => {

    const ASSET_ID = POLICY_ID + "." + asset_names
    result[ASSET_ID] = 1
    return result

}, {
    ...wallet.balance().amount
})

const mint_actions = asset_names.map(asset => ({ action: "mint", amount: 1, token: POLICY_ID + "." + asset }))

const tx = {
    txIn: wallet.balance().utxo,
    txOut: [
        {
            address: wallet.paymentAddr,
            amount: txOut_amount
        }
    ],
    mint: mint_actions,
    metadata,
    witnessCount: 2
}

const buildTransaction = (tx) => {

    const raw = cardano.transactionBuildRaw(tx)
    const fee = cardano.transactionCalculateMinFee({
        ...tx,
        txBody: raw
    })

    tx.txOut[0].amount.lovelace -= fee

    return cardano.transactionBuildRaw({ ...tx, fee })
}

const raw = buildTransaction(tx)

// 9. Sign transaction

const signTransaction = (wallet, tx, script) => {

    return cardano.transactionSign({
        signingKeys: [wallet.payment.skey, wallet.payment.skey],
        scriptFile: script,
        txBody: tx
    })
}

const signed = signTransaction(wallet, raw, mintScript)

// 10. Submit transaction

const txHash = cardano.transactionSubmit(signed)

console.log(txHash)