import MyCustomerContract from '../build/contracts/CustomerContract';
import initWeb3 from "./initWeb3";
import truffleContract from "truffle-contract";
const contract = (async ()=> {
    const web3 = await initWeb3;
    const Contract = truffleContract(MyCustomerContract);
    Contract.setProvider(web3.currentProvider);
    const instance = await Contract.deployed();

    return instance;

})();
export default contract;