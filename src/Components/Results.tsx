import pickLottery from "../services/pickLottery"
import { useWeb3Context } from "../Context"
import styles from '../styles/home.module.scss'


const Results = () :JSX.Element => {

    const {contract,getLists} = useWeb3Context();

    const handleResult = async()=>{
        await pickLottery(contract);
        await getLists();
    }
  return (
    <div>
        <button className={styles.button}  onClick={handleResult}>Pick Lottery</button>
    </div>
  )
}

export default Results