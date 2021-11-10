import { Link } from "react-router-dom"
import { Div, Li, Ul, H3, Title, Img, Price, PLink, PBLink } from "../styles/Dashboard.styled"

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
        <Div >
          <div className="container">
            <Ul>
              <div className="col-sm">
                <Li>
                  <Img src={coin.image} alt="" />
                </Li>
              </div>
              <div className="col-sm">
                <Li>
                  <H3>{coin.symbol.toUpperCase()}</H3>
                </Li>
              </div>
              <div className="col-sm">
                <Li>
                  <Price>{coin.current_price}</Price>
                </Li>
              </div>
            </Ul>
          </div>
        </Div>
      )
    })

    return (
      <div>
        <div>
          <Link to="/portfolio" style={{ textDecoration: "none" }}>
            <PLink>Portfolio Balance</PLink>
            <PBLink>{`$${portfolioBalance()}`}</PBLink>
          </Link>

          <Title>Coin Listings</Title>

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