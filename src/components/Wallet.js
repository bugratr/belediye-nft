import React, { useState, useEffect } from 'react';

function Wallet({ contract, account }) {
  const [recipient, setRecipient] = useState('');
  const [userTokens, setUserTokens] = useState([]);

  useEffect(() => {
    if (contract && account) {
      loadUserTokens();
    }
  }, [contract, account]);

  async function loadUserTokens() {
    const tokenCount = await contract.methods.balanceOf(account).call();
    const tokens = [];
    for (let i = 0; i < tokenCount; i++) {
      const tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call();
      tokens.push(tokenId.toString());
    }
    setUserTokens(tokens);
  }

  async function handleMint() {
    if (contract && recipient) {
      try {
        await contract.methods.mint(recipient).send({ from: account });
        loadUserTokens();
      } catch (error) {
        console.error("Hata:", error);
      }
    }
  }

  return (
    <div>
      <h2>Benim NFT'lerim</h2>
      {userTokens.length === 0 ? (
        <p>Hiç NFT'niz yok.</p>
      ) : (
        <ul>
          {userTokens.map(tokenId => (
            <li key={tokenId}>Token ID: {tokenId}</li>
          ))}
        </ul>
      )}

      {/* Sadece sözleşme sahibi için görüntülenmeli */}
      <div>
        <h2>NFT Gönder</h2>
        <input
          type="text"
          placeholder="Cüzdan Adresi"
          onChange={event => setRecipient(event.target.value)}
        />
        <button onClick={handleMint}>Gönder</button>
      </div>
    </div>
  );
}

export default Wallet;
