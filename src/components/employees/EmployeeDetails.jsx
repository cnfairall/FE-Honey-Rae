import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getEmployeeById } from "../../data/employeeData";

export default function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState();

useEffect(() => {
  getEmployeeById(id).then(setEmployee);
}, [id])
  if (!employee) {
    return null;
  }

  return (
    <Table>
      <tbody>
      <tr>
          <th scope="row">Id</th>
          <td>{employee.id}</td>
        </tr>
        <tr>
          <th scope="row">Name</th>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <th scope="row">Address</th>
          <td>{employee.specialty}</td>
        </tr>
        <tr>
          <th scope="row">Service Tickets</th>
          <td>
          <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Customer Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employee.serviceTickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.customerId}</td>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
