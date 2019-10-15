import React, { Component } from 'react'
import SearchSupplier from './SearchSupplier';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';

import {
    Row,
    Col,
    Card,
    CardBody,
    CardColumns,
    CardHeader,
   Button
    
  } from 'reactstrap';

  
export default class Suppliers extends Component {

    state={
        suppliers:[],
        
        showSupplierInfo: false,

        deleteRows:[]

      }

    columns = [{
                  dataField: 'id',
                  text: 'Supplier ID',
                  sort:true
                }, {
                  dataField: 'name',
                  text: 'Supplier Name',
                  sort:'true'
                }, {
                  dataField: 'personalName',
                  text: 'Personal Name',
                  sort:true
                },{
                  dataField: 'phone',
                  text: 'Phone',
                  sort:true
                },{
                  dataField: 'email',
                  text: 'Email',
                  sort:true
                },];

       componentDidMount() {
         fetch('http://localhost:3333/api/supplier')
         .then(res => res.json())
         .then((data) => {
           this.setState({
             suppliers:data
           })
         })
       }

       
       //options for pagination
       options = {
       
      pageStartIndex: 1,
      sizePerPage: 5,
      hideSizePerPage: false,
      hidePageListOnlyOnePage: false
      };

      //Data for each row when we expand it using the + symbol
       expandRow = {
        
        renderer: row => (
      <div className='rowExpand'>
          <div className='row'>
            <label className='col-md-1'>Address</label>:<span className='col-md-3'>{row.address},{row.city},{row.state},{row.country}</span>
              

          </div>

          <div className='row'>
            <label  className='col-md-1'>Personal Name </label>:<span className='col-md-2'>{row.personalName}</span>
            <label  className='col-md-1'>Personal Email :</label>:<span className='col-md-2'>{row.personalEmail}</span>
            <label  className='col-md-1'>Personal Phone :</label>:<span className='col-md-2'>{row.personalPhone}</span>
          </div>

          <div className='row'>

            <label  className='col-md-1'>Personal Position</label>:<span className='col-md-2'>{row.personalPosition}</span>
            <label  className='col-md-1'>Notes</label>:<span className='col-md-2'>{row.personalPhone}</span>
            <label  className='col-md-1'>Payment Methods</label>:<span className='col-md-2'>{row.paymentMethod}</span>
          
          </div>

          <div className="row">
          <Button block color='warning' className='my-1 col-md-2'>
                    Update
          </Button>
          </div>
     
      </div>
        ),
        showExpandColumn: true
      };

      //Event for when we select a row
      selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) => {
          // console.log(row.id);
          // console.log(isSelect);
         if(isSelect===true){
          this.setState(prevState => ({
            deleteRows: [...prevState.deleteRows, row.id]

        }));
        
         }
          else{
            this.setState(prevState => ({
              deleteRows: this.state.deleteRows.filter(r=>r!==row.id)
  
          }));
          }
      
        },
      };
      

      //Sort options
       defaultSorted = [{
        dataField: 'name',
        order: 'desc'
      }];
    

      render() {
     
            return (
              <div className='animated fadeIn'>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>Suppliers</CardHeader>
                      <CardBody>
                        
                    <SearchSupplier deletionIds={this.state.deleteRows}/>
                    <BootstrapTable  keyField='id' data={ this.state.suppliers } columns={ this.columns } 
                     striped
                      hover
                      condensed
                      defaultSorted={this.defaultSorted}
                      expandRow={this.expandRow}
                      filter={ filterFactory() }
                      pagination={paginationFactory(this.options)}
                      selectRow = {this.selectRow}
        />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
               
                <CardColumns className='row' />
              </div>
            );
    }
}
