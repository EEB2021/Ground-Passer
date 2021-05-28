/* src/App.jsx */
import './App.css';
import React from 'react'
import awsconfig from './aws-exports'
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import {listScoredbs} from "./graphql/queries";
import{useState} from "react";
import{useEffect} from "react";

Amplify.configure(awsconfig);

function App() {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchScores()
    }, []);

    const fetchScores = async() => {
        try{
            const scoreData = await API.graphql(graphqlOperation(listScoredbs));
            const scoreList =scoreData.data.listScoredbs.items;
            console.log('Score list', scoreList);
            setScores(scoreList);
        }catch(error){
            console.log('error on fetching scores', error);
        }
    }

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
