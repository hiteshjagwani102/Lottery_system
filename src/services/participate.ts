import { ethers } from "ethers";

const participate = async(contract:ethers.Contract, signer:ethers.Signer):Promise<void> =>{
    try{
        const transaction = await contract.enter({
            value: ethers.utils.parseEther('0.0002'),
            gasLimit: 200000,
          });
        await signer.sendTransaction(transaction).then((tx)=>{
            tx.wait().then(()=>{
                console.log(tx.hash);
            })
        }).catch((error)=>{
            console.log(error.message);
        })

    } catch(err:any){
        console.log(err.message);
    }
}

export default participate;