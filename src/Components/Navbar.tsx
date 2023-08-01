import { useWeb3Context } from "../Context"
import styles from '../styles/navbar.module.scss'

const Navbar = (): JSX.Element => {

    const {connect,account} = useWeb3Context();

    const handleSubmit = async() =>{
        await connect();
    }

  return (
    <nav>
        <div className={styles.main}>

            {account && <div className={styles.balance}>Balance:{account.balance}</div>}
            {account && <div className={styles.address}>Address:{account.address}</div>} 

            <button className={styles.button} onClick={handleSubmit}>Connect</button>
        </div>
    </nav>
  )
}


export default Navbar