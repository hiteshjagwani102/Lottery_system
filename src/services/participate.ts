import { ethers } from "ethers";

const participate = async(contract:ethers.Contract, signer:ethers.Signer):Promise<void> =>{
    try{
        const transaction = await contract.enter({
            value: ethers.utils.parseEther('0.0002'),
          });
        await signer.sendTransaction(transaction);
    } catch(err:any){
        if(err?.event==='Error') console.log(err.message);
        else console.log(err)
    }
}

export default participate;