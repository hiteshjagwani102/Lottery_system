import { ethers } from "ethers";

const participate = async(contract:ethers.Contract):Promise<void> =>{
    try{
        await contract.enter({
            value: ethers.utils.parseEther('0.0002'),
            gasLimit: 200000,
          }).then((tx:any) =>{
             tx.wait().then((recipt:any)=>{
                console.log(recipt);
            }). catch((error:any)=>console.log(error));
          })
    } catch(err:any){
        console.log(err.message);
    }
}

export default participate;