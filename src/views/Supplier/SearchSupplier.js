import React, { Component } from 'react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios';
import {
   
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Button,
    Alert
  } from 'reactstrap';
  
import {Link} from 'react-router-dom'

export default class SearchSupplier extends Component {
    state={
        alertMessage:null
    }

  onDelete=(deletionIds)=>{
    
        deletionIds.map( r =>
       axios.delete(`http://localhost:3333/api/supplier`,{data:{id:r}})
      .then(res => {
      
        this.setState({alertMessage:res.data.message,
        alertStatus:res.data.status})
      })
         )
  }
    render() {
     
        return (
        <React.Fragment>  

          {
            this.state.alertMessage!==null?(this.state.alertStatus==='200'?
              <Alert color="default">
            {this.state.alertMessage}
          </Alert>:<Alert color="danger">
            {this.state.alertMessage}
          </Alert>):null
          
        
            
            
            }     
            
         <Form>
               
            <FormGroup row className='d-flex justify-content-end mb-1'>
            <Col xs='12' sm='3' md='3' lg='2' xl='1' className='px-1'>
                    <Button block color='danger' className='my-1' onClick={()=>this.onDelete(this.props.deletionIds)}>
                     Delete
                    </Button>
                </Col>
                 <Col xs='12' sm='3' md='3' lg='2' xl='1' className='px-1'>
                    <Button block color='primary' className='my-1'>
                    Search
                    </Button>
                </Col>
                <Col xs='12' sm='3' md='3' lg='2' xl='1' className='px-1'>
                    <Link to="/supplier/addsupplier" block color='success' className='btn btn-md btn-success my-1'>
                    New
                    </Link>
                </Col>
               
            </FormGroup>
                    
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
        </React.Fragment>

        )
    }
}
