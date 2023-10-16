import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import BelediyeNFT from '../abis/BelediyeNFT.json';
import Navbar from './Navbar';
import Wallet from './Wallet';
import MintNFT from './MintNFT';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [baseURI, setBaseURI] = useState('');

  useEffect(() => {
    loadBlockchainData();
  }, []);

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = BelediyeNFT.networks[networkId];

    if (networkData) {
      const nftContract = new web3.eth.Contract(BelediyeNFT.abi, networkData.address);
      setContract(nftContract);
      const currentBaseURI = await nftContract.methods.baseURI().call();
      setBaseURI(currentBaseURI);
    } else {
      alert('Sözleşme ağda bulunamadı.');
    }
  }

  async function changeBaseURI(newBaseURI) {
    if (contract) {
      try {
        await contract.methods.setBaseURI(newBaseURI).send({ from: account });
        setBaseURI(newBaseURI);
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  }

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <h1>Belediye NFT Platformu</h1>
        <p>Şu anki hesap: {account}</p>
        <p>Şu anki Base URI: {baseURI}</p>

        {/* Sadece sözleşme sahibi için görüntülenmeli */}
        <div>
          <h2>Base URI Değiştirme</h2>
          <input 
            type="text" 
            placeholder="Yeni Base URI"
            onChange={event => setBaseURI(event.target.value)}
          />
          <button onClick={() => changeBaseURI(baseURI)}>Değiştir</button>
        </div>
        
        <Wallet contract={contract} account={account} />
        <MintNFT contract={contract} account={account} />
      </div>
    </div>
  );
}

export default App;
