import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';

class App extends Component {
  async componentWillMount(){
    //Connecting this to the Ethereum blockchain
    await this.loadWeb3();

    //Connecting this to the Blockchain data
    await this.loadBlockchainData();
    
  }

  //From Web3 / Metamask documentation 
  async loadWeb3(){
    if (window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else{
      window.alert("Non-Ethereum browser detected. You should consider trying to connect Metamask to the wallet.");
    }
  }

  async loadBlockchainData(){
    //Getting a connection to Web3
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const daiTokenAddress = "0x688bdBc3D214418D064496Fc6e7A1D0cf20cD270"; //If loading from a different computer, place DAI address here. Found in DaiTokenMock.json around like 1184, in the bottom.
    console.log(accounts);

    console.log(web3);
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
