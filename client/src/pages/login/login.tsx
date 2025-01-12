import constant from '@/common/constant.js';
import { userLogin } from '@/slice/userslice.js';
import { AppDispatch } from '@/types.js';
import { FormEvent, useCallback, useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const token = localStorage.getItem(constant.token);
  const [formBody, setFormBody] = useState({ username: '', password: '' });
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormBody(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      await dispatch(userLogin(formBody));
    },
    [dispatch, formBody],
  );

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
    >
      <Col
        xs={12}
        md={6}
        lg={4}
      >
        <Form
          onSubmit={handleSubmit}
          className="d-grid gap-3"
        >
          <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formBody.username}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formBody.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
      </Col>
    </Container>
  );
}
