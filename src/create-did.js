import { Sdk } from '@peaq-network/sdk'

const DIDname = 'PPDDID'
const mnemonicSeed = process.env.PEAQ_MNEMONIC_SEED
const peaqWSEndpoint = process.env.PEAQ_WS_ENDPOINT

const createPeaqDID = async (name, seed) => {
  const sdkInstance = await Sdk.createInstance({
    // e.g. wss://wss-krest.peaq.network for krest network
    baseUrl: peaqWSEndpoint,
    seed,
  })

  const { hash } = await sdkInstance.did.create({
    name,
  })

  await sdkInstance.disconnect()

  return hash
}

createPeaqDID(DIDname, mnemonicSeed)
  .then((hash) => {
    console.log(`Created peaq DID: ${hash}`)
  })
  .catch((error) => {
    console.error(`Error creating peaq DID: ${error}`)
  })

export { createPeaqDID }
