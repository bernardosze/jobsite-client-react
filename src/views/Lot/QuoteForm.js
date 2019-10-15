import React, { Component } from 'react';
import {} from 'react-router';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormFeedback,
  FormGroup,
  //Input,
  Label,
  Row
} from 'reactstrap';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.saveNewQuote = this.saveNewQuote.bind(this);
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
        //console.log(response);
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  saveNewQuote() {
    axios
      .post('http://localhost:3333/api/quote', this.props.values)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('error', error);
      });
    this.props.history.push('/quote');
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  render() {
    const errors = this.props.errors;
    const touched = this.props.touched;
    return (
      <Form className='animated fadeIn'>
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
                        <Field
                          className={
                            touched.quoteNumber && errors.quoteNumber
                              ? 'form-control is-invalid'
                              : 'form-control'
                          }
                          type='text'
                          id='quoteNumber'
                          name='quoteNumber'
                          placeholder='Enter the quote number'
                        />
                        <FormFeedback className='help-block'>{errors.quoteNumber}</FormFeedback>
                      </Col>
                      <Col xs='8'>
                        <Label htmlFor='customerName'>Customer Name</Label>
                        <Field
                          className={
                            touched.customerName && errors.customerName
                              ? 'form-control is-invalid'
                              : 'form-control'
                          }
                          component='select'
                          id='customerName'
                          name='customerName'
                          placeholder='Please select a customer'
                        >
                          <option disabled value='' hidden>
                            Select a customer
                          </option>
                          {this.state.customers.map(customer => (
                            <option key={customer.id}>{customer.name}</option>
                          ))}
                          {console.log(this.state.customers)}
                        </Field>
                        <FormFeedback className='help-block'>{errors.customerName}</FormFeedback>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs='12'>
                    <FormGroup>
                      <Label htmlFor='projectAddress'>Project Address</Label>
                      <Field
                        className={
                          touched.projectAddress && errors.projectAddress
                            ? 'form-control is-invalid'
                            : 'form-control'
                        }
                        type='text'
                        id='projectAddress'
                        name='projectAddress'
                        placeholder='Enter project address'
                        value={this.props.values.projectAddress}
                        onChange={this.props.handleChange}
                      />
                      <FormFeedback className='help-block'>{errors.projectAddress}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs='12' md='6' lg='3'>
                    <FormGroup>
                      <Label htmlFor='projectType'>Project Type</Label>
                      <Field
                        className={
                          touched.projectType && errors.projectType
                            ? 'form-control is-invalid'
                            : 'form-control'
                        }
                        component='select'
                        name='projectType'
                        id='projectType'
                        value={this.props.values.projectType}
                        onChange={this.props.handleChange}
                      >
                        <option disabled value='' hidden>
                          Select the type of the project
                        </option>
                        <option value='New Construction'>New Construction</option>
                        <option value='Addition'>Addition</option>
                        <option value='Renovation'>Renovation</option>
                        <option value='Verify'>Verify</option>
                      </Field>
                      <FormFeedback className='help-block'>{errors.projectType}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col xs='12' md='6' lg='3'>
                    <FormGroup>
                      <Label htmlFor='quoteState'>State</Label>
                      <Field
                        className={
                          touched.quoteState && errors.quoteState
                            ? 'form-control is-invalid'
                            : 'form-control'
                        }
                        component='select'
                        name='quoteState'
                        id='quoteState'
                        value={this.props.values.quoteState}
                        onChange={this.props.handleChange}
                      >
                        <option disabled value='' hidden>
                          Select the state of the quote
                        </option>
                        <option value='Demo-Excavation-Foundation-Framing'>
                          Demo-Excavation-Foundation-Framing
                        </option>
                        <option value='Demo-Excavation-Framing'>Demo-Excavation-Framing</option>
                        <option value='Demo-Foundation-Framing'>Demo-Foundation-Framing</option>
                        <option value='Demo-Framing'>Demo-Framing</option>
                        <option value='Excavation-Foundation-Framing'>
                          Excavation-Foundation-Framing
                        </option>
                        <option value='Foundation-Framing'>Foundation-Framing</option>
                        <option value='Framing Only'>Framing Only</option>
                        <option value='Verify'>Verify</option>
                      </Field>
                      <FormFeedback className='help-block'>{errors.quoteState}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col xs='12' md='6' lg='3'>
                    <FormGroup>
                      <Label htmlFor='estimatedStartDate'>Estimated Start Date</Label>
                      <Field
                        className={
                          touched.estimatedStartDate && errors.estimatedStartDate
                            ? 'form-control is-invalid'
                            : 'form-control'
                        }
                        type='date'
                        id='estimatedStartDate'
                        name='estimatedStartDate'
                        placeholder='date'
                        value={this.props.values.estimatedStartDate}
                        onChange={this.props.handleChange}
                      />
                      <FormFeedback className='help-block'>
                        {errors.estimatedStartDate}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col xs='12' md='6' lg='3'>
                    <FormGroup>
                      <Label htmlFor='requestedQuoteDate'>Requested Quote Date</Label>
                      <Field
                        className={
                          touched.requestedQuoteDate && errors.requestedQuoteDate
                            ? 'form-control is-invalid'
                            : 'form-control'
                        }
                        type='date'
                        id='requestedQuoteDate'
                        name='requestedQuoteDate'
                        placeholder='date'
                        value={this.props.values.requestedQuoteDate}
                        onChange={this.props.handleChange}
                      />
                      <FormFeedback className='help-block'>
                        {errors.requestedQuoteDate}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button type='button' size='sm' color='primary' onClick={this.saveNewQuote}>
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

const QuoteForm = withFormik({
  mapPropsToValues({
    quoteNumber,
    customerName,
    projectAddress,
    projectType,
    quoteState,
    estimatedStartDate,
    requestedQuoteDate
  }) {
    return {
      quoteNumber: quoteNumber || '',
      customerName: customerName || '',
      projectAddress: projectAddress || '',
      projectType: projectType || '',
      quoteState: quoteState || '',
      estimatedStartDate: estimatedStartDate || '',
      requestedQuoteDate: requestedQuoteDate || ''
    };
  },
  validationSchema: yup.object().shape({
    quoteNumber: yup.string().required('Please provide a Quote Number'),
    customerName: yup.string().required('Please select a  Customer'),
    projectAddress: yup.string().required('Please provide the Address of the project'),
    projectType: yup.string().required('Please select the Type of the project'),
    quoteState: yup.string().required('Please select the State for the project'),
    estimatedStartDate: yup.date().required('Please select a Estimated Start Date'),
    requestedQuoteDate: yup.date().required('Please select the Project Requested Date')
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(Forms);

export default QuoteForm;
