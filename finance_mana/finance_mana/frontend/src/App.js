import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './components/finance/Home';

import AddAccount from './components/finance/AddAccount';
import Account_Details from './components/finance/Account_Details';
import EditAccount_Details from './components/finance/EditAccount_Details';

import AddTransaction from './components/finance/AddTransaction';
import Transaction_Details from './components/finance/Transaction_Details';
import EditTransaction from './components/finance/EditTransaction';

import Footer from './components/Footer';
import NavBar from './components/NavBar';


class App extends Component{
  render(){
    return(
      <Router>
        <NavBar/> {/* Create navbar */}
        <div style = {{backgroundColor:'#e0f6fc',  margin:"0"}}>
         
          <Route path="/" exact component={Home}></Route>

          <Route path="/AddAccount" exact component={AddAccount}></Route>
          <Route path="/Account_Details" exact component={Account_Details}></Route>
          <Route path="/EditAccount_Details/:id" exact component={EditAccount_Details}></Route>

          <Route path="/AddTransaction" exact component={AddTransaction}></Route>
          <Route path="/Transaction_Details" exact component={Transaction_Details}></Route>
          <Route path="/EditTransaction/:id" exact component={EditTransaction}></Route>

          <div style={{paddingTop:'0px',width:'100%'}}>
          {/* Create footer */}
            <Footer />
          </div>
        </div>
      </Router>
    )
  }
}
export default App;
