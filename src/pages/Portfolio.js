import { Ul, Li, H3, Div, Img } from "../styles/Portfolio.styled"
import { useNavigate } from "react-router-dom";
const Portfolio = ({ coinData, user }) => {
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
  // calculate prices of owned assets
  const removeUser = () =>{
    handleDeleteUser(user.id);
  }
  const navigate = useNavigate();
  const handleDeleteUser = async () => {
    alert('User is being deleted this user')
    console.log(user);
    try {
      const URL = `https://hidden-journey-86205.herokuapp.com/user/${user.id}`
      await fetch(URL, {
        method: 'DELETE',
      }).then(res => res.json());
    } catch (error) {
      console.log(error)
    }
    navigate("/");
  }
  const loaded = () => {
    return (
      <div>
        <h1>Portfolio Balance</h1>
        <p>{`$${portfolioBalance()}`}</p>
        <Div>
          <Ul>
            <Li>
              <H3>USD</H3>
            </Li>
            <Li>
              <H3>{`$${wallet.USD}`}</H3>
            </Li>
          </Ul>
        </Div>
        <div>
          {coinData.map(coin => {
            let id = coin.symbol.toUpperCase()
            if (wallet.hasOwnProperty(id)) {
              return (
                <div>
                  <Ul>
                    <Li>
                      <Img src={coin.image} alt="" />
                    </Li>
                    <Li>
                      <H3>{coin.symbol.toUpperCase()}</H3>
                    </Li>
                    <H3>{Math.round(wallet[`${id}`] * 100000)/100000}</H3>
                    <Li>
                    </Li>
                    <Li>
                      <H3>{`$${Math.round((wallet[`${id}`] * coin.current_price) *1000)/1000}`}</H3>
                    </Li>
                  </Ul>
                </div>
              )
            }
          })}
        </div>
        <button id="delete" onClick={handleDeleteUser}>
          DELETE USER
        </button>
      </div>
    )
  }
  const loading = () => {
    return <h1>Loading...</h1>
  }
  return coinData ? loaded() : loading();
}
export default Portfolio;