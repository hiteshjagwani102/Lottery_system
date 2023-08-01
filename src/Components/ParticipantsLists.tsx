import { useWeb3Context } from '../Context'
import styles from '../styles/participants.module.scss'
const ParticipantsLists = (): JSX.Element  => {

  const { list }  = useWeb3Context();

  return (
    <div className={styles.div}>
        <p>Participants-</p>
        <ul>
            {
                list.map((item:string,index:number)=>{
                   return <li key={index}>{item}</li>
                })
            }
        </ul>
    </div>
  )
}

export default ParticipantsLists;
