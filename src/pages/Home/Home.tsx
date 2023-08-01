import Registration from '../../Components/Registration'
import Results from '../../Components/Results'
import ParticipantsLists from '../../Components/ParticipantsLists'
import styles from '../../styles/home.module.scss'

const Home = (): JSX.Element => {
  return (
    <div>
      <div className={styles.div}>
        <div className={styles.config}>
          <Registration />
          <Results />
        </div>
        <ParticipantsLists />
      </div>
    </div>
  )
}

export default Home