/*import FirstBar from "../Main/firstBar";
import SecondBar from "../Main/secondBar";
import Today from "../Main/today"
import { useEffect, useState } from "react";
import { CurrencyProvider } from '../CurrencyContext'

export default function Navbar() {
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

        </CurrencyProvider>
    )
}*/