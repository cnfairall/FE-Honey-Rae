import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { Form } from "react-bootstrap";
import { getTicketById, updateTicket } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";
import { getEmployees } from "../../data/employeeData";

export default function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getTicketById(id).then(setTicket);
    getEmployees().then(setEmployees);
  }, [id, ticket]);
  if (!ticket) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const payload = {
      ...ticket,
      [name]: value,
    };
    updateTicket(id, payload)
  }

  return (
    <>
      <Button className="add-btn">
        <Link to="/tickets/create">Add</Link>
      </Button>
      <Table>
        <tbody>
          <tr>
            <th scope="row">Customer</th>
            <td>{ticket.customer.name}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{ticket.description}</td>
          </tr>
          <tr>
            <th scope="row">Emergency</th>
            <td>{ticket.emergency ? "yes" : "no"}</td>
          </tr>
          <tr>
            <th scope="row">Employee</th>
            <td>
              {ticket.employee?.name || (
                <Form>
                  <Form.Select
                    name="employeeId"
                    className="mb-3"
                    aria-label="employee id select"
                    onChange={handleChange}
                  >
                    <option value="">Select Employee Id</option>
                    {employees.map((e) => (
                      <option key={`employee-${e.id}`} value={e.id}>
                        {e.id} : {e.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Completed?</th>
            <td>{ticket.dateCompleted?.split("T")[0] || "Incomplete"}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
