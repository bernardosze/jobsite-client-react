import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Forms from './Forms';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardColumns,
  CardHeader,
  Table,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

export default class Repair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repairs: [],
      search: '',
      repairToDelete: '',
      modal: false,
      currentPage: 0,
      pageSize: 5
    };

    this.dataSize = this.state.repairs.length;
    this.pageCount = Math.ceil(this.dataSize / this.state.pageSize);

    this.handleSearch = this.handleSearch.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/api/repair')
      .then(response => {
        this.setState({
          repairs: response.data
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { repairs } = this.state;
    if (repairs !== prevState.repairs) {
      console.log('update repairs!');
    }
  }

  handlePageSize(e) {
    this.setState({ pageSize: parseInt(e.target.value, 10) });
  }

  handleChangePage(e, index) {
    e.preventDefault();
    this.setState({ currentPage: index });
  }

  toggleDeleteModal = e => {
    e.preventDefault();
    const repairToDelete = e.target.id;
    this.setState({
      modal: !this.state.modal,
      repairToDelete: repairToDelete
    });
    console.log(this.state.repairToDelete);
  };

  handleDeleteRepair = e => {
    axios
      .delete('http://localhost:3333/api/repair', {
        data: { id: this.state.repairToDelete }
      })
      .then(response => {
        this.setState({
          // alertMessage: response.data.message,
          // alertStatus: response.data.status,
          modal: !this.state.modal,
          delete: ''
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  filterRepairs(repairs) {
    const query = new RegExp('.*?' + this.state.search + '.*', 'gi');
    const filteredRepairs = repairs.filter(
      repair =>
        repair.quote_number.toLowerCase().match(query) ||
        repair.customer_name.toLowerCase().match(query) ||
        repair.project_address.toLowerCase().match(query) ||
        repair.project_type.toLowerCase().match(query) ||
        repair.repair_state.toLowerCase().match(query) ||
        repair.estimated_start_date.toLowerCase().match(query) ||
        repair.requested_repair_date.toLowerCase().match(query) ||
        repair.user_name.toLowerCase().match(query)
    );
    console.log('filteredrepairs:' + query);
    console.log(filteredRepairs);
    return filteredRepairs;
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({ search: e.target.elements.search.value.trim() });
  };

  render() {
    return (
      <div className='animated fadeIn'>
        <Route path='repair/new' component={Forms} />
        <Row>
          <Col>
            <Card>
              <CardHeader>Quotes</CardHeader>
              <CardBody>
                <div className='mx-2'>
                  <Form onSubmit={this.handleSearch} className='form-horizontal'>
                    <FormGroup row>
                      <Col xs='12' md='8'>
                        <InputGroup className='my-1'>
                          <InputGroupAddon addonType='prepend'>
                            <Button type='submit' color='primary'>
                              <i className='fa fa-search' /> Search
                            </Button>
                          </InputGroupAddon>
                          <Input type='text' id='search' name='search' placeholder='search...' />
                        </InputGroup>
                      </Col>
                      <Col xs='12' sm='3' md='3' lg='2' xl='1' className='px-1'>
                        <Link to='/quote/new'>
                          <Button block color='success' className='my-1'>
                            New
                          </Button>
                        </Link>
                      </Col>
                    </FormGroup>
                  </Form>
                </div>

                <Table hover responsive size='sm'>
                  <thead>
                    <tr>
                      <th>Reapir ID</th>
                      <th>Quote Number</th>
                      <th>Lot ID</th>
                      <th>User Name</th>
                      <th>User Date</th>
                      <th>Description</th>
                      <th>Activaded</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {!this.state.search ? (
                      //   ||
                      // this.state.quote.isEqual(
                      //   this.prevState.quote)
                      // prevState.count !== this.state.count
                      <RepairList
                        repairs={this.state.repairs}
                        toggleDeleteModal={this.toggleDeleteModal}
                      />
                    ) : (
                      <RepairList
                        repairs={this.filterRepairs(this.state.repairs)}
                        toggleDeleteModal={this.toggleDeleteModal}
                      />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <nav>
          <Pagination>
            <PaginationItem>
              <Input
                type='select'
                name='pageSize'
                id='pageSize'
                onChange={this.handlePageSize}
                value={this.state.pageSize}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </Input>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                previous
                tag='button'
                onClick={e => this.handleChangePage(e, this.state.currentPage - 1)}
              >
                Prev
              </PaginationLink>
            </PaginationItem>

            {[...Array(this.pagesCount)].map((page, i) => (
              <PaginationItem active={i === this.state.currentPage} key={i}>
                <PaginationLink onClick={e => this.handleClick(e, i)}>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationLink
                next
                tag='button'
                onClick={e => this.handleChangePage(e, this.state.currentPage + 1)}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </nav>
        <CardColumns className='row' />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleDeleteModal}
          className={'modal-danger ' + this.props.className}
        >
          <ModalHeader toggle={this.toggleDeleteModal}>Delete Quote</ModalHeader>
          <ModalBody>Do you really want to delete Quote {this.state.repairToDelete}?</ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.handleDeleteRepair}>
              Delete Quote
            </Button>
            <Button color='secondary' onClick={this.toggleDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const RepairList = props => {
  return props.repairs.map(repair => (
    <tr key={repair.id}>
      <Input type='text' id='quoteNumber' name='quoteNumber' value={repair.quote_number} hidden />
      <td>{repair.id}</td>
      <td>{repair.quote_number}</td>
      <td>{repair.lot_id}</td>
      <td>{repair.user_name}</td>
      <td>{/*repair.user_date.substring(0, 10)} {repair.user_date.substring(11, 16)*/}</td>
      <td>{repair.description}</td>
      <td>{repair.activaded}</td>
      <Link to={'/repair/' + repair.quote_number}>
        <Button type='submit' size='sm' color='primary'>
          Update
        </Button>
      </Link>
      <Button
        type='submit'
        id={repair.quote_number}
        size='sm'
        color='ghost-danger'
        onClick={props.toggleDeleteModal}
      >
        Delete
      </Button>
    </tr>
  ));
};
