// // backend/routes/forecastRoutes.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const fastcsv = require('fast-csv');
const { PythonShell } = require('python-shell');
const path = require('path');

// Endpoint to serve product forecasts
router.get('/product-forecasts', (req, res) => {
  const pythonScriptPath = path.join(__dirname, 'python_script.py');

  PythonShell.run(pythonScriptPath, null, (err, results) => {
    if (err) {
      console.error('Error running Python script:', err);
      return res.status(500).json({ error: 'Error running forecasting script' });
    }

    // Read the generated forecasts CSV
    const forecastsCsvPath = path.join(__dirname, 'forecasts.csv');
    const forecasts = [];

    fs.createReadStream(forecastsCsvPath)
      .pipe(fastcsv.parse({ headers: true }))
      .on('data', (row) => {
        forecasts.push(row);
      })
      .on('end', () => {
        res.json({ forecasts });
      });
  });
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const fastcsv = require('fast-csv');
// const { PythonShell } = require('python-shell');
// const path = require('path');

// // Endpoint to serve product forecasts
// router.get('/product-forecasts', (req, res) => {
  
//   const pythonScriptPath = path.join(__dirname, '../python_script.py');
  
//   PythonShell.run(pythonScriptPath, null, (err, results) => {
//     if (err) {
//       console.error('Error running Python script:', err);
//       return res.status(500).json({ error: 'Error running forecasting script' });
//     }
    
//     // Read the generated forecasts CSV
//     const forecastsCsvPath = path.join(__dirname, '../forecasts.csv');
//     const forecasts = {};
    
//     fs.createReadStream(forecastsCsvPath)
//       .pipe(fastcsv.parse({ headers: true }))
//       .on('data', (row) => {
//         forecasts[row['Product Name']] = {
//           'Month 1': parseFloat(row['Month 1']),
//           'Month 2': parseFloat(row['Month 2']),
//           'Month 3': parseFloat(row['Month 3']),
//           // Add more months as needed
//         };
//       })
//       .on('end', () => {
//         res.json({ forecasts });
//       });
//   });
// });

// module.exports = router;
