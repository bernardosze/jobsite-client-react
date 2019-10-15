import React, { Component, Fragment } from 'react';
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
  PaginationLink,
  UncontrolledCollapse
} from 'reactstrap';

export default class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      search: '',
      quoteToDelete: '',
      modal: false,
      currentPage: 0,
      pageSize: 5
    };

    this.dataSize = this.state.quotes.length;
    this.pageCount = Math.ceil(this.dataSize / this.state.pageSize);

    this.handleSearch = this.handleSearch.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.handlePageSize = this.handlePageSize.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/api/quote')
      .then(response => {
        this.setState({
          quotes: response.data
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.quotes !== prevState.quotes) {
      console.log('update quotes!');
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
    const quoteToDelete = e.target.id;
    this.setState({
      modal: !this.state.modal,
      quoteToDelete: quoteToDelete
    });
    console.log(this.state.quoteToDelete);
  };

  handleDeleteQuote = e => {
    axios
      .delete('http://localhost:3333/api/quote', {
        data: { quoteNumber: this.state.quoteToDelete }
      })
      .then(response => {
        this.setState({
          // alertMessage: response.data.message,
          // alertStatus: response.data.status,
          quotes: this.state.quotes.filter(req => req.quote_number !== this.state.quoteToDelete),
          modal: !this.state.modal,
          delete: ''
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  filterQuotes(quotes) {
    const query = new RegExp('.*?' + this.state.search + '.*', 'gi');
    const filteredQuotes = quotes.filter(
      quote =>
        quote.quote_number.toLowerCase().match(query) ||
        quote.customer_name.toLowerCase().match(query) ||
        quote.project_address.toLowerCase().match(query) ||
        quote.project_type.toLowerCase().match(query) ||
        quote.quote_state.toLowerCase().match(query) ||
        quote.estimated_start_date.toLowerCase().match(query) ||
        quote.requested_quote_date.toLowerCase().match(query) ||
        quote.user_name.toLowerCase().match(query)
    );
    console.log('filteredQuotes:' + query);
    console.log(filteredQuotes);
    return filteredQuotes;
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({ search: e.target.elements.search.value.trim() });
  };

  // renderQuoteList(quotes) {
  //   return quotes.map(quote => (
  //     <tr key={quote.id}>
  //       <td>{quote.quote_number}</td>
  //       <td>{quote.customer_name}</td>
  //       <td>{quote.project_address}</td>
  //       <td>{quote.project_type}</td>
  //       <td>{quote.quote_state}</td>
  //       <td>{quote.estimated_start_date.substring(0, 10)}</td>
  //       <td>{quote.requested_quote_date.substring(0, 10)}</td>
  //       <td>{quote.user_name}</td>
  //       <td>
  //         {quote.user_date.substring(0, 10)} {quote.user_date.substring(11, 16)}
  //       </td>
  //       <Link to={'/quote/' + quote.quote_number}>
  //         <Button type='submit' size='sm' color='primary'>
  //           Update
  //         </Button>
  //       </Link>
  //       <Button size='sm' color='ghost-danger' onClick={this.toggleDeleteModal()}>
  //         Delete
  //       </Button>
  //     </tr>
  //   ));
  // }

  render(prevState) {
    return (
      <div className='animated fadeIn'>
        <Route path='quote/new' component={Forms} />
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
                      <th>Quote Number</th>
                      <th>Customer Name</th>
                      <th>Project Address</th>
                      <th>Project Type</th>
                      <th>Quote Stage</th>
                      <th>Estimated Start Date</th>
                      <th>Requested Quote Date</th>
                      <th>Username</th>
                      <th>User date</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {!this.state.search ? (
                      //   ||
                      // this.state.quote.isEqual(
                      //   this.prevState.quote)
                      // prevState.count !== this.state.count
                      <QuoteList
                        quotes={this.state.quotes}
                        toggleDeleteModal={this.toggleDeleteModal}
                        currentPage={this.state.currentPage}
                        pageSize={this.state.pageSize}
                      />
                    ) : (
                      <QuoteList
                        quotes={this.filterQuotes(this.state.quotes)}
                        toggleDeleteModal={this.toggleDeleteModal}
                        currentPage={this.state.currentPage}
                        pageSize={this.state.pageSize}
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
          <ModalBody>Do you really want to delete Quote {this.state.quoteToDelete}?</ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.handleDeleteQuote}>
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

const QuoteList = props => {
  return props.quotes
    .slice(props.currentPage * props.pageSize, (props.currentPage + 1) * props.pageSize)
    .map(quote => (
      <Fragment>
        <tr key={quote.id} id={'quote' + quote.quote_number}>
          <Input
            type='text'
            id='quoteNumber'
            name='quoteNumber'
            value={quote.quote_number}
            hidden
          />
          <td>{quote.quote_number}</td>
          <td>{quote.customer_name}</td>
          <td>{quote.project_address}</td>
          <td>{quote.project_type}</td>
          <td>{quote.quote_state}</td>
          <td>{quote.estimated_start_date.substring(0, 10)}</td>
          <td>{quote.requested_quote_date.substring(0, 10)}</td>
          <td>{quote.user_name}</td>
          <td>
            {quote.user_date.substring(0, 10)} {quote.user_date.substring(11, 16)}
          </td>
          <Link to={'/quote/' + quote.quote_number}>
            <Button type='submit' size='sm' color='primary'>
              Update
            </Button>
          </Link>
          <Button
            type='submit'
            id={quote.quote_number}
            size='sm'
            color='ghost-danger'
            onClick={props.toggleDeleteModal}
          >
            Delete
          </Button>
        </tr>
        <UncontrolledCollapse toggler={'quote' + quote.quote_number}>
          <tr>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas
            debitis similique porro a molestias consequuntur earum odio officiis natus, amet hic,
            iste sed dignissimos esse fuga! Minus, alias.
          </tr>
        </UncontrolledCollapse>
      </Fragment>
    ));

  {
    /*this.dataSet
    .slice(
      currentPage * this.pageSize,
      (currentPage + 1) * this.pageSize
    )
    .map((data, i) => 
      <div className="data-slice" key={i}>
        {data}
      </div>
    )*/
  }
};
