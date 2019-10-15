import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardColumns,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

class Customer extends Component {
  render() {
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col>
            <Card>
              <CardHeader>Customer Search</CardHeader>
              <CardBody>
                <div className='mx-2'>
                  <FormGroup row className='d-flex justify-content-end mb-1'>
                    <Col xs='12' sm='3' md='3' lg='2' xl='1' className='px-1'>
                      <Button block color='primary' className='my-1'>
                        Search
                      </Button>
                    </Col>
                    <Col xs='12' sm='3' md='3' lg='2' xl='1' className='px-1'>
                      <Button block color='success' className='my-1'>
                        New
                      </Button>
                    </Col>
                  </FormGroup>
                </div>

                <Form>
                  <FormGroup row>
                    <Col xs='12' md='6'>
                      <Label for='customerName'>Customer:</Label>
                      <Input
                        type='text'
                        name='customerName'
                        id='customerName'
                        placeholder='Customer Name'
                      />
                    </Col>
                    <Col xs='12' md='6'>
                      <Label for='personalName'>Personal Name:</Label>
                      <Input
                        type='text'
                        name='personalName'
                        id='personalName'
                        placeholder='Personal Name'
                      />
                    </Col>
                  </FormGroup>
                </Form>

                <Table hover bordered striped responsive size='sm'>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Date registered</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Vishnu Serghei</td>
                      <td>2012/01/01</td>
                      <td>Member</td>
                      <td>
                        <Badge color='success'>Active</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Zbyněk Phoibos</td>
                      <td>2012/02/01</td>
                      <td>Staff</td>
                      <td>
                        <Badge color='danger'>Banned</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Einar Randall</td>
                      <td>2012/02/01</td>
                      <td>Admin</td>
                      <td>
                        <Badge color='secondary'>Inactive</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Félix Troels</td>
                      <td>2012/03/01</td>
                      <td>Member</td>
                      <td>
                        <Badge color='warning'>Pending</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Aulus Agmundr</td>
                      <td>2012/01/21</td>
                      <td>Staff</td>
                      <td>
                        <Badge color='success'>Active</Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink previous tag='button'>
                        Prev
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag='button'>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag='button'>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag='button'>3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink tag='button'>4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next tag='button'>
                        Next
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <CardColumns className='row' />
      </div>
    );
  }
}

export default Customer;
