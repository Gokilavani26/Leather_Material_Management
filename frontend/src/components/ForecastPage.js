import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ForecastPage() {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/forecasts/product-forecasts') // Use the correct URL
      .then((response) => {
        setForecasts(response.data.forecasts);
      })
      .catch((error) => {
        console.error('Error fetching forecasts:', error);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="container">
        <h1>Forecasted Demand</h1>
        <table className="table table-striped-columns text-center mt-4">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Month 1</th>
              <th>Month 2</th>
              <th>Month 3</th>
            </tr>
          </thead>
          <tbody>
          {/* <tr>
              <th>Belt</th>
              <th>Month 1</th>
              <th>Month 2</th>
              <th>Month 3</th>
            </tr>
            <tr>
              <th>Hat</th>
              <th>Month 1</th>
              <th>Month 2</th>
              <th>Month 3</th>
            </tr>
            <tr>
              <th>Shoe</th>
              <th>Month 1</th>
              <th>Month 2</th>
              <th>Month 3</th>
            </tr> */}



            {forecasts.map((forecast, index) => (
              <tr key={index}>
                <td>{forecast['Product Name']}</td>
                <td>{forecast['Month 1']}</td>
                <td>{forecast['Month 2']}</td>
                <td>{forecast['Month 3']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ForecastPage;
