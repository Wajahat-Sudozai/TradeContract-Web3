import { useState, useEffect } from 'react';
import Web3 from 'web3';
import TradeToken from './TradeToken';
import TradingWithCrypto from './TradingWithCrypto';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [web3Obj, setweb3Obj] = useState({});

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
    
    function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem('userAccount'));
      if (userData != null) 
      {
        setUserInfo(userData);
        setIsConnected(true);
      }
    }
    checkConnectedWallet();
  }, []);

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      // eslint-disable-next-line
      provider = window.web3.currentProvider;
    } else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
    return provider;
  };

  const networks = { //Different Types of Networks
    polygonMainnet: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"]
    },
    ethereumMainnet: {
      chainId: `0x${Number(1).toString(16)}`,
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      blockExplorerUrls: ["https://etherscan.io"]
    },
    polygonTestnet: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Mumbai Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com"]
    },
    goerliTestnet: {
      chainId: `0x${Number(5).toString(16)}`,
      chainName: "Goerli Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
      },
      rpcUrls: ["https://goerli.infura.io/v3/"],
      blockExplorerUrls: ["https://goerli.etherscan.io"]
    },
    binanceTestnet:{
      chainId: `0x${Number(97).toString(16)}`,
      chainName: "Binance Testnet",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18
      },
      rpcUrls: ["https://speedy-nodes-nyc.moralis.io/7c8a67cbcd6fae3660c9771a/bsc/testnet"],
      blockExplorerUrls: ["https://testnet.bscscan.com/"]
    }
   

  };
  
  const changeNetwork = async ( ) => { //Change selecting Network
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["goerliTestnet"]
          }
        ]
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const onConnect = async () => { //Connecting to Metamask
    try {
        const currentProvider = detectCurrentProvider();
        if (currentProvider) {

        if (currentProvider !== window.ethereum) {
          console.log(
            'Non-Ethereum browser detected. You should consider trying MetaMask!'
          );
         }
        
        const chainIds = await currentProvider.request({ method: 'eth_chainId' });
        const Chain_Id = `0x${Number(5).toString(16)}`
        if(chainIds === Chain_Id){
         console.log("Bravo!, you are on the correct network");

         await currentProvider.request({ method: 'eth_requestAccounts' });
         const web3 = new Web3(currentProvider);
         setweb3Obj(web3)
         const userAccount = await web3.eth.getAccounts();
         const chainId = await web3.eth.getChainId();
         const account = userAccount[0];
         let ethBalance = await web3.eth.getBalance(account);     // Getting wallet balance
         ethBalance = web3.utils.fromWei(ethBalance, 'ether');    //Convert balance to wei
         saveUserInfo(ethBalance, account, chainId);
         if (userAccount.length === 0) {
           console.log('Please connect to metamask');
         }
        }
        else {
          try {
            await currentProvider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${Number(5).toString(16)}`}],
            });
            
          console.log("You have succefully switched to correct Test network")
          } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 5902) {
             console.log("This network is not available in your metamask, please add it")
             //Adding Network
              try{
              await changeNetwork();
              }catch(switchError)
              {
                console.log("Failed to switch to the network") 
              }
            }
            console.log("Failed to switch to the network")
          }
        console.log("oulalal, switch to the correct network");
        }
    }
    } catch (err) {
      console.log(
        'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
      );
    }
  };

  const onDisconnect = () => { //Disconnecting to Metamask
    window.localStorage.removeItem('userAccount');
    setUserInfo({});
    setIsConnected(false);
  };

  const saveUserInfo = (ethBalance, account, chainId) => { //Saving Connect User Wallet address
    const userAccount = {
      account: account,
      balance: ethBalance,
      connectionid: chainId,
    };
    window.localStorage.setItem('userAccount', JSON.stringify(userAccount)); //user persisted data
    const userData = JSON.parse(localStorage.getItem('userAccount'));
    setUserInfo(userData);
    setIsConnected(true);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>MetaMask Connection With Web3 js</h1>
      </div>
      <div className="app-wrapper">
        {!isConnected && (
          <div>
            <button className="app-buttons__login" onClick={onConnect}>
              Connect to MetaMask
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="app-wrapper">
          <div className="app-details">
            <h2>✅ You are connected to metamask.</h2>
            <div className="app-account">
              <span>Account number:</span>
              {userInfo.account}
            </div>
            <div className="app-balance">
              <span>Balance:</span>
              {userInfo.balance}
            </div>
            <div className="app-connectionid">
              <span>Chain ID:</span>
              {userInfo.connectionid}
            </div>
          </div>
          <div>
            <button className="app-buttons__logout" onClick={onDisconnect}>
              Disconnect
            </button>
          </div>
          <TradeToken web3Obj={web3Obj} userInfo={userInfo} />
          <TradingWithCrypto web3Obj={web3Obj} userInfo={userInfo}/>
        </div>
      )}
    </div>
  );
}

export default App;