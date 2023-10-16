import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // Eğer kullanıcı MetaMask veya dapp tarayıcı kullanıyorsa
    web3 = new Web3(window.ethereum);
    window.ethereum.enable().catch(error => {
      // Kullanıcı hesabına erişim isteğini reddederse
      console.log(error);
    });
} else {
    // Kullanıcı MetaMask kullanmıyorsa, fallback olarak Ganache'ı (veya başka bir yerel node'u) kullanıyoruz
    const provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(provider);
}

export default web3;
