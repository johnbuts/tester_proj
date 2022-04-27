import React , {useState} from 'react';
import { Button} from '../ButtonsElements';
import { IndicatorContainer,IndicatorBtnWrapper ,ArrowForward,ArrowRight,StyledForm,StyledFormWrapper,StyledInput, getSingleStock} from './IndicatorElements'

// const webpack = require('webpack');
//alert(process.env.YAHOO);
//import yahooFinance from 'yahoo-finance';
//var yahooFinance = require('yahoo-finance');
var tickerList = ["AAPL","MSFT","GOOG","GOOGL","AMZN","TSLA","NVDA","FB","UNH","V","JNJ","WMT","PG","JPM","XOM","MA","CVX","BAC","HD","PFE","LLY","ABBV","KO","COST","AVGO","PEP","DIS","VZ","TMO","MRK","CSCO","CMCSA","ORCL","ACN","NKE","ABT","ADBE","DHR","INTC","MCD","CRM","WFC","BMY","TMUS","TXN","LIN","UPS","NEE","QCOM","PM","RTX","UNP","AMD","MS","NFLX","MDT","UAL","SCHW","AXP","T","CVS","SPGI","DE","AMGN","COP","HON","LOW","ANTM","INTU","LMT","CAT","PLD","PYPL","AMT","IBM","GS","TGT","BA","C","BLK","CHTR","AMAT","NOW","GE","ISRG","MO","SYK","EL","ADP","SBUX","BKNG","CB","DUK","MDLZ","ZTS","MMC","CME","ADI","MMM","CCI","CI","SO","MU","HCA","USB","GILD","REGN","CSX","EW","BDX","FCX","PNC","TJX","AON","NOC","VRTX","EOG","PSA","D","TFC","ICE","GD","NEM","CL","NSC","EQIX","LRCX","WM","FISV","SHW","PGR","FIS","BSX","MRNA","PXD","ATVI","SLB","F","ITW","MCO","MAR","GM","MET","WBD","HUM","OXY","DG","COF","ETN","EMR","APD","ADM","SRE","FTNT","ILMN","FDX","KHC","AIG","AEP","MPC","LHX","ECL","CNC","KLAC","PAYX","MCK","DOW","EXC","ROP","STZ","ORLY","DXCM","HSY","NUE","SNPS","NXPI","VLO","IQV","PRU","CMG","TRV","CTSH","KMI","CTVA","SYY","WELL","O","HLT","MNST","JCI","AZO","WMB","ADSK","GIS","AFL","CTAS","DVN","KMB","APH","SPG","PSX","KR","RSG","CDNS","DLR","IDXX","HPQ","XEL","TEL","GPN","ALL","MSCI","ANET","BKR","DLTR","MSI","SBAC","WBA","AJG","BAX","HAL","MCHP","BK","A","TWTR","ROST","PEG","HES","LYB","YUM","CARR","TDG","DD","PH","TSN","EA","ED","AVB","TT","RMD","ABC","EQR","VRSK","DFS","WEC","OKE","AMP","EBAY","ALGN","TROW","ARE","FAST","BF.B","ES","IFF","BIIB","OTIS","ODFL","ROK","PPG","WY","MTD","SIVB","AWK","AME","NDAQ","PCAR","HRL","APTV","GLW","EXR","CBRE","MOS","LVS","CMI","EXPE","WST","BLL","CPRT","FRC","CERN","LUV","STT","EIX","DAL","FE","MKC","FITB","DTE","KEYS","WTW","ZBH","EFX","MTCH","ENPH","DHI","GWW","ETR","CTRA","LH","FANG","HIG","AEE","IT","CHD","ALB","LYV","URI","ANSS","TSCO","STE","VTR","PARA","MAA","VRSN","CDW","VMC","RJF","CF","K","NTRS","SWK","TDY","MLM","DRE","ESS","CINF","LEN","ULTA","VFC","PPL","GRMN","FOX","FOXA","DOV","COO","BBY","CCL","ZBRA","FTV","RCL","CMS","CEG","MTB","HPE","CNP","SYF","PKI","FLT","MPWR","BRO","RF","SWKS","HBAN","MOH","PWR","BXP","MRO","AKAM","KEY","IR","HOLX","PEAK","PFG","J","GPC","PAYC","UDR","STX","JBHT","MGM","IP","INCY","BR","WAT","CLX","TER","AMCR","CAH","CFG","CPT","DISH","FMC","CAG","NTAP","CTLT","ROL","TRMB","DRI","POOL","TYL","WAB","IRM","BIO","OMC","EVRG","ATO","EXPD","TECH","SBNY","L","AES","FDS","EPAM","SEDG","GNRC","LNT","CE","DGX","TTWO","KIM","NLOK","TFX","APA","PKG","SJM","LDOS","XYL","TXT","HWM","WDC","CZR","KMX","JKHY","NVR","IEX","RE","ETSY","EMN","CRL","HST","ABMD","CPB","DPZ","LKQ","IPG","AVY","AAP","WRK","CHRW","VTRS","BEN","NI","UHS","CTXS","BBWI","NDSN","NWS","NWSA","QRVO","HSIC","CBOE","WRB","RHI","REG","TAP","AAL","FFIV","LUMN","PTC","MAS","HAS","CMA","SNA","DVA","JNPR","LNC","AIZ","XRAY","AOS","PHM","GL","WHR","SEE","NLSN","MKTX","LW","ZION","NRG","FRT","IVZ","ALLE","NWL","FBHS","CDAY","TPR","BWA","HII","PNW","PNR","WYNN","OGN","RL","VNO","MHK","DXC","UA","ALK","PENN","PVH","IPGP","NCLH"];


