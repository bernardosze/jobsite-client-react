import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from 'reactstrap';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      customers: [],
      quotes: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/api/customer')
      .then(response => {
        this.setState({
          customers: response.data.resultSet
        });
        console.log(response);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  render({ values, handleChange, handleSubmit }) {
    return (
      <Form className='animated fadeIn' onSubmit={handleSubmit}>
        <Row>
          <Col xs='12'>
            <Card>
              <CardHeader>
                <strong>Create New Quote</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs='12'>
                    <FormGroup row>
                      <Col xs='4'>
                        <Label htmlFor='quoteNumber'>Quote Number</Label>
                        <Input
                          type='text'
                          id='quoteNumber'
                          name='quoteNumber'
                          placeholder='Enter the quote number'
                          value={values.quoteNumber}
                          onChange={handleChange}
                          required
                        />
                      </Col>
                      <Col xs='8'>
                        <Label htmlFor='customerName'>Customer Name</Label>
                        <Input
                          type='select'
                          id='customerName'
                          name='customerName'
                          value={values.customerName}
                          onChange={handleChange}
                          required
                        >
                          <option disabled selected value hidden>
                            Please select a customer
                          </option>
                          {this.state.customers.map(customer => (
                            <option key={customer.id}>{customer.name}</option>
                          ))}
                        </Input>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs='12'>
                    <FormGroup>
                      <Label htmlFor='projectAddress'>Project Address</Label>
                      <Input
                        type='text'
                        id='projectAddress'
                        name='projectAddress'
                        placeholder='Enter project address'
                        value={values.projectAddress}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs='12' md='6' lg='3'>
                    <FormGroup>
                      <Label htmlFor='projectType'>Project Type</Label>
                      <Input
                        type='select'
                        name='projectType'
                        id='projectType'
                        value={values.projectType}
                        onChange={handleChange}
                        required
                      >
                        <option disabled selected value hidden>
                          Please select the type of the project
                        </option>
                        <option value='New Construction'>New Construction</option>
                        <option value='Addition'>Addition</option>
                        <option value='Renovation'>Renovation</option>
                        <option value='Verify'>Verify</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs='12' md='6' lg='3'>
                    <FormGroup>
                      <Label htmlFor='quoteState'>State</Label>
                      <Input
                        type='select'
                        name='quoteState'
                        id='quoteState'
                        value={values.quoteState}
                        onChange={handleChange}
                        required
                      >
                        <option disabled selected value='' hidden>
                          Please select the state of the quote
                        </option>
                        <option>Demo-Excavation-Foundation-Framing</option>
                        <option>Demo-Excavation-Framing</option>
                        <option>Demo-Foundation-Framing</option>
                        <option>Demo-Framing</option>
                        <option>Excavation-Foundation-Framing</option>
                        <option>Foundation-Framing</option>
                        <option>Framing Only</option>
                        <option>Verify</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs='12' md='6' lg='3'>
                    <FormGroup>
                      <Label htmlFor='estimatedStartDate'>Estimated Start Date</Label>
                      <Input
                        type='date'
                        id='estimatedStartDate'
                        name='estimatedStartDate'
                        placeholder='date'
                        value={values.estimatedStartDate}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col xs='12' md='6' lg='3'>
                    <FormGroup>
                      <Label htmlFor='requestedQuoteDate'>Requested Quote Date</Label>
                      <Input
                        type='date'
                        id='requestedQuoteDate'
                        name='requestedQuoteDate'
                        placeholder='date'
                        value={values.requestedQuoteDate}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button type='submit' size='sm' color='primary'>
                  <i className='fa fa-dot-circle-o' /> Save
                </Button>
                <Button type='reset' size='sm' color='danger'>
                  <i className='fa fa-ban' /> Reset
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Forms;
