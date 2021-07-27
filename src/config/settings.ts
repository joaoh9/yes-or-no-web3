interface Settings {
  chainId: number | undefined
  node1: string | undefined
  node2: string | undefined
  node3: string | undefined
  hashGuid: string | undefined
  pinataJwt: string | undefined
  pinataSecret: string | undefined
  pinataKey: string | undefined
  moralistAppId: string
  moralisServerUrl: string
}

const settings: Settings = {
  chainId: parseInt(process.env.REACT_APP_CHAIN_ID || '1'),
  node1: process.env.REACT_APP_NODE_1,
  node2: process.env.REACT_APP_NODE_2,
  node3: process.env.REACT_APP_NODE_3,
  hashGuid: process.env.REACT_APP_HASH_GUID,
  pinataJwt: process.env.REACT_APP_PINATA_JWT,
  pinataSecret: process.env.REACT_APP_PINATA_SECRET,
  pinataKey: process.env.REACT_APP_PINATA_KEY,
  moralistAppId: process.env.REACT_APP_MORALIST_APP_ID || 'wrong-data',
  moralisServerUrl: process.env.REACT_APP_MORALIST_SERVER_URL || 'wrong-data',
}

export default settings
