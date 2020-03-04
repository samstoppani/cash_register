import React, { Component } from 'react';
import Cash from './Cash';

import { connect } from 'react-redux';
import { updatePrice } from '../actions/priceActions';
import store from '../store';



class Till extends Component {
    constructor() {
        super()
        this.state = {
            price: 0,  // in pennies 
            cashGiven: 0,
            status: "Waiting"
        }
        this.handleChange = this.handleChange.bind(this);
        this.roundToTwo = this.roundToTwo.bind(this);

        store.subscribe(() => {
            this.setState({
                status: store.getState().status
            })
        })

        store.subscribe(() => {
            this.setState({
                cashGiven: store.getState().cashGiven
            })
        })
    }

    roundToTwo(num) {
        return + (Math.round(num + "e+2")  + "e-2");
    }

    handleChange(e) {
        this.setState({
            price: e.target.value
        }, () => {
            this.props.updatePrice(this.state.price)
        })
    }

    componentDidUpdate() {
        document.getElementById("tillStatus").innerHTML = this.state.status
        document.getElementById("custChange").innerHTML = "£ " + this.roundToTwo(this.state.cashGiven - this.state.price ).toFixed(2)
    }

    render() {
        

        const tillStatusStyle = {
            textAlign: "center",
            display: "grid",
            gridTemplateColumns: "auto auto",
            justifyContent: "center",
            padding: "5px",
            backgroundColor: "black",
            fontFamily: "'Dosis', sans-serif",
            color:  this.state.status == "WAITING" ? "white"  :
                    this.state.status == "OPEN" ? "lightgreen" :
                    this.state.status == "INSUFFICIENT FUNDS" ? "red" :
                    this.state.status == "CLOSED" ? "yellow" : "white"
        }

        return (
            
            <div className="col-md-6 no-gutter">

                <div className="leftside">
                    <h2>Till</h2>
                    <form style={{textAlign: "center", fontSize: "20px"}}>
                        Total Price (£): <input 
                                            type="number" 
                                            min="0" 
                                            step=".01" 
                                            value={this.state.price} 
                                            onChange={this.handleChange}>
                                        </input>
                    </form>
                    
                    <img src={process.env.PUBLIC_URL + "/till.png"} className="imageTill" alt="till"></img>
                    <div className="till" style={tillStatusStyle}>
                        <h5>Till Status: &nbsp;</h5><h5 id="tillStatus"></h5>
                        <h5>Customer Change: &nbsp;</h5><h5 id="custChange"></h5>
                    </div>
                    <Cash />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        price: state
    }
}

export default connect(mapStateToProps, {updatePrice} )(Till)