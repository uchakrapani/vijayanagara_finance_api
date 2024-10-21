import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { Form, Button, Alert, Container, Row, Col, Spinner } from 'react-bootstrap'; // Import Spinner
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const loginData = {
      loginid: loginId,
      password: password,
    };

    try {
      const response = await fetch('https://vijayanagara-finance-api.vercel.app/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        login(loginData);
        navigate('/dashboard');
      } else {
        const result = await response.json();
        setErrorMessage(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container className="mt-5 pt-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Login</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formLoginId">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter login ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> {/* Spinner */}
                  {' Loading...'}
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
