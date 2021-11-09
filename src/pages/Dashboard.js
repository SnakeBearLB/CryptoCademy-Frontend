import { Link } from "react-router-dom"

const Dashboard = ({ coinData, user }) => {

  const loaded = () => {

    const wallet = user.portfolio;

    let coinValues = [];
    
    const portfolioBalance = () => {
      // coinBalance + usdBalance
      const coinValues = coinData.map(coin => {
        let id = coin.symbol.toUpperCase();
        if (wallet.hasOwnProperty(id)) {
          return wallet[`${id}`] * coin.current_price
        } else {
          return 0;
        }
      })
      const sum = coinValues.reduce((a, b) => a + b, 0);
      // console.log(coinValues)
      const balance = sum + wallet.USD;
      return balance;
    };

    const coins = coinData.map(coin => {
      return (
        <div>
          <h1>{coin.symbol}</h1>
          <p>{coin.current_price}</p>
        </div>
      )
    })
    
    return (
     <div>
      <div>
        <Link to="/portfolio">
          <p>Portfolio Balance</p>
          <p>{`$${portfolioBalance()}`}</p>
        </Link>
        
        <h1>Coin Listings</h1>
        
        <p>{coins}</p>

      </div>
    </div> 
    )
  };

  const loading = () => {
    return (
      <h1>Loading...</h1>
    );
  };

  return coinData ? loaded() : loading();
}
export default Dashboard;