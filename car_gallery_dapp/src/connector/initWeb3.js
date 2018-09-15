import * as Web3 from "web3";

const initWeb3 = (() =>
    new Promise((resolve, reject) => {

        function handleWeb3 () {
            let web3 = window.web3;

            if (typeof web3 !== "undefined") {

                web3 = new Web3(web3.currentProvider);
                console.log("Web3 is detected ");
                resolve(web3);

            } else {
                web3 =new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
                console.log("Cannot find web3");
                resolve(web3);
            }
        };

        window.addEventListener('load',handleWeb3);

    }))();

export default initWeb3;