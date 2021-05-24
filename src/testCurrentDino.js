
const fs = require("fs");
const axios = require('axios')
        

        const getPolicyId = (data) => {
                return `${data.policy_id}.${data.onchain_metadata.name}`;
        }
        const getDinos = async () => {
            const existingWalletTokens = [];
            const walletResponse = await axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1qxzrlvdgjeympu9h9umgk68sewxma8gkn56j6zjyqv2sty3ve8umwdgdt90mqz0eyxmn2e3fh2u2jalecuu4ekrtrntsecw7aa`, {
                headers: {
                  project_id: 'zTZDBIGGhr99fhG8QfcdR15zFLy0FSs2'
                },
              })
              console.log(walletResponse)
              // loop tokens and if not ada grab output info and push to existing wallet tokens.
            const loopedWallet = await Promise.all(walletResponse.data.amount.map(async res => {
                if(res.unit !== 'lovelace') {
                    const assetCheck = await axios.get('https://cardano-mainnet.blockfrost.io/api/v0/assets/369f94930c93112c0cf9fe628a14d281474d79cc40dedf227ff2725b44696e6f396e6f6465', {
                        headers: {
                            project_id: 'zTZDBIGGhr99fhG8QfcdR15zFLy0FSs2'
                          },
                    });
                    
                    const outputInfo = getPolicyId(assetCheck.data)
                    console.log('output', outputInfo)
                    existingWalletTokens.push(outputInfo);
                }
                return;
            }));
            console.log('existingWallettokens', existingWalletTokens);
        }

        getDinos();