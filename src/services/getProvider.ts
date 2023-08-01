import {ethers} from 'ethers';

const getProvider = async () : Promise<ethers.providers.Web3Provider | Error> =>{
    let provider: any
    if(window.ethereum){
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    else throw new Error("No Metamask Wallet Found");
    return provider;
}

export default getProvider;