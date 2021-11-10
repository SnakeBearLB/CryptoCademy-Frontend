import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "../pages/Dashboard"
import Portfolio from "../pages/Portfolio"
import Login from "../pages/Login"
import NewUser from "../pages/NewUser";
import Trade from "../pages/Trade";
import Navbar from "./Navbar";


const Main = () => {
  //this holds the current user info
  const [user, setUser] = useState(null);

  const [coinData, setCoinData] = useState(null);

  const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"


  // make call
  const getCoinData = async() => {
    const response = await fetch(URL)
    const data = await response.json()
    setCoinData(data)
  };

  //refreshes the user and coin info
  const refreshUser = async()=>{
    //updates the userInfo
    const URL = "https://hidden-journey-86205.herokuapp.com/user/login"
    const data = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(user),
      })
    const response = await data.json()
    setUser(response)
    getCoinData()
  }
  
  useEffect(() => getCoinData(), [])

  return (
    <main>
      <Routes>
        <Route exact path="/" element={<Login setUser={setUser}/>}/>
        <Route path="createaccount" element={<NewUser setUser={setUser}/>}/>
        <Route path="dashboard" element={<Dashboard coinData={coinData} user={user}/>}/>
        <Route path="portfolio" element={<Portfolio user={user} coinData={coinData}/>}/>
        <Route path="trade" element={<Trade refreshUser = {refreshUser}user={user} coinData={coinData}/>}/>
      </Routes>
    </main>
  )
}

export default Main;