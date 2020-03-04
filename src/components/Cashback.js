import React, { Component } from 'react';
  
import { connect } from 'react-redux';
import { updateStatus } from '../actions/statusActions';
import store from '../store';

class Cashback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price: 0,
            cashGiven: 0,

            till: [
                ["£50", 0],
                ["£20", 0],
                ["£10", 0],
                ["£5", 0],
                ["£2", 0],
                ["£1", 0],
                ["50p", 0],
                ["20p", 0],
                ["10p", 0],
                ["5p", 0],
                ["2p", 0],
                ["1p", 0]
            ],

            custCash: [
                ["£50", 0],
                ["£20", 0],
                ["£10", 0],
                ["£5", 0],
                ["£2", 0],
                ["£1", 0],
                ["50p", 0],
                ["20p", 0],
                ["10p", 0],
                ["5p", 0],
                ["2p", 0],
                ["1p", 0]
            ],

            status: "Waiting"
        }

        this.roundToTwo = this.roundToTwo.bind(this);
        this.checkCashRegister = this.checkCashRegister.bind(this);

        store.subscribe(() => {
            this.setState({
                price: store.getState().price
            })
        })

        store.subscribe(() => {
            this.setState({
                cashGiven: store.getState().cashGiven
            })
        })

        store.subscribe(() => {
            this.setState({
                till: store.getState().till
            })
        })

    }
      
    roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
      
    checkCashRegister(price, cash, cid) {

        var currency = [
            { name: "£50", val: 50.0 },
            { name: "£20", val: 20.0 },
            { name: "£10", val: 10.0 },
            { name: "£5", val: 5.0 },
            { name: "£2", val: 2.0 },
            { name: "£1", val: 1.0 },
            { name: "50p", val: 0.50 },
            { name: "20p", val: 0.20 },
            { name: "10p", val: 0.10 },
            { name: "5p", val: 0.05 },
            { name: "2p", val: 0.02 },
            { name: "1p", val: 0.01 },
          ];
          
        var changeArr = [
            { name: "£50", val: 0 },    // 0
            { name: "£20", val: 0 },
            { name: "£10", val: 0 },
            { name: "£5", val: 0 },
            { name: "£2", val: 0 },
            { name: "£1", val: 0 },
            { name: "50p", val: 0 },
            { name: "20p", val: 0 },
            { name: "10p", val: 0 },
            { name: "5p", val: 0 },
            { name: "2p", val: 0 },
            { name: "1p", val: 0 },    // 11
        ];
      
        var change = this.roundToTwo(cash - price);              // changeerence in changeArr
        var currentCustChange = 0;                     // current money given to customer
        var changeForCustomer = this.roundToTwo(change - currentCustChange);  // money left to give to customer
      
        // for loop that moves through each currency type in 'currency' array
        for (let i in Object.values(currency)) {
      
          var currencyName = Object.values(currency[i])[0]  // finds currency name
          var currencyValue = parseFloat(Object.values(currency[i])[1]) // finds currency value
          var cidValue = parseFloat(cid[i][1])             // finds cash-in-drawer value
          var totalValuePerCurrency = 0             // total value of each currency
      
          // while loop to incrementally add money to the 'changeArr' object
          while (changeForCustomer >= currencyValue && cidValue > 0) {
      
                  cidValue = this.roundToTwo(cidValue - currencyValue)                   // removes one currency from drawer
                  currentCustChange = this.roundToTwo(currentCustChange + currencyValue) // adds one currency to sum
      
                  changeForCustomer = this.roundToTwo(change - currentCustChange)                // finds new remaining change to give
                  totalValuePerCurrency = this.roundToTwo(totalValuePerCurrency + currencyValue) // adds one currency currency total
          }
      
           // add 'totalValuePerCurrency' to 'changeArr' array
           changeArr[i].val = totalValuePerCurrency
        }

         // finds total change in drawer (before customer)
         var cidTotal = this.roundToTwo(cid.map(cidValues => cidValues[1])
                                      .reduce((a,b) => a + b, 0))

        // console.log("Change For Customer = " + change)
        // console.log("Current Customer Change = " + currentCustChange)
        // console.log("Starting Change in Drawer = " + cidTotal)

        // if change given to customer is less than expected...unsufficient funds
        if (currentCustChange < change) {
            return {status: "INSUFFICIENT FUNDS", change: changeArr, changeTotal: change}
        }
        // if the total cash in the drawer (at the start) is same as the cash given... closed
        else if (currentCustChange === change && currentCustChange === cidTotal) {
            return {status: "CLOSED", change: cid, changeTotal: change}
        }
        // if the total cash in the drawer (at the start) is greater than the cash given... open
        else if (currentCustChange === change && currentCustChange < cidTotal) {
            return {status: "OPEN", change: changeArr, changeTotal: change}
        } 
        else {
            return {status: "WAITING", change: changeArr, changeTotal: change}
        }
    }

    componentDidUpdate (previousProps, previousState) {

        let denomObj = this.checkCashRegister(store.getState().price, store.getState().cashGiven, this.state.till)

        console.log(denomObj)

        let cashback = [
            ["£50", this.roundToTwo(denomObj.change[0].val / 50)],
            ["£20", this.roundToTwo(denomObj.change[1].val / 20)],
            ["£10", this.roundToTwo(denomObj.change[2].val / 10)],
            ["£5", this.roundToTwo(denomObj.change[3].val / 5)],
            ["£2", this.roundToTwo(denomObj.change[4].val / 2)],
            ["£1", this.roundToTwo(denomObj.change[5].val / 1)],
            ["50p", this.roundToTwo(denomObj.change[6].val / 0.50)],
            ["20p", this.roundToTwo(denomObj.change[7].val / 0.20)],
            ["10p", this.roundToTwo(denomObj.change[8].val / 0.10)],
            ["5p", this.roundToTwo(denomObj.change[9].val / 0.05)],
            ["2p", this.roundToTwo(denomObj.change[10].val / 0.02)],
            ["1p", this.roundToTwo(denomObj.change[11].val / 0.01)]
        ]

        
        if (previousState.price !== this.state.price ||
            previousState.cashGiven !== this.state.cashGiven ||
            previousState.till !== this.state.till) {
                this.setState({
                    custCash: cashback,
                    status: denomObj.status
                })
                this.props.updateStatus(denomObj.status)
            }


        for (let i in denomObj.change) {
            document.getElementById(cashback[i][0]).innerHTML = "x"+ cashback[i][1]
        }

        var totalCashback = parseFloat(this.roundToTwo(
            cashback[0][1] * 50 +
            cashback[1][1] * 20 +
            cashback[2][1] * 10 +
            cashback[3][1] * 5 +
            cashback[4][1] * 2 +
            cashback[5][1] * 1 +
            cashback[6][1] * 0.50 +
            cashback[7][1] * 0.20 +
            cashback[8][1] * 0.10 +
            cashback[9][1] * 0.05 +
            cashback[10][1] * 0.02 +
            cashback[11][1] * 0.01 
        ))

        document.getElementById("custCash").innerHTML = "£" + totalCashback.toFixed(2);  
    }
    
    render() {

        return (
            
            <div>

                <div className="cash">
           
                    <div className="denomContainer">               
                        <div className="denomMultiplierContainer">
                            <h4>£50</h4>
                            <h6 id="£50"   style={{color: this.state.custCash[0][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>£20</h4>
                            <h6 id="£20"  style={{color: this.state.custCash[1][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>£10</h4>
                            <h6 id="£10"  style={{color: this.state.custCash[2][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>£5</h4>
                            <h6 id="£5" style={{color: this.state.custCash[3][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>£2</h4>
                            <h6 id="£2" style={{color: this.state.custCash[4][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>£1</h4>
                            <h6 id="£1" style={{color: this.state.custCash[5][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>50p</h4>
                            <h6 id="50p" style={{color: this.state.custCash[6][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>20p</h4>
                            <h6 id="20p" style={{color: this.state.custCash[7][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>10p</h4>
                            <h6 id="10p" style={{color: this.state.custCash[8][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>5p</h4>
                            <h6 id="5p" style={{color: this.state.custCash[9][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>2p</h4>
                            <h6 id="2p" style={{color: this.state.custCash[10][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>

                    <div className="denomContainer">
                        <div className="denomMultiplierContainer">
                            <h4>1p</h4>
                            <h6 id="1p" style={{color: this.state.custCash[11][1] > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                    </div>
                    
                </div>
                <div className="bottomDisplayCustomer">
                    <h4>Total Cash to Customer: &nbsp;</h4><h4 id="custCash"></h4>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state
    }
}

export default connect(mapStateToProps, {updateStatus} )(Cashback)
