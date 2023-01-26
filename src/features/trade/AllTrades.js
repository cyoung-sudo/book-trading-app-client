import "./AllTrades.css";
// React
import { useState, useEffect } from "react";
// APIs
import * as tradeAPI from "../../apis/tradeAPI";
// Components
import TradesDisplay from "../../components/display/TradesDisplay";
import Loading from "../../components/static/Loading";

export default function AllTrades() {
  // Requested data
  const [trades, setTrades] = useState(null);

  //----- Retrieve trades on load
  useEffect(() => {
    tradeAPI.getAll()
    .then(res => {
      if(res.data.success) {
        setTrades(res.data.trades);
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(trades) {
    return (
      <div id="allTrades">
        <div id="allTrades-header">
          <h1>All Trades</h1>
        </div>
  
        <div id="allTrades-tradesDisplay-wrapper">
          <TradesDisplay 
            trades={ trades }
            mode="display"/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};