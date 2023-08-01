import React, {FC,useEffect,useContext,useState, ReactNode, useCallback } from "react";
import lotteryAbi from './configs/lotteryAbi.json'
import {ContractInterface, ethers} from 'ethers'
import getProvider from "./services/getProvider";
import getContract from "./services/getContract";

type Props = {
    children: ReactNode
}
type Account = {
  address:string,
  balance: string,
}

const Context = React.createContext<any>(null);

const Provider : FC<Props>  = ({ children })=> {


  const [provider,setProvider] = useState<ethers.providers.Web3Provider | undefined>();
  const[signer,setSigner] = useState<ethers.Signer | undefined>()
  const [account, setAccount] = useState<Account | undefined>();
  const [contract,setContract] = useState<ethers.Contract|undefined>();
  const [owner,setOwner] = useState<string>("");
  const [list,setList] = useState<Array<string>>([]);

  

  // const reset = () => {
  //   setProvider(undefined);
    
  // }

  const connect = async() : Promise<any> =>{
      try{
        let _provider = await getProvider()
      if(_provider instanceof ethers.providers.Web3Provider){
        let _accounts = await _provider.send('eth_requestAccounts', []);
        let _balance = await _provider.getBalance(_accounts[0])
        setAccount({
          address: _accounts[0],
          balance: _balance.toString()
        })
        const signer = await _provider.getSigner(0);
        setSigner(signer);
        setProvider(_provider);
      //   if(!signer) throw new Error("Unable to get signer");
      //   const contractInstance = await getContract("0xd9F1297f77a7CCcdd9578d41D09E4E63Ec67badd",lotteryAbi,signer)
        
      //   setContract(contractInstance);
      }
      else console.log(provider);
      } catch(err:any){
        console.log(err);
      }
      
  }

  const getContract = async(address:string, abi:ContractInterface, signer: ethers.Signer) =>{
    const _contractInstance = new ethers.Contract(address,abi,signer);
    setContract(_contractInstance);
  }



  const getOwner = useCallback(async():Promise<void> => {
    if(!contract) console.log("Contract is being deployed");
    else {
      const _owner = await contract.owner();
      setOwner(_owner);
    }
    
  },[contract])

  const getLists = useCallback(async():Promise<void> => {
    if(!contract) console.log("Contract is being deployed");
    else {
      const _lists = await contract.getList();
      setList(_lists);
    }
    
  },[contract])

  

 

  


  useEffect(()=>{
    getOwner();
    getLists();
 })

  

  
  return (
    <Context.Provider value={{getContract ,getLists,list,getOwner,connect,provider,signer,account,contract,owner}}>
      {children}
    </Context.Provider>
  );
};



export default Provider;

export const useWeb3Context = () => useContext(Context);