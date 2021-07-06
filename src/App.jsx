/* src/App.jsx */
import './App.css';
import React from 'react'
import awsconfig from './aws-exports'
import  logo from './logo1.jpeg'
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import {listScoredbs} from "./graphql/queries";
import{useState} from "react";
import{useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';
Amplify.configure(awsconfig);

function App() {
    const [scores, setScores] = useState([]);
        useEffect(() => {
        fetchScores()
    }, []);

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

    return (
        <div className="App">
            <header className="App-header">
                <AmplifySignOut/>
                {'Herzlich Wilkommen ' +
                'beim Ground Passer'}
                < img src={logo} />

            </header>
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

export default withAuthenticator(App)