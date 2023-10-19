import React, { useEffect, useState } from "react";

import * as XLSX from "xlsx";
import axios from "axios";
function EmployeeSalaryGeneration() {
  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

  const [employees, setEmployee] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7000/employee").then((res) => {
      setEmployee(res.data.employees);
    });
  }, [employees]);

  const generateExcel = () => {
    const salaryCalculation = (leaveTaken, salary) =>
      salary - leaveTaken * (salary / daysInCurrentMonth);

    const data = employees.map((employee) => ({
      Name: employee.employeeName,
      LeaveTaken: employee.leaveTaken,
      Salary: salaryCalculation(employee.leaveTaken, employee.employeeSalary),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: ["Name", "LeaveTaken", "Salary"],
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Details");
    XLSX.writeFile(workbook, "Employee Salary Details.xlsx");
  };
  return (
    <div className="container text-center my-3">
      <button className="btn btn-primary" onClick={generateExcel}>
        Generate Salary
      </button>
    </div>
  );
}

export default EmployeeSalaryGeneration;
