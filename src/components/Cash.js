import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateTill } from '../actions/tillActions';
import store from '../store';

class Cash extends Component {
    constructor() {
        super()
        this.state = {
            fiftyPounds: 3,
            twentyPounds: 5,
            tenPounds: 3,
            fivePounds: 11,
            twoPounds: 1,
            onePounds: 0,
            fiftyPence: 1,
            twentyPence: 7,
            tenPence: 9,
            fivePence: 6,
            twoPence: 20,
            onePence: 50,
            
            tillTotal: 0
        }

        this.roundToTwo = this.roundToTwo.bind(this);
        this.downButton = this.downButton.bind(this);
        this.upButton = this.upButton.bind(this);
        this.totalTillCash = this.totalTillCash.bind(this);
    }

    roundToTwo(num) {
        return + (Math.round(num + "e+2")  + "e-2");
    }

    downButton(e) {
        if (this.state[e] === 0) {
            return
        } 
        this.setState(prevState => {
            return {
                [e]: prevState[e] - 1
            }
        }, () => {
            document.getElementById(e).innerHTML = "x"+ this.state[e];
            this.totalTillCash() 
        })
    }

    upButton(e) { 
        this.setState(prevState => {
            return {
                [e]: prevState[e] + 1
            }
        }, () => {
            document.getElementById(e).innerHTML = "x"+ this.state[e];
            this.totalTillCash() 
        })  
    }

    totalTillCash = () => {
        
        let till = [
            ["£50", this.state.fiftyPounds * 50],
            ["£20", this.state.twentyPounds * 20],
            ["£10", this.state.tenPounds * 10],
            ["£5", this.state.fivePounds * 5],
            ["£2", this.state.twoPounds * 2],
            ["£1", this.state.onePounds * 1],
            ["50p", this.state.fiftyPence * 0.50],
            ["20p", this.state.twentyPence * 0.20],
            ["10p", this.state.tenPence * 0.10],
            ["5p", this.state.fivePence * 0.05],
            ["2p", this.state.twoPence * 0.02],
            ["1p", this.state.onePence * 0.01]
        ]

        var totalCash = parseFloat(this.roundToTwo(
            this.state.fiftyPounds * 50 +
            this.state.twentyPounds * 20 +
            this.state.tenPounds * 10 +
            this.state.fivePounds * 5 +
            this.state.twoPounds * 2 +
            this.state.onePounds * 1 +
            this.state.fiftyPence * 0.50 +
            this.state.twentyPence * 0.20 +
            this.state.tenPence * 0.10 +
            this.state.fivePence * 0.05 +
            this.state.twoPence * 0.02 +
            this.state.onePence * 0.01 
        ))

         this.setState({
            tillTotal: totalCash
         }, () => {
            document.getElementById("tillCash").innerHTML = "£" + this.state.tillTotal.toFixed(2);
            this.props.updateTill(till)
         })
    }

    componentDidMount () {
        let denomArr = [
            "fiftyPounds", "twentyPounds", "tenPounds",
            "fivePounds", "twoPounds", "onePounds", 
            "fiftyPence", "twentyPence", "tenPence", 
            "fivePence", "twoPence", "onePence",
        ]
        denomArr.map( denom => document.getElementById(denom).innerHTML = "x"+ this.state[denom])
        this.totalTillCash()

    }

    render() {

        return (
            <div>
            
                <div className="cash">

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "fiftyPounds")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>£50</h4>
                            
                            <h6 id="fiftyPounds" style={{color: this.state.fiftyPounds > 0 ? "darkgreen" : "black"}} >x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "fiftyPounds")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "twentyPounds")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>£20</h4>
                            <h6 id="twentyPounds" style={{color: this.state.twentyPounds > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "twentyPounds")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "tenPounds")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>£10</h4>
                            <h6 id="tenPounds" style={{color: this.state.tenPounds > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "tenPounds")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "fivePounds")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>£5</h4>
                            <h6 id="fivePounds" style={{color: this.state.fivePounds > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "fivePounds")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "twoPounds")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>£2</h4>
                            <h6 id="twoPounds" style={{color: this.state.twoPounds > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "twoPounds")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "onePounds")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>£1</h4>
                            <h6 id="onePounds" style={{color: this.state.onePounds > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "onePounds")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "fiftyPence")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>50p</h4>
                            <h6 id="fiftyPence" style={{color: this.state.fiftyPence > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "fiftyPence")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "twentyPence")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>20p</h4>
                            <h6 id="twentyPence" style={{color: this.state.twentyPence > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "twentyPence")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "tenPence")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>10p</h4>
                            <h6 id="tenPence" style={{color: this.state.tenPence > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "tenPence")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "fivePence")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>5p</h4>
                            <h6 id="fivePence" style={{color: this.state.fivePence > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "fivePence")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "twoPence")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>2p</h4>
                            <h6 id="twoPence" style={{color: this.state.twoPence > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "twoPence")}><i className="fa fa-plus"></i></button>
                    </div>

                    <div className="denomContainer">
                        <button className="upDownButton" onClick={this.downButton.bind(this, "onePence")}><i className="fa fa-minus"></i></button>
                        <div className="denomMultiplierContainer">
                            <h4>1p</h4>
                            <h6 id="onePence" style={{color: this.state.onePence > 0 ? "darkgreen" : "black"}}>x0</h6>
                        </div>
                        <button className="upDownButton" onClick={this.upButton.bind(this, "onePence")}><i className="fa fa-plus"></i></button>
                    </div>
                    
                </div>
                {this.totalTillCash}
                <div className="bottomDisplayTill">
                    <h4>Total Cash in Till: &nbsp;</h4><h4 id="tillCash"></h4>
                </div>

            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        till: state
    }
}

export default connect(mapStateToProps, {updateTill} )(Cash)