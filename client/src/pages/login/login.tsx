import { FormEvent, useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import constant from '../../common/constant';
import { userLogin } from '../../slice/userSlice';

const Login = () => {
  const token = localStorage.getItem(constant.token);
  const [formBody, setFormBody] = useState({ username: '', password: '' });
  const dispatch: AppDispatch = useDispatch();
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await dispatch<any>(userLogin(formBody));
  }
  return !token ? (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
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
              placeholder="Enter Username"
              value={formBody.username}
              onChange={e => setFormBody({ ...formBody, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={formBody.password}
              onChange={e => setFormBody({ ...formBody, password: e.target.value })}
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
  ) : (
    <Navigate to="/" />
  );
};

export default Login;
