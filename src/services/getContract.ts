import { ContractInterface, ethers } from "ethers";

const getContract = async(address:string, abi:ContractInterface, signer: ethers.Signer) =>{
    return new ethers.Contract(address,abi,signer)
}

export default getContract;