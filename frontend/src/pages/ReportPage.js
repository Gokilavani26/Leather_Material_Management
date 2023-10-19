import React from 'react';
import axios from 'axios';
// import ReportComponent from '../components/ReportComponent';
//import ForecastPage from '../components/ForecastPage';
function ReportPage() {
  const handleGenerateReport = () => {
   
    axios.get('http://localhost:7000/report/generate-csv-report/', { responseType: 'blob' })
      .then((response) => {
        
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'report.csv';
        
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error('Error generating or downloading the report:', error);
      });
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center my-5">
      <button className="btn btn-dark w-25" onClick={handleGenerateReport}>Generate Report</button>
      {/* <h2>Frequently Brought Items</h2> */}
    {/* <h1>Predicted Demand for Upcoming Months</h1> */}
       
     </div> 
     {/* <ForecastPage/> */}
     </>  
  );
}
export default ReportPage;