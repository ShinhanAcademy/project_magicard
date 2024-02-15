import React from 'react';
import { Route } from 'react-router';
import BasicInformation from './BasicInformation';
import './static/css/DashBoardMain.css';
import LineChart from './cost_trend_chart/LineChart';
import BarChart from './department_chart/BarChart';
import DoughnutChart from './purpose_chart/DoughnutChart';

function DashBoardMain() {
    return (
        <>
        <div>
            <div>
                {/* <BasicInformation/><br/><br/> */}
            </div>
            <div className='whole-board'>
                <div>
                    <LineChart/>
                </div><br/><br/>
                <div className='department-based'> 
                    <BarChart/>
                </div>
                <br/><br/>
                <div> 
                    <DoughnutChart/>
                </div>    
                <br/><br/>       
            </div>
        </div>
        </> 
    );
}
export default DashBoardMain;