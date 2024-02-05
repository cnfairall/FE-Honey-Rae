import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { getTicketById } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";

export default function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    getTicketById(id).then(setTicket);
  }, [id]);
  if (!ticket) {
    return null;
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
            <td>{ticket.employee?.name || "Unassigned"}</td>
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
