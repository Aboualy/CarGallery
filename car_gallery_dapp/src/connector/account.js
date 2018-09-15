import initWeb3 from './initWeb3';
const account = (async () =>
{
    const web3 = await initWeb3;
    web3.eth.getAccounts((err, accounts) => {
        if (err) {
            console.log(err)
            return
        }
        web3.eth.defaultAccount = accounts[0];

         return web3.eth.defaultAccount;

           })})();

export default account;