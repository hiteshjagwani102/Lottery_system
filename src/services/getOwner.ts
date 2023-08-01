import { ethers } from "ethers";

const getOwner = async(contract:ethers.Contract):Promise<string> => {
    return await contract.owmer();
}

export default getOwner;