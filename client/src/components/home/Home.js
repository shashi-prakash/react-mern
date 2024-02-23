import { ProSidebarProvider } from "react-pro-sidebar";
import Header from "../header/Header";

import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function Home() {
  const logOutUser = () => {
    localStorage.setItem("userTrue", false);
    window.location.replace("/");
  };

  const options1 = {
    title: {
      text: "Basic Column Chart in React",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Apple", y: 10 },
          { label: "Orange", y: 15 },
          { label: "Banana", y: 2 },
          { label: "Mango", y: 3 },
          { label: "Grape", y: 12 },
        ],
      },
    ],
  };

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Website Traffic Sources",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 18, label: "Direct" },
          { y: 49, label: "Organic Search" },
          { y: 9, label: "Paid Search" },
          { y: 5, label: "Referral" },
          { y: 19, label: "Social" },
        ],
      },
    ],
  };
  return (
    <>
      <Header />
      <div className="homepage">
        <div className="chart-item">
          <div className="left-item">
            <div>
              <CanvasJSChart options={options1} />
            </div>
          </div>
          <div className="right-item">
            <CanvasJSChart options={options} />
          </div>
        </div>
        <h1 style={{ alignItems: "center" }}>Users Data List</h1>
        <div style={{ overflowX: "auto" }}>
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Profile Pic</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>50</td>
              <td>50</td>
              <td>50</td>
              <td>50</td>
              <td>
                <small>Edit</small>&nbsp;<small>Delete</small>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
