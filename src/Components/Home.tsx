import { useWeb3Context } from '../Context';
import participate from '../services/participate';
import pickLottery from '../services/pickLottery';
import styles from '../styles/home.module.scss'

const Home = (): JSX.Element => {

  const { account, getContract, list, contract, signer, getLists, owner } = useWeb3Context();


  const handleSubmit = async () => {
    await getContract();
  }

  const handleRegestration = async () => {
    await participate(contract, signer);
    await getLists();
  }

  const handleResult = async () => {
    await pickLottery(contract);
    await getLists();
  }

  return (
    <div className={styles.main}>
      <button className={styles.contractButton} onClick={handleSubmit}>Get Contract</button>
      <div className={styles.participantList}>
        <p>Participants-</p>
        <ul>
          {
            list.map((item: string, index: number) => {
              return <div key={index}>{item}</div>
            })
          }
        </ul>
      </div>
      {contract && account && owner != account.address && <button className={styles.register} onClick={handleRegestration}>Participate</button>}
      {contract && account && owner == account.address && <button className={styles.pick} onClick={handleResult}>Pick Lottery</button>}


    </div>
  )
}

export default Home