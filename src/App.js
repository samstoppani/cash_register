import React from 'react';
import Header from './components/Header';
import Till from './components/Till';
import Customer from './components/Customer';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';


function App() {
  return (
    <Provider store={store}>
      <div >
        <Header />
        <div className="row no-gutters">
          
          <Till />
          <Customer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
