import { ethers } from "ethers";

const pickLottery = async(contract:ethers.Contract) => {
    if(contract){
        await contract.pickLottery();
        await contract.reset();
    }else console.log("Contract Not Found")
}


export default pickLottery;