function getBuystrength(macdList){
    var buyStrength = 100; //start buy strength
    var combo = 0; //additional if its a streak of going down / up
    for(var index = macdList.length - 1; index >= macdList.length - 5 && index >= 0; index--){
      if(macdList[index] > macdList[index - 1]){ //means macd going up ... so buy strength go down
        if(combo > 0) combo = 0;
        combo -= 1;
        if(macdList[index] < 0 && macdList[index-1] < 0 ){
          combo *= 2;
        }
        buyStrength = buyStrength + combo - 1;
      }
  
      if(macdList[index] < macdList[index - 1]){ //means macd going down ... so buy strength go up
        if(combo < 0) combo = 0;
        combo += 1;
        if(macdList[index] > 0 && macdList[index-1] > 0 ){
          combo *= 2;
        }
        buyStrength = buyStrength + combo + 1;
      }
    }
  
    return buyStrength;
  }

  async function getSᎥngleStock(ticker){
    var yahooFinance = require('yahoo-finance');
    var movingAverage = require('macd');
    var priceArr = [];
    var buy_strength;
    var err,quotes = await yahooFinance.historical({
        symbol: ticker,
        from: '2022-03-10',
        to: '2022-04-21',  
    }, 
    function (err, quotes) {
        if(err) return "invalid";
        //console.log(movingAverage(priceArr));
    });

    if(quotes == []){
        return "invalid";
    }

    for(const stock_data of quotes){
        priceArr.push(stock_data["close"]);
    }

    buy_strength = getBuystrength(movingAverage(priceArr)["histogram"]);
    console.log(buy_strength);
    return buy_strength

}

const IndicatorSection = () =>{
    const [Indicator,setIndicator]=useState('');
    const [Period,setPeriod]=useState('3m');
    const[hover,setHover]=useState(false)
    const [value, setCount] = useState("invalid");

    const handleIncrement = () => {
        console.log(Period);
        console.log(Indicator);
        // var yahooFinance = require('yahoo-finance');
        //var ct = getSingle(Indicator);
        // var err, quotes = yahooFinance.historical({
        //     symbol: Indicator,
        //     from: '2022-03-10',
        //     to: '2022-04-21',
        //     period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
        // }, function (err, quotes) {
        //     if(err) throw err;
        //     //console.log(movingAverage(priceArr));
        //   });
        var ifValid = 0;
        for(const ticker of tickerList){
            if(ticker.toUpperCase().localeCompare(Indicator.toUpperCase()) == 0){
                setCount(getSingleStock[Period][Indicator.toUpperCase()]);
                ifValid = 1;
                break;
            }
        }
        if(ifValid == 0){
            setCount("Invalid ticker, please try again");
        }
         //getSingleStock function is above
      };
    
    const handleSubmit=(e)=>{
        e.preventDefault(); 
    }

    const onHover=()=>{
        setHover(!hover)
    }
    return (
        <IndicatorContainer>
            <StyledFormWrapper>
                <StyledForm onSubmit={handleSubmit}>
                    <label>Indicator Name</label>
                    <StyledInput
                    type="text"
                    required
                    value={Indicator}
                    onChange={(e)=>setIndicator(e.target.value)}
                    />
                    <label>Indicator period</label>
                    <select
                        value={Period}
                        onChange={(e)=>setPeriod(e.target.value)}
                        >
                    {/* <option value="1d">1day</option>
                    <option value="5d">5day</option> */}
                    <option value="1mo">1month</option>
                    <option value="3mo">3month</option>
                    <option value="6mo">6month</option>
                    <option value="1y">1year</option>
                    <option value="5y">5year</option>
                    </select>
                    <p>{Indicator}</p> 
                    <p>{Period}</p>
                    <p>Buy Strength:{value}</p>
                    
                </StyledForm>
             </StyledFormWrapper>
            <IndicatorBtnWrapper> 
                <Button 
                onClick={handleIncrement}
                onMouseEnter={onHover}
                onMouseLeave={onHover}
                primary= "true"
                dark="true"
                >
                Submit{hover ? <ArrowForward/>:<ArrowRight/>}
                </Button>
            </IndicatorBtnWrapper>


        </IndicatorContainer>
            
    );
}






export default IndicatorSection;