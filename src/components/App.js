import React, { Component } from 'react';
import daiLogo from '../dai-logo.png';
import './App.css';
import Web3 from 'web3';
import DaiTokenMock from '../abis/DaiTokenMock.json';

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
    this.setState({ account: accounts[0] });
    const daiTokenAddress = "0x688bdBc3D214418D064496Fc6e7A1D0cf20cD270"; //If loading from a different computer, place DAI address here. Found in DaiTokenMock.json around like 1184, in the bottom. Replace with actual Dai address if on Ethereum mainnet or an Ethereum testnet. 29:45 in the video he explains more.
    const daiTokenMock = new web3.eth.Contract(DaiTokenMock.abi, daiTokenAddress);
    this.setState({daiTokenMock : daiTokenMock})
    const balance = await daiTokenMock.methods.balanceOf(this.state.account).call();
    console.log(accounts);
    console.log(this.state.daiTokenMock);
    console.log(balance.toString());
    console.log(web3.utils.fromWei(balance.toString(), 'Ether'));
    console.log(web3);

    this.setState({ balance: web3.utils.fromWei(balance.toString(), 'Ether')});

    const transactions = await daiTokenMock.getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest', filter: { from: this.state.account} }); //Note: This will only show transactions that we SENT. It will not show transactions received. In the tutorial he said we can "figure that out", as an exercise. 
    this.setState({ transactions })
    console.log(transactions)
  }

  transfer(recipient, amount){
    this.state.daiTokenMock.methods.transfer(recipient, amount).send({ from: this.state.account });
  }

  constructor(props){
    super(props)
    this.state = {
      account: '',
      daiTokenMock: null,
      balance: 0,
      transactions: []
    }

    this.transfer = this.transfer.bind(this); //What does .bind do?
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
              <div className="content mr-auto ml-auto" style={{width: "400px"}}>
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={daiLogo} width="150px" className="App-logo" alt="Dai Logo" />
                </a>
                <h1>{this.state.balance} DAI</h1>
                <form onSubmit={(event) => {
                  event.preventDefault();
                  const recipient = this.recipient.value;
                  const amount = window.web3.utils.toWei(this.amount.value, 'Ether');

                  console.log(recipient, amount);

                  this.transfer(recipient, amount);
                }}>
                    <div className="form-group">
                      <input 
                        id="recipient"
                        type="text"
                        ref={(input) => { this.recipient = input }}
                        className="form-control"
                        placeholder="Recipient Address"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        id="amount"
                        type="text"
                        ref={(input) => { this.amount = input }}
                        className="form-control"
                        placeholder="Amount to send"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Send</button>
                </form>
                <table className="table mt-4">
                  <thead>
                    <tr>
                      <th scope="col">Recipient</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    { this.state.transactions.map((tx, index) => {
                      return(
                        <tr>
                          <td>{tx.returnValues.to}</td>
                          <td>{tx.returnValues.value.toString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
