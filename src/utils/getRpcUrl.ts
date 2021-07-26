// Array of available nodes to connect to
const nodes = process.env.REACT_APP_NODE_1 || process.env.REACT_APP_NODE_2 || process.env.REACT_APP_NODE_3 || 'https://mainnet.infura.io/v3/73f598e7cdb64d78add441c87e615abeF'

const getNodeUrl = () => {
  return nodes
}

export default getNodeUrl
