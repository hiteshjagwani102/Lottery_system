import { useWeb3Context } from "../Context"
import participate from "../services/participate";
import styles from '../styles/home.module.scss'
import lottertAbi from '../configs/lotteryAbi.json'
import { useState } from "react";

const Registration = ():JSX.Element => {
  const [address,setAddress] = useState("");
    const {getContract,contract,signer,getLists} = useWeb3Context();

    const handleRegestration = async() =>{
        await participate(contract,signer);
        await getLists();
    }

    const handleSubmit = async(e:any) =>{
      e.preventDefault();
        await getContract(address,lottertAbi,signer);
    }
    
  return (
    <div>
        <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)}></input>
        <button className={styles.button} onClick={handleSubmit}>Get Contract</button>
        <button className={styles.button} onClick={handleRegestration}>Participate</button>
    </div>
  )
}

export default Registration