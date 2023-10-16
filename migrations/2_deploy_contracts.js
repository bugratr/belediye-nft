const BelediyeNFT = artifacts.require("BelediyeNFT");

module.exports = function (deployer) {
    // İlk olarak temel URI ile BelediyeNFT sözleşmesini dağıtıyoruz.
    // Bu URI, ilerleyen dönemde `setBaseURI` fonksiyonuyla güncellenebilir.
    deployer.deploy(BelediyeNFT, "https://belediye-nft-api.org/api/token/");
};
