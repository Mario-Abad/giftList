const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

async function main() {
  // how do we prove to the server we're on the nice list? 
  const name = 'Shelly Toy';
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);
  //console.log(proof);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // add request body parameters here!
    Name: name,
    Proof: proof,
  });

  console.log({ gift });
}

main();