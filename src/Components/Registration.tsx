import { useWeb3Context } from "../Context"
import participate from "../services/participate";
import styles from '../styles/home.module.scss'

const Registration = ():JSX.Element => {
    const {contract,signer,getLists} = useWeb3Context();

    const handleRegestration = async() =>{
        await participate(contract,signer);
        await getLists();
    }
    
  return (
    <div>
        <button className={styles.button} onClick={handleRegestration}>Participate</button>
    </div>
  )
}

export default Registration