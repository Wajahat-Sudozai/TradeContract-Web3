import React from "react";
const Web3 = require("web3");


 const TradesDetails=({TradeDetailsByIds,TradeByIds})=>{
    console.log(TradeByIds);
    console.log(TradeDetailsByIds);
     return( 
        <>
        <div className="app-details" style={{marginTop:'5px'}}>
        <h5>TRADE DETAILS BY INDEXED : </h5>
         {TradeDetailsByIds?.map(item=>{
            console.log("Item:",item.acceptTrade)
            return <p>
            <br/>TradeNumber : {item[0]},
            <br/>AssetName : {item[1]},
            <br/>Currency : {item[2]},
            <br/>SellerAddress : {item[3]},
            <br/>BuyerAddress : {item[4]},
            <br/>Amount : {Web3.utils.fromWei(item[5])},
            <br/>BLHash : {item[6]},
            <br/>AcceptTrade : {item[7]?'True':'False'},
            <br/>VerifyBL : {item[8]?'True':'False'},
            <br/>TradeType : {item[9]}
            </p>     
        })}
        <br/>
        <h5>TRADE INDEXED :</h5>
        {TradeByIds?.map(item=>{
            return <p>{item}</p>
        })
        }
        </div>
        </>
        )
 }
 export default TradesDetails;