import React, { useEffect, useState } from 'react'
import "./TradeToken.css";
import { tradingToken } from './data';
import {Decimal} from 'decimal.js';
var BigNumber = require('bignumber.js');

const TradeToken = ({ web3Obj, userInfo }) => {
  const [address, setAddress] = useState("");
  const [adress, setAdress] = useState("");
  const [amount, setAmount] = useState("");
  const [msgSender, setMsgSender] = useState({});
  const [info, setInfo] = useState({
    name: "",
    symbol: "",
    decimals: ""
  });

  const addressValue = (e) => {
    setAddress(e.target.value);
  };
  const adressValue = (e) => {
    setAdress(e.target.value);
  };
  const amountValue = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    tokenInfo();
  }, []);

  const tokenInfo = async () => { // ! ERC20 Trade Token Details
    var methods = new web3Obj.eth.Contract(tradingToken.ABI, tradingToken.contractAddress)
    const name = await methods.methods.name().call();
    const symbol = await methods.methods.symbol().call();
    const decimals = await methods.methods.decimals().call();
    setInfo({ name: name, symbol: symbol, decimals: decimals })
  }
  const mintToken = async (e) => { // ! Minting Function
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingToken.ABI, tradingToken.contractAddress)
    console.log(methods)
    console.log(amount)
    let x=new Decimal(amount);
    let y=new Decimal(1e18);
    let a =x.mul(y);
    BigNumber.config({
      EXPONENTIAL_AT: 30,
    });
    console.log("Decimal :",a.valueOf())
    var number = new BigNumber(a);
    console.log("Big Number",number.valueOf());
    const result = await methods.methods.mint(address, number).send({
      from: userInfo.account,
    })
    console.log(result)
    setAddress("");
    setAmount("");
  };
  const transferToken = async (e) => { // ! Tranfer Function
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingToken.ABI, tradingToken.contractAddress)
    web3Obj.eth.getAccounts().then(e => { let firstAcc = e[0]; setMsgSender(firstAcc) })
    console.log(amount)
    let x=new Decimal(amount);
    let y=new Decimal(1e18);
    let a =x.mul(y);
    BigNumber.config({
      EXPONENTIAL_AT: 30,
    });
    console.log("Decimal :",a.valueOf())
    var number = new BigNumber(a);
    console.log("Big Number",number.valueOf());
    const result = await methods.methods.transfer(address, number).send({from: msgSender.toString()});
    // await methods.methods.transfer(address, amount).send({from: msgSender.toString()});
    console.log(result);
    setAddress("");
    setAmount("");
  };
  const approveToken = async (e) => { // ! Approve Function
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingToken.ABI, tradingToken.contractAddress)
    web3Obj.eth.getAccounts().then(e => { let firstAcc = e[0]; setMsgSender(firstAcc) })
    let x=new Decimal(amount);
    let y=new Decimal(1e18);
    let a =x.mul(y);
    BigNumber.config({
      EXPONENTIAL_AT: 30,
    });
    console.log("Decimal :",a.valueOf())
    var number = new BigNumber(a);
    console.log("Big Number",number.valueOf());
    const result = await methods.methods.approve(address, number).send({
      from: msgSender
    });
    console.log(result)
    setAddress("");
    setAmount("");
  };
  const checkTokenAmount = async (e) => { // ! BalanceOf Function 
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingToken.ABI, tradingToken.contractAddress)
    var result = await methods.methods.balanceOf(address).call();
    result = web3Obj.utils.fromWei(result);   //Convert balance to wei
    console.log(result)
    // console.log(tradingToken.ABI);
    window.alert(result)
    setAmount("");
  
  };
  const checkAllowanceAmount = async (e) => { // ! Check Allowance Function
    e.preventDefault();
    var methods = new web3Obj.eth.Contract(tradingToken.ABI, tradingToken.contractAddress)
    var result = await methods.methods.allowance(address,adress).call();
    result = web3Obj.utils.fromWei(result); //Convert balance to wei
    console.log(result)
    window.alert(result)
    setAmount("");
  };
  
  return (
    <>
    <h3>Trade Token ERC20 Contract</h3>
        <h6>Name: {info?.name}</h6>
        <h6>Symbol: {info?.symbol}</h6>
        <h6>Decimals: {info?.decimals}</h6>
      <form className="marginTop" onSubmit={mintToken}>
        <div className="app-details">
          <h5>Mint Token Function</h5>
          <label htmlFor="address">Address</label>
          <input type="text" value={address} onChange={addressValue} />
          <br />
          <label htmlFor="amount">Amount</label>
          <input type="text" value={amount} onChange={amountValue} />
        </div>
        <button className="marginTop">Mint</button>
      </form>
      <form className="marginTop" onSubmit={transferToken}>
        <div className="app-details">
          <h5>Transfer Token Function</h5>
          <label htmlFor="address">Address To</label>
          <input type="text" name="addressTo" value={address} onChange={addressValue} />
          <br />
          <label htmlFor="amount">Amount</label>
          <input type="number" name="amount" value={amount} onChange={amountValue} />
        </div>
        <button className="marginTop">Transfer</button>
      </form>
      <form className="marginTop" onSubmit={approveToken}>
        <div className="app-details">
          <h5>Approve Token Function</h5>
          <label htmlFor="spender">Spender</label>
          <input type="text" name="spender" value={address} onChange={addressValue} />
          <br />
          <label htmlFor="amount">Amount</label>
          <input type="number" value={amount} onChange={amountValue} />
        </div>
        <button className="marginTop">Approve</button>
      </form>
      <form className="marginTop" onSubmit={checkTokenAmount}>
        <div className="app-details">
          <h5>Check Token Balance Function</h5>
          <label htmlFor="address">Address</label>
          <input type="text" name="addressCheck" value={address} onChange={addressValue} />
        </div>
        <button className="marginTop">Check</button>
      </form>
      <form className="marginTop" onSubmit={checkAllowanceAmount}>
        <div className="app-details">
          <h5>Check Token Approve Function</h5>
          <label htmlFor="Owner">Owner Address</label>
          <input type="text" name="owner" value={address} onChange={addressValue} />
          <label htmlFor="Spender">Spender Address</label>
          <input type="text" name="spender" value={adress} onChange={adressValue} />
        </div>
        <button className="marginTop">Check</button>
      </form>
    </>
  )
}

export default TradeToken;