import { ethers } from "ethers"

const getParticipants = async(contract:ethers.Contract): Promise<Array<string>> =>{
    return await contract.getList();
}

export default getParticipants;