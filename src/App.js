/* src/App.js */
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
            <h2>Ground Passer </h2>
        </header>
      </div>
  )
}


export default withAuthenticator(App)