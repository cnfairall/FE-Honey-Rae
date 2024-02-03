import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getCustomerById } from "../../data/customerData";

export default function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState();

useEffect(() => {
  getCustomerById(id).then(setCustomer);
}, [id])
  if (!customer) {
    return null;
  }

  return (
    <Table>
      <tbody>
      <tr>
          <th scope="row">Id</th>
          <td>{JSON.stringify(customer.id)}</td>
        </tr>
        <tr>
          <th scope="row">Name</th>
          <td>{JSON.stringify(customer.name)}</td>
        </tr>
        <tr>
          <th scope="row">Address</th>
          <td>{JSON.stringify(customer.address)}</td>
        </tr>
        <tr>
          <th scope="row">Service Tickets</th>
          <td>
          <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Employee Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customer.serviceTickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.EmployeeId ? t.EmployeeId : "not assigned"}</td>
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
