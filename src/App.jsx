import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error.message);
        alert("failed to fetch data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = employees.slice(indexOfFirstRow, indexOfLastRow);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(employees.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Employee Data Table</h1>
      <div className={styles.paginationWrapper}>
        {employees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
        <div>
          <button
            className={styles.button}
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className={styles.button}> {currentPage} </span>
          <button
            className={styles.button}
            onClick={nextPage}
            disabled={currentPage === Math.ceil(employees.length / rowsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
