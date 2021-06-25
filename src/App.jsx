/* src/App.jsx */
import './App.css';
import React from 'react'
import awsconfig from './aws-exports'
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import {AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import {listScoredbs} from "./graphql/queries";
import{useState} from "react";
import{useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import {Paper} from '@material-ui/core';
import {Table} from 'table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

Amplify.configure(awsconfig);

function App() {
    const [scores, setScores] = useState([]);

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes= useStyles();

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

    const columns =[
        {field: 'id', headername: 'ID'},
        {field: 'name', headername: 'Name'},
        {field: 'zeit', headername: 'Zeit'},
    ]



    return (
        <div className="App">
            <header className="App-header">
                <AmplifySignOut/>
                <h2>Ground Passer </h2>
            </header>
            <div className="scoreList">
                {scores.map(scores =>{
                    return <Paper variant ="outlined" elevation={2}>
                        <div className="scoreCard">
                            <div>
                                <div className="name"> {scores.name} </div>
                            </div>
                            <div>
                                <div className="name"> {scores.zeit} </div>
                            </div>

                        </div>
                    </Paper>
                })}
            </div>
            {/*<<div className="scoreList">
              <TableContainer component={Paper}>
                  <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                          <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Zeit</TableCell>
                              <TableCell align="right">Anzahl Treffer</TableCell>
                              <TableCell align="right">Anzahl Fehler</TableCell>
                              <TableCell align="right">Punkte</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {rows.map((row)=>(

                              <TableRow key={row.name}>
                                  <TableCell component="th" scope="row">
                                      {row.name}
                                  </TableCell>
                                  <TableCell align="right">{row.zeit}</TableCell>
                                  <TableCell align="right">{row.anztreffer}</TableCell>
                                  <TableCell align="right">{row.anzfehler}</TableCell>
                                  <TableCell align="right">{row.anzpunkte}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          </div>*/}
        </div>
    );
}


export default withAuthenticator(App)