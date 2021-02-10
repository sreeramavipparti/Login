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
      error: null,
      email: '',
      password: '',
      nonce: '',
      loginSubmitted: false,
      visits: null,
      success: null,
      unsuccess: null
    }
  }
  onLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loginSubmitted: true
    });
    console.log("On submit::", this.state);
    let rq = {
      email: this.state.email,
      password: this.state.password
    };
    Api.getRq('login',rq)
    .then(resp => {
      console.log(resp);
      if(resp) {
        if(!resp.status) {
          this.setState({
            error: resp.data
          })
        }
        else {
          this.setState({
            error: null,
            success: resp.data['success'],
            unsuccess: resp.data['unsuccess'],
            visits: resp.data['visits']
          })
        }
      } 
    });
  } // onLoginSubmit

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      error: null,
      loginSubmitted: false,
      email: '',
      password: '',
      nonce: null,
      visits: null,
      success: null,
      unsuccess: null
    })
  } // onSubmit

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
    const {
      error,
      success,
      unsuccess,
      visits,
      loginSubmitted
    } = this.state;
    return(
      <>
        <Container>
          <Row className="justify-content-md-center">
            <Col></Col>
            {!error && !loginSubmitted && <Col>
            <Form onSubmit={this.onLoginSubmit}>
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <Form.Group as={Row} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                  value={this.state.email}
                  onChange={this.onChange} required />
                <Form.Text className="text-muted">
                  Please enter your email registered
                </Form.Text>
              </Form.Group>
              <Form.Group as={Row} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" 
                  value={this.state.password}
                  onChange={this.onChange} required />
              </Form.Group>
              <Button type="submit" variant="primary">Submit</Button>
            </Form>
            </Col>}
            {error != null && error.length > 0 && <Col><Form onSubmit={this.onSubmit}>
              <Form.Group as={Row} controlId="error">
                <Form.Text className="text-muted" readOnly>
                  {error}
                </Form.Text>
              </Form.Group>
              <Button type="submit" variant="primary">OK</Button>
              </Form></Col>}
            {visits != null && visits > 0 && <Col><Form onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 fw-normal">Singed In</h1>
              <Form.Group as={Row} controlId="visits">
                <Form.Label>Visits</Form.Label>
                <Form.Control defaultValue={visits} readOnly />
                <Form.Text className="text-muted">
                  Number of visits so far
                </Form.Text>
              </Form.Group>
              <Form.Group as={Row} controlId="success">
                <Form.Label>Last successful login</Form.Label>
                <Form.Control defaultValue={success} readOnly />
              </Form.Group>
              <Button type="submit" variant="primary">OK</Button>
            </Form></Col>}
            <Col></Col>
          </Row>
        </Container>
      </>
    );
  }
} // Login
export default(Login);