import Form from "react-bootstrap/Form";
import { getCustomers } from "../../data/customerData";
import { getEmployees } from "../../data/employeeData";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { createTicket } from "../../data/serviceTicketsData";
import { useNavigate } from "react-router";

const initialState = {
  customerId: -1,
  employeeId: -1,
  description: "",
  emergency: false,
};

export default function CreateTicket() {
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees().then(setEmployees);
    getCustomers().then(setCustomers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      const payload = formInput;
      createTicket(payload).then(() => {
        navigate("/tickets");
      })
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Select
          name="customerId"
          className="mb-3"
          required
          aria-label="customer id select"
          onChange={handleChange}
          value={formInput.customerId}
          >
          <option value="">Select Customer Id</option>
          {customers.map((c) => (
            <option
              key={`customer-${c.id}`}
              value={c.id}
            >
              {c.id} : {c.name}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          name="employeeId"
          className="mb-3"
          aria-label="employee id select"
          value={formInput.employeeId}
          onChange={handleChange}
        >
          <option value="">Select Employee Id</option>
          {employees.map((e) => (
            <option
              key={`employee-${e.id}`}
              value={e.id}
            >
              {e.id} : {e.name}
            </option>
          ))}
        </Form.Select>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={formInput.description}
            onChange={handleChange}
            as="textarea"
            rows={3}
            name="description"
            required
          />
        </Form.Group>
        <Form.Check
          className="mb-3" // prettier-ignore
          name="emergency"
          type="switch"
          id="emergency-bool"
          label="Check if emergency"
          checked={formInput.emergency}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              emergency: e.target.checked,
            }));
          }}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  };
