import React, { Component } from 'react'
import Cashback from './Cashback';

import { connect } from 'react-redux';
import { updateCash } from '../actions/cashActions';
import store from '../store';


class Customer extends Component {
    constructor() {
        super()
        this.state = {
            cashGiven: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            cashGiven: e.target.value
        }, () => {
            this.props.updateCash(this.state.cashGiven)
        })
    }

    render() {
        
        return (
            <div className="col-md-6 no-gutter">
               <div className="rightside">
                    <h2>Customer</h2>
                    <form style={{textAlign: "center", fontSize: "20px"}}>
                        Cash Given (£): <input 
                                            type="number" 
                                            min="0" 
                                            step=".01" 
                                            value={this.state.cashGiven} 
                                            onChange={this.handleChange}>
                                        </input>
                    </form>
                    <img src={process.env.PUBLIC_URL + "/hand.png"} className="image" alt="hand"></img>
                    <Cashback />

               </div>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        cashGiven: state
    }
}

export default connect(mapStateToProps, {updateCash} )(Customer)