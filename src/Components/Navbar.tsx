import { useWeb3Context } from "../Context"
import styles from '../styles/navbar.module.scss'

const Navbar = (): JSX.Element => {

    const {connect,owner} = useWeb3Context();


    const handleSubmit = async() =>{
        await connect();
    }

  return (
    <nav>
        <div className={styles.div}>
            <button className={styles.button} onClick={handleSubmit}>Connect</button>
            <div>
                <p className={styles.p}>Owner: {owner}</p>
            </div>
        </div>
    </nav>
  )
}


export default Navbar