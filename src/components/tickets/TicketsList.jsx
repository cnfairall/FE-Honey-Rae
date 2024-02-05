import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { getServiceTickets } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";
import { deleteTicket } from "../../data/serviceTicketsData";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  const deleteATicket = (id) => {
    deleteTicket(id).then(() => {
      getServiceTickets().then(setTickets)
    })
  };

  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, [tickets]);

  return (
    <>
      <Button className="add-btn">
        <Link to="/tickets/create">Add</Link>
      </Button>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Emergency?</th>
            <th>Date Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={`ticket-${t.id}`}>
              <th scope="row">{t.id}</th>
              <td>{t.description}</td>
              <td>{t.emergency ? "yes" : "no"}</td>
              <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
              <td>
                <Link to={`${t.id}`}>Details</Link>
              </td>
              <td>
                <Button onClick={() => deleteATicket(t.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
