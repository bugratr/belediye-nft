import React, { useState } from 'react';

function MintNFT({ contract, account }) {
  const [recipient, setRecipient] = useState('');

  async function handleMint() {
    if (contract && recipient) {
      try {
        await contract.methods.mint(recipient).send({ from: account });
        alert(`NFT, ${recipient} adresine başarıyla gönderildi!`);
      } catch (error) {
        console.error("Hata:", error);
        alert("NFT oluşturma sırasında bir hata oluştu.");
      }
    } else {
      alert("Lütfen geçerli bir cüzdan adresi girin.");
    }
  }

  return (
    <div>
      <h2>NFT Gönder</h2>
      <input
        type="text"
        placeholder="Cüzdan Adresi"
        onChange={event => setRecipient(event.target.value)}
      />
      <button onClick={handleMint}>NFT Gönder</button>
    </div>
  );
}

export default MintNFT;
