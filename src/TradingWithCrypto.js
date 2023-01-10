import React, {useState} from "react";
import { tradingWithCrypto, tradingToken } from './data'
import {Decimal} from 'decimal.js';
import TradesDetails from "./TradesDetails";

// const Web3 = require("web3");
var BigNumber = require('bignumber.js');


const TradingWithCrypto = ({ web3Obj, userInfo }) => {
  const [tradeId, setTradeId]=useState("");
  const [assetName, setAssetName]=useState("");
  const [currency, setCurrency] = useState("");
  const [address, setAddress]=useState("");
  const [hash, setHash]=useState("");
  const [amount, setAmount]=useState("");
  const [tradeType, setTradeType]=useState("");
  const [role, setRole]=useState("");
  const [uri, setUri]=useState("");
  const [tradeByIds,setTradeByIds]=useState([]);
  const [tradeDetailsByIds,setTradeDetailsByIds]=useState([]);
 
  const tradeIdValues=(e)=>{
    setTradeId(e.target.value);
  };
  const assetNameValues=(e)=>{
    setAssetName(e.target.value);
  };
  const currencyValues=(e)=>{
    setCurrency(e.target.value);
  };
  const addressValues=(e)=>{
    setAddress(e.target.value);
  }
  const hashValues=(e)=>{
    setHash(e.target.value);
  }
  const amountValues=(e)=>{
    setAmount(e.target.value);
  }
  const tradeTypeValues=(e)=>{
    setTradeType(e.target.value);
  }
  const roleValues=(e)=>{
    setRole(e.target.value);
  }
  const uriValues=(e)=>{
    setUri(e.target.value);
  }
  
  const onAddCurrency = async (e) => { // ! Adding Currency
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.addCurrency(currency,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setCurrency("");
    setAddress("");
  };
  const onRemoveCurrency = async (e) => { // ! Removing Currency
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.removeCurrency(currency).send({
      from: userInfo.account,
    })
    console.log(result)
    setCurrency("");
  };
  const onAllCurrenciesAllowed = async (e) => { // ! Currencies Allowed Function
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.allCurrenciesAllowed().call();
    console.log(result);
    window.alert(result);
  };
  const onSellerRole = async(e)=>{ // ! checking Seller role
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(tradingWithCrypto.ABI,tradingWithCrypto.contractAddress)
    const result=await methods.methods.SELLER_ROLE().call();
    console.log(result);
    window.alert(result);
  }
  const onTraderRole = async(e)=>{ // ! checking Auctioner role
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(tradingWithCrypto.ABI,tradingWithCrypto.contractAddress)
    const result=await methods.methods.TRADER_ROLE().call();
    console.log(result);
    window.alert(result);
  }
  const onBuyerRole = async(e)=>{ // ! checking Auctioner role
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(tradingWithCrypto.ABI,tradingWithCrypto.contractAddress)
    const result=await methods.methods.BUYER_ROLE().call();
    console.log(result);
    window.alert(result);
  }
  const onGrantRole = async (e) => { // ! Grant role 
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.grantRole(role,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setRole("");
    setAddress("");
  };
  const onRevokeRole = async (e) => { // ! Revoke role
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.revokeRole(role,address).send({
      from: userInfo.account,
    })
    console.log(result)
    setRole("");
    setAddress("");
  };
  const onHasRole = async (e) => { // ! Checking role
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.hasRole(role,address).call();
    console.log(result);
    window.alert(result);
  };
  const onCreateTrade = async (e) => { // ! Creating Trade
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    console.log(amount)
    let x=new Decimal(amount);
    let y=new Decimal(1e18);
    let a =x.mul(y);
    console.log("Decimal : ",a.valueOf())
    var number = new BigNumber(a);
    BigNumber.config({
      EXPONENTIAL_AT: 30,
    });
    console.log("Big Number : ",number.valueOf());
    const result = await methods.methods.createtrade(tradeId, assetName, currency, address, number, tradeType).send({
      from: userInfo.account,
    })
    console.log(result)
    setTradeId("");
    setAssetName("");
    setCurrency("");
    setAddress("");
    setAmount("");
    setTradeType("");
  };
  const onTradingDetails = async (e) => { // ! Getting Trade Details
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.tradingDetails(tradeId).call();  
    console.log("Trade Number : "+result[0]);
    console.log("Asset Name : "+result[1]);
    console.log("Currency : "+result[2]);
    console.log("Seller Address : "+result[3]);
    console.log("Buyer Address : "+result[4]);
    console.log("Trade Amount : "+web3Obj.utils.fromWei(result[5]));
    console.log("BL Hash : "+result[6]);
    window.alert([
    "TradeNumber : "+result[0],
    "AssetName : "+result[1],
    "Currency : "+result[2],
    "SellerAddress : "+result[3],
    "BuyerAddress : "+result[4],
    "Amount : "+web3Obj.utils.fromWei(result[5]),
    "BLHash : "+result[6]
    ]);
  };
  const onAgreeToTrade = async (e) => { // ! Agree to Trade
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.agreeToTrade(tradeId).send({
      from: userInfo.account,
    });
    console.log(result)
    setTradeId("");
  };
  const onUpdateBL = async (e) => { // ! Update BL
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.updateBL(tradeId, hash).send({
      from: userInfo.account,
    });
    console.log(result)
    setTradeId("");
    setHash("");
  };
  const onVerifyBL = async (e) => { // ! Verify BL
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.verifyBL(tradeId).send({
      from: userInfo.account,
    });
    console.log(result)
    setTradeId("");
  };
  const onUpdateBaseUri = async (e) => { // ! Set Trade Hash
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.updateBaseUri(tradeId).send({
      from: userInfo.account,
    });
    console.log(result)
    setTradeId("");
  };
  const onGetTradingHash = async (e) => { // ! Get Trade Hash 
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingWithCrypto.ABI, tradingWithCrypto.contractAddress)
    const result = await methods.methods.getTradingHash(tradeId).call();
    console.log("Trading Hash : ",result)
    window.alert("Trading Hash : "+result)
    setTradeId("");
  };
  const onGetAllTradingIdsDetails=async(e)=>{ // Getting all Trade ids Details
    e.preventDefault();
    console.log(tradingWithCrypto.ABI);
    var methods=new web3Obj.eth.Contract(tradingWithCrypto.ABI,tradingWithCrypto.contractAddress)
    const result1=await methods.methods.allTradingNumbers().call();
    const result2=await methods.methods.batchDetailsTrades(result1).call();

    setTradeDetailsByIds(result2);
    setTradeByIds(result1);
  }


  return (
    <>
    <h3>Trading With Crypto Contract</h3>
      <form className="marginTop" onSubmit={onAddCurrency}>
        <div className="app-details">
          <h5>Add Currency function</h5>
          <label htmlFor="currency">currency</label>
          <input type="text" value={currency} onChange={currencyValues} />
          <br />
          <label htmlFor="address">Currency Address</label>
          <input type="text" value={address} onChange={addressValues} />
        </div>
        <button className="marginTop">Add Currency</button>
      </form>
      <form className="marginTop" onSubmit={onRemoveCurrency}>
        <div className="app-details">
          <h5>Remove Currency function</h5>
          <label htmlFor="currency">currency</label>
          <input type="text" value={currency} onChange={currencyValues} />
        </div>
        <button className="marginTop">Remove Currency</button>
      </form>
      <form className="marginTop" onSubmit={onAllCurrenciesAllowed}>
        <div className="app-details">
          <h5>Get All Currencies Allowed function</h5>
        </div>
        <button className="marginTop">Currencies Allowed</button>
      </form>
      <form className="marginTop" onSubmit={onSellerRole}>
        <div className="app-details">
          <h5>Seller Role</h5>
        </div>
        <button className="marginTop">Seller Role details</button>
      </form>
      <form className="marginTop" onSubmit={onTraderRole}>
        <div className="app-details">
          <h5>Trader Role</h5>
        </div>
        <button className="marginTop">Trader Role details</button>
      </form>
      <form className="marginTop" onSubmit={onBuyerRole}>
        <div className="app-details">
          <h5>Buyer Role</h5>
        </div>
        <button className="marginTop">Buyer Role details</button>
      </form>
      <form className="marginTop" onSubmit={onGrantRole}>
        <div className="app-details">
          <h5>Grant Role Function</h5>
          <label htmlFor="role">Role</label>
          <input type="text" value={role} onChange={roleValues} />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValues} />
        </div>
        <button className="marginTop">Grant Role</button>
      </form>
      <form className="marginTop" onSubmit={onRevokeRole}>
        <div className="app-details">
          <h5>Revoke Role Function</h5>
          <label htmlFor="role">Role</label>
          <input type="text" value={role} onChange={roleValues} />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValues} />
        </div>
        <button className="marginTop">Revoke Role</button>
      </form>
      <form className="marginTop" onSubmit={onHasRole}>
        <div className="app-details">
          <h5>Has Role Function</h5>
          <label htmlFor="role">Role</label>
          <input type="text" value={role} onChange={roleValues} />
          <br />
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValues} />
        </div>
        <button className="marginTop">Check Role</button>
      </form>
      <form className="marginTop" onSubmit={onCreateTrade}>
        <div className="app-details">
          <h5>Create Trade Function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
          <br />
          <label htmlFor="assetName">Asset Name</label>
          <input type="text" value={assetName} onChange={assetNameValues} />
          <br />
          <label htmlFor="currency">currency</label>
          <input type="text" value={currency} onChange={currencyValues} />
          <br />
          <label htmlFor="address">Wallet Address</label>
          <input type="text" value={address} onChange={addressValues} />
          <br />
          <label htmlFor="amount">Trade Amount</label>
          <input type="text" value={amount} onChange={amountValues} />
          <br />
          <label htmlFor="tradeType">Trade Type</label>
          <input type="text" value={tradeType} onChange={tradeTypeValues} />
          <br />
          </div>
        <button className="marginTop">Create Trade</button>
      </form>
      <form className="marginTop" onSubmit={onTradingDetails}>
        <div className="app-details">
          <h5>Trade Details Function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
        </div>
        <button className="marginTop">Trade Details</button>
      </form>
      <form className="marginTop" onSubmit={onAgreeToTrade}>
        <div className="app-details">
          <h5>Agree To Trade function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
        </div>
        <button className="marginTop">Agree to Trade</button>
      </form>
      <form className="marginTop" onSubmit={onUpdateBL}>
        <div className="app-details">
          <h5>Add BL hash function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
          <br/>
          <label htmlFor="hash">Trade Hash</label>
          <input type="text" value={hash} onChange={hashValues} />
        </div>
        <button className="marginTop">BL hash</button>
      </form>
      <form className="marginTop" onSubmit={onVerifyBL}>
        <div className="app-details">
          <h5>Verify BL function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
        </div>
        <button className="marginTop">Verify BL</button>
      </form>
      <form className="marginTop" onSubmit={onUpdateBaseUri}>
        <div className="app-details">
          <h5>Update Base Uri function</h5>
          <label htmlFor="uri">Upadate uri</label>
          <input type="text" value={uri} onChange={uriValues} />
        </div>
        <button className="marginTop">Update Uri</button>
      </form>
      <form className="marginTop" onSubmit={onGetTradingHash}>
        <div className="app-details">
          <h5>Get BL Uri function</h5>
          <label htmlFor="tradeId">Trade Id</label>
          <input type="text" value={tradeId} onChange={tradeIdValues} />
        </div>
        <button className="marginTop">Get Uri</button>
      </form>
      <form className="marginTop" onSubmit={onGetAllTradingIdsDetails}>
        <div className="app-details">
          <h5>Get All Trades</h5>
        </div>
        <button className="marginTop">All Trading Details</button>
      </form>
      <TradesDetails TradeDetailsByIds={tradeDetailsByIds} AuctionByIds={tradeByIds} />
    
    </>
  )
}
export default TradingWithCrypto;