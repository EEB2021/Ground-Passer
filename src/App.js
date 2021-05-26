/* src/App.js */
import logo from './logo.svg';
import './App.css';
import React from 'react'
import awsconfig from './aws-exports'
import Amplify from 'aws-amplify'
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'

Amplify.configure(awsconfig);




function App() {
  return (
      <div className="App">
        <header className="App-header">
        <AmplifySignOut/>
            <h2>Ground Passer Bitches</h2>
        </header>
      </div>
  );
}


export default withAuthenticator(App)