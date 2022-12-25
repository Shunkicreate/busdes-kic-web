import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ApproachInfos, TimeTable } from '../Bus.type';

const App = () => {
  const baseURL = "https://bustimer.azurewebsites.net/";
  const [timeTable, setTimeTable] = useState<TimeTable>()

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching...", baseURL + "timetable?fr=京都駅前&to=立命館大学")
      const result = await axios.get(
        baseURL + "timetable?fr=京都駅前&to=立命館大学",
      )
      setTimeTable(result.data);
      console.log('setTimeTable', timeTable)
    }
    fetchData()
  }, []);



  return (
    <div className="App">
      <body style={{ background: "red" }}>
        <div>
          busdes
        </div>
        <div>
          南草津→立命館大学
        </div>
        <div>
          <div>
            6時
            <div>
              <span>06:57</span><span>パナソニック 東口経由</span>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
