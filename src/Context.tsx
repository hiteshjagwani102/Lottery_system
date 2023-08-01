import React, {FC,useEffect,useContext,useState, ReactNode, useCallback } from "react";
import {ethers} from 'ethers'
import getProvider from "./services/getProvider";
import lotteryAbi from './configs/lotteryAbi.json'

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


  const connect = useCallback(async() : Promise<void> =>{
      try{
        const _provider = await getProvider()
      if(_provider instanceof ethers.providers.Web3Provider){
        const _accounts = await _provider.send('eth_requestAccounts', []);
        const _balance = await _provider.getBalance(_accounts[0])
        setAccount({
          address: _accounts[0],
          balance: _balance.toString()
        })
        const signer = await _provider.getSigner(0);
        setSigner(signer);
        setProvider(_provider);
      }
      else console.log(provider);
      } catch(err){
        console.log(err);
      }
      
  },[provider])

  const getContract = useCallback(async() =>{
    const _contractInstance = new ethers.Contract("0xB2Ae695aEfca27F10A9A705F4D4Cb531E1125996",lotteryAbi,signer);
    setContract(_contractInstance);
  },[signer])


  const getOwner = useCallback(async():Promise<void> => {
    if(contract) {
      const _owner = await contract.owner();
      setOwner(_owner);
    }
    
  },[contract])

  const getLists = useCallback(async():Promise<void> => {
    if(contract) {
      const _lists = await contract.getList();
      setList(_lists);
    }
    
  },[contract])


  const getCurrentWalletConnected = async() => {
    if(window.ethereum) {
      try {
        if(provider){
          const _accounts = await provider.listAccounts();
          const _balance = await provider.getBalance(_accounts[0])
          setAccount({
            address: _accounts[0],
            balance: _balance.toString()
          })
        }
         else {
          console.log("Connect to MetaMask using the Connect Button")
        }
        
      } catch(err: any){
        setAccount(undefined)
        console.log(err.message)
      }
      
    }else {
      setAccount(undefined)
      console.log("Please Install Metamask")
    }
  }

  const addWalletListener = async() => {
    if(window.ethereum) {
      if(provider){
        window.ethereum.on("accountsChanged", (accounts:any)=>{
          const _balance = provider.getBalance(accounts[0])
          setAccount({
            address:accounts[0],
            balance:_balance.toString()
          })
        })
      }
      
    }else {
      setAccount(undefined)
      console.log("Please Install Metamask")
    }
  }


  useEffect(()=>{
    getLists();
    getOwner();
    addWalletListener();
    getCurrentWalletConnected();
 })

  

  
  return (
    <Context.Provider value={{getContract ,getLists,list,getOwner,connect,provider,signer,account,contract,owner}}>
      {children}
    </Context.Provider>
  );
};



export default Provider;

// eslint-disable-next-line react-refresh/only-export-components
export const useWeb3Context = () => useContext(Context);