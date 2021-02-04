import { Component } from "react";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Api from '../api/Api';

class Login extends Component {
  state = {}
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: '',
      password: '',
      nonce: ''
    }
  }
  onSubmit = (e) => {
    console.log("On submit::", this.state);
    let rq = {
      email: this.state.email,
      password: this.state.password
    };
    let resp = Api.getRq('login',rq);
  }

  onChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    switch(id) {
      case "email": 
        this.setState({email: value});
        break;
      case "password":
        this.setState({password: value});
        break;
      default:
        break;
    }
  }

  render() {
    return(
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col></Col>
            <Col>
            <Form onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <Form.Group as={Row} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                  value={this.state.email}
                  onChange={this.onChange} required />
                <Form.Text className="text-muted">
                  Please enter your email registered with us for login
                </Form.Text>
              </Form.Group>
              <Form.Group as={Row} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" 
                  value={this.state.password}
                  onChange={this.onChange} required />
              </Form.Group>
              <Button type="submit" variant="primary">Submit</Button>
              {this.state.error && <Form.Group as={Row} controlId="error">
                <Form.Text className="text-muted" readOnly>
                  {this.state.error}
                </Form.Text>
              </Form.Group>}
            </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </>
    );
  }
} // Login
export default(Login);