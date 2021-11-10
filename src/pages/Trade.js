/*~~~~~~~~~~~~~~~DESCRIPTION~~~~~~~~~~~~~~~~~~~~~~~~~~~
This page allows you to trade one coin for another

~~~~~~~~~~~~~~~~PROPS TO PASS~~~~~~~~~~~~~~~~~~~~~~~~~~
user = the current user
refreshUser = function for refreshing the current users data
*/
import {useState} from 'react';
import {Option, Number, Submit,Arrow,Error,Success,Balance,Form, Div, Option1} from '../styles/Trade.styled'
import Navlinks from '../components/Navlinks'
function Trade(props) {
    //~~~~~~~~~~~~~~~~~~~~~~~STATE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
        //*********Status messages******************
        //this will hold an error message in the event that one is sent back by the backend
        const[error, setError] = useState(null)
        //this lets the dom know wheter a backend request is in progress
        const[loading, setLoading] = useState(false)
        //success message to be sent back from the backend
        const[success, setSuccess] = useState(false)
        //*********Form Tracking *******************/
        //the coin which the user wants to trade
        const[sellCoinSymbol, setSellCoinSymbol]=useState("USD")
        //the amount of coin the user wants to trade
        const[sellAmount, setSellAmount]=useState("")
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //refactors the portfolio into an array
    const portfolio = Object.entries(props.user.portfolio)
    
    //~~~~~~~~~~~~~~~~~~FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //handles changes within the trade amount
    const onSellAmountChange = (event)=>{
        setError(null)
        setSuccess(null)
        //if someone tries to enter an amount smaller then 0 and or larger the amount they have to trade then send them an error message
        if(event.target.value < 0 || event.target.value > props.user.portfolio[sellCoinSymbol]){
            setError(`Please enter an amount between 0 and ${props.user.portfolio[sellCoinSymbol]}`)
            setSellAmount("")
        }else{
            setSellAmount(event.target.value)
        }
    }
    //this changes the value of select balance to represent the currently selected coin
    const sellCoinChange = (event) =>{
        setSellCoinSymbol(event.target.value)
    }
    //this functions handles the submission of a trade
    const handleTrade = async (event) =>{
        event.preventDefault()
        // ~~~~~~~~~~~~~~~~~~~~~~~~~VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //user input vars
        const sellAmount =  event.target.sellAmount.value
        const sellCoinSymbol = event.target.sellCoin.value
        const buyCoinSymbol = event.target.buyCoin.value

        //this will calculate the amount of the buycoin you will receive after the trade

        //the current WORTH in USD of sellCoin
        const sellCoinWorth = (sellCoinSymbol === "USD")?sellAmount:sellAmount * props.coinData.find(coin=>coin.symbol === sellCoinSymbol.toLowerCase()).current_price
        //the current PRICE of buycoin
        const buyCoinPrice =  (buyCoinSymbol === "USD")?1:props.coinData.find(coin=>coin.symbol === buyCoinSymbol.toLowerCase()).current_price
        //total worth in of sellCoin divide by total price of buycoin
        const buyCoinAmount = sellCoinWorth/buyCoinPrice
        //the body object to send to the backend
        const body = JSON.stringify({
            userName:props.user.userName,
            transaction : {
            exchange:[sellCoinSymbol, parseFloat(sellAmount)],
            for:[buyCoinSymbol, parseFloat(buyCoinAmount)]
         }
        })
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // backend call to attempt the trade
        setLoading(true)
        const URL = "https://hidden-journey-86205.herokuapp.com/trade"
        const data = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "Application/json"
            },
            body: body,
          })
        setLoading(false)
        setSuccess(`Traded ${sellCoinSymbol} ${sellAmount} for ${buyCoinAmount} ${buyCoinSymbol}`)
        setSellAmount("")
        props.refreshUser()
    }

        return(
            <Div>
            {/* status messages */}
            {(error)?<Error>{error}</Error>:null}
            {(success)?<Success>{success}</Success>:null}
                <Form onSubmit={handleTrade}>
                <Balance id="selectBalance">{sellCoinSymbol} Available: {props.user.portfolio[sellCoinSymbol]}</Balance>
                    {/* the select menu for which coin you want to sell */}
                    <Option name="sellCoin" onChange={sellCoinChange}>
                        {/* if the user any amount of a coin larger then 0 then add to the dropdown */}
                        {portfolio.map(e=>(e[1])?<option value={e[0]}>{e[0]}</option>:null)}
                    </Option>
                    
                    {/* the amount of the the selected coin you want to sell */}
                    <Number type="number" name="sellAmount" value={sellAmount} placeholder="Amount to sell" onChange={onSellAmountChange} step="any"/>                    <Arrow>➝</Arrow>
                    
                    {/* select menu for the coin you want to buy */}
                    <Option1 name="buyCoin">``
                        {portfolio.map(e=><option value={e[0]}>{e[0]}</option>)}
                    </Option1>
                    <Submit type="submit" value="Submit Trade"/>
                </Form>
            </Div>
        )


}

export default Trade