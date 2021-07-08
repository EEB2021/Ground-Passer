/* src/App.jsx */
// Imports all needed classes,styles the logo and AWS configurations
import './App.css';
import React from 'react'
import awsconfig from './aws-exports'
import  logo from './logo1.jpeg'
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import {listScoredbs} from "./graphql/queries";
import{useState} from "react";
import{useEffect} from "react";
import {Paper} from '@material-ui/core';
Amplify.configure(awsconfig);

// Initialize the main function App
function App() {
    // setState function is used to update the state
    // useEffect runs after the render is committed to the screen
    const [scores, setScores] = useState([]);
        useEffect(() => {
        fetchScores()
    }, []);
    // Connects with the DynamoDB via GraphQL + and saves data in a variable
    const fetchScores = async () => {
        try {
            const scoreData = await API.graphql(graphqlOperation(listScoredbs));
            const scoreList = scoreData.data.listScoredbs.items;
            console.log('Score list', scoreList);
            setScores(scoreList);
            console.log(logo);
        } catch (error) {
            console.log('error on fetching scores', error);
        }
    }
    // Creates the App Header (Sign Out, Welcome, GroundPasser Logo)
    return (
        <div className="App">
            <header className="App-header">
                <AmplifySignOut/>
                {'Herzlich Willkommen ' +
                'beim GroundPasser'}
                < img src={logo} />
            </header>
            {/*Creates the front-end for the data from the database*/}
            <div className="scoreList">
                <Paper variant="outlined" elevation={2}>
                    <div className="scoreCard">
                        <div>
                            <div className="columnName"> Name</div>
                        </div>
                        <div>
                            <div className="columnName"> Zeit</div>
                        </div>
                    </div>
                </Paper>
                {/*Is mapping the Values from the DynamoDB into the table on the site*/}
                {scores.map(scores => {
                    return <Paper variant="outlined" elevation={2}>
                        <div className="scoreCard">
                            <div>
                                <div className="values"> {scores.name} </div>
                            </div>
                            <div>
                                <div className="values"> {scores.zeit} </div>
                            </div>

                        </div>
                    </Paper>
                })}
            </div>
        </div>
    );

}
// exports the return of the App function if the user is signed in
export default withAuthenticator(App)