import { CurrencyProvider } from "../CurrencyContext";
import MainBody from "./MainBody";
import MainNav from "./MainNav";
import { useEffect, useState } from "react";
import FirstBar from "./firstBar";
import SecondBar from "./secondBar";
import Today from "./today";


export default function Main() {

    const [coinData, setCoinData] = useState({ data: { coins: [], stats:{} } })

    useEffect(() => {
        const options = {
          headers: {
            'x-access-token': 'coinrankingac6426055ddffb35c88b621d66b5a61377efc83d9c655028',
          },
        };
        
        fetch('https://api.coinranking.com/v2/coins', options)
          .then((response) => response.json())
          .then((result) => setCoinData(result));
      }, [])

      const [totalData, setTotalData] = useState({ data: { coins: [], stats:{} } })

    useEffect(() => {
        const options = {
          headers: {
            'x-access-token': 'coinrankingac6426055ddffb35c88b621d66b5a61377efc83d9c655028',
          },
        };
        
        fetch('https://api.coinranking.com/v2/coins', options)
          .then((response) => response.json())
          .then((result) => setTotalData(result));
      }, [])
      
      
    return(
        <CurrencyProvider>
            <FirstBar totalData={totalData.data.stats} />
            <SecondBar />
            <Today totalData={totalData.data.stats} />
            <MainNav />
            <MainBody coinData={coinData.data.coins} />
        </CurrencyProvider>
    )
}



