import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {data} from "./constants";
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';

function Main() {
   const [startDate, setStartDate] = useState(new Date(2019, 3, 1));
   const [totalVacations, setTotalVacations] = useState(0);

   useEffect(() => {
      setTotalVacations(findTotalVacations());
      findUsedVacations();
   });

   const findTotalVacations = () => {
      const monthDifference = findMonthDifference(startDate, new Date());
      const extraVacationPerYear = Math.trunc(monthDifference/12);

      return extraVacationPerYear > 0 ? monthDifference * 2 + extraVacationPerYear : monthDifference * 2;
   };

   const findUsedVacations = () => {
      let total = 0;

      data.forEach(year => {
         for (const key in year.vacations) {
            total = total + year.vacations[key]
         }
      });

      return total;
   };

   const findUsedVacationsInYear = (value) => {
     let total = 0;

      data.forEach(year => {
         if (year.year == value) {
            for (const key in year.vacations) {
               total = total + year.vacations[key]
            }
         }
      });

      return total;
   };


   function findMonthDifference(dateFrom, dateTo) {
      return dateTo.getMonth() - dateFrom.getMonth() +
         (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
   }

   return (
      <div className="App container">
         <div className="row">
            <div className="col">
               <p className="h1">Muhammad Ahsan</p>
               <p className="lead">
                  {moment(startDate).format('MMMM Do YYYY')}
               </p>
            </div>
            <div className="col">
               <Table striped bordered hover>
                  <thead>
                  <tr>
                     <th scope="col">Total</th>
                     <th scope="col">Used</th>
                     <th scope="col">Left</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                     <td>{findTotalVacations()}</td>
                     <td>{findUsedVacations()}</td>
                     <td>{findTotalVacations() - findUsedVacations()}</td>
                  </tr>
                  </tbody>
               </Table>
            </div>
         </div>

         <div className="row">
            <div className="col-sm-12 col-lg-6">
               <Accordion>
                  {data.map((yearData, index) =>
                     <Accordion.Item eventKey={index}>
                     <Accordion.Header>{yearData.year} Vacation Details ({findUsedVacationsInYear(yearData.year)})</Accordion.Header>
                     <Accordion.Body>
                        <Table striped bordered hover>
                           <thead>
                           <tr>
                              <th>Month</th>
                              <th>Vacations</th>
                           </tr>
                           </thead>
                           <tbody>
                           <tr>
                              <td>January</td>
                              <td>{yearData.vacations.January}</td>
                           </tr>
                           <tr>
                              <td>February</td>
                              <td>{yearData.vacations.February}</td>
                           </tr>
                           <tr>
                              <td>March</td>
                              <td>{yearData.vacations.March}</td>
                           </tr>
                           <tr>
                              <td>April</td>
                              <td>{yearData.vacations.April}</td>
                           </tr>
                           <tr>
                              <td>May</td>
                              <td>{yearData.vacations.May}</td>
                           </tr>
                           <tr>
                              <td>June</td>
                              <td>{yearData.vacations.June}</td>
                           </tr>
                           <tr>
                              <td>July</td>
                              <td>{yearData.vacations.July}</td>
                           </tr>
                           <tr>
                              <td>August</td>
                              <td>{yearData.vacations.August}</td>
                           </tr>
                           <tr>
                              <td>September</td>
                              <td>{yearData.vacations.September}</td>
                           </tr>
                           <tr>
                              <td>October</td>
                              <td>{yearData.vacations.October}</td>
                           </tr>
                           <tr>
                              <td>November</td>
                              <td>{yearData.vacations.November}</td>
                           </tr>
                           <tr>
                              <td>December</td>
                              <td>{yearData.vacations.December}</td>
                           </tr>
                           <tr>
                              <th>Total</th>
                              <th>{findUsedVacationsInYear(yearData.year)}</th>
                           </tr>
                           </tbody>
                        </Table>
                     </Accordion.Body>
                     </Accordion.Item>
                  )}
               </Accordion>
            </div>
         </div>
      </div>
   )
}

export default Main;