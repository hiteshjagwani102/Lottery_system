import React, {FC,useEffect,useContext,useState, ReactNode} from "react";
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

  const contactAddress = "0x22594fBD62F0bF1a9Cb0CDbF78aB99e6C0bbb8Cc";
  const [provider,setProvider] = useState<ethers.providers.Web3Provider | undefined>();
  const[signer,setSigner] = useState<ethers.Signer | undefined>()
  const [account, setAccount] = useState<Account | undefined>();
  const [contract,setContract] = useState<ethers.Contract|undefined>();
  const [owner,setOwner] = useState<string | undefined>("");
  const [list,setList] = useState<Array<string>>([]);


  const connect = async() : Promise<void> =>{
      try{
        const _provider = await getProvider()
      if(_provider instanceof ethers.providers.Web3Provider){
        const _accounts = await _provider.send('eth_requestAccounts', []);
        const _balance = await _provider.getBalance(_accounts[0])
        setAccount({
          address: _accounts[0],
          balance: _balance.toString()
        })
        const signer = _provider.getSigner(0);
        setSigner(signer);
        setProvider(_provider);
        const contract =  new ethers.Contract(contactAddress,lotteryAbi,signer);
        await contract.deployed()
        setContract(contract);
        const owner = await contract.owner();
        setOwner(owner);
      }
      else console.log(provider);
      } catch(err){
        console.log(err);
      }
      
    }

  const getLists = async(_contract:ethers.Contract):Promise<void> => {
    try{
      if(_contract) {
        const list = await _contract.getList();
        setList(list);
      }
      else setList([]);
    }catch(error){
      console.log(error);
    }
  };

  const reset = () => {
    setAccount(undefined);
    setProvider(undefined);
    setSigner(undefined);
    setOwner("");
    setList([]);
    setContract(undefined);
  }

  useEffect(()=>{

    const addWalletListener = async() => {
    if(window.ethereum) {
      if(provider instanceof ethers.providers.Web3Provider){
         window.ethereum.on("accountsChanged", async (accounts:any)=>{
          if(accounts.length>0){
            const _balance = await provider.getBalance(accounts[0])
          setAccount({
            address:accounts[0],
            balance:_balance.toString()
          })
          const signer = provider.getSigner(0);
            const contract =  new ethers.Contract(contactAddress,lotteryAbi,signer);
            await contract.deployed()
            setContract(contract);
            const owner = await contract.owner();
        setOwner(owner);
          }
          else{
              reset();
          }
        })
      }
      
    }else {
      console.log("Please Install Metamask")
    }
  }
  addWalletListener();

  },[account]);



  useEffect(()=>{
    const getCurrentWalletConnected = async() => {
      if(window.ethereum) {
        try {
          const provider = await getProvider();
          if(provider instanceof ethers.providers.Web3Provider){
            const _accounts = await provider.listAccounts();
  
            if(_accounts.length>0){
              const _balance = await provider.getBalance(_accounts[0])
            setAccount({
              address: _accounts[0],
              balance: _balance.toString()
            })
            setProvider(provider);
            const signer = provider.getSigner(0);
            const contract =  new ethers.Contract(contactAddress,lotteryAbi,signer);
            await contract.deployed()
            setContract(contract);
            const owner = await contract.owner();
            setOwner(owner);
            }
            else reset();
          }
          else console.log("Web3 environment not detected")
            
          
        } catch(err: any){
          console.log(err.message)
        }
        
      }else {
        console.log("Please Install Metamask")
      }
    }

    getCurrentWalletConnected();
    
  },[])

  useEffect(()=>{
    if(contract) getLists(contract);
  })

  
  return (
    <Context.Provider value={{getLists,list,connect,provider,signer,account,contract,owner}}>
      {children}
    </Context.Provider>
  );
};



export default Provider;

// eslint-disable-next-line react-refresh/only-export-components
export const useWeb3Context = () => useContext(Context);