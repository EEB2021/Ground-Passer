/* src/App.jsx */
import './App.css';
import React from 'react'
import awsconfig from './aws-exports'
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import {listScoredbs} from "./graphql/queries";
import{useState} from "react";
import{useEffect} from "react";
/*import {Paper} from '@material-ui/core';*/

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
          <div className="scoreList">
              {scores.map(scores =>{
                  return(
                        <div className="scoreCard">

                            <div>
                                <div className="name"> {scores.name} Zeit: {scores.zeit} Anzahl Treffer: {scores.anztreffer} Anzahl Fehler: {scores.anzfehler} Anzahl Punkte: {scores.punkte}</div>


                            </div>
                        </div>
                  )
              })}
          </div>
      </div>
  );
}


export default withAuthenticator(App)
