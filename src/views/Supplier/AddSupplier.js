import React, { Component } from 'react';
import {
    
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    
  } from 'reactstrap';



export default class AddSupplier extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggleFade = this.toggleFade.bind(this);
        this.state = {
          collapse: true,
          fadeIn: true,
          timeout: 300
        };
      }
    
      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }
    
      toggleFade() {
        this.setState((prevState) => { return { fadeIn: !prevState }});
      }

  render() {
    return (
        <Card>
        <CardHeader>
          <i className="fa fa-edit"></i>Add Supplier
          <div className="card-header-actions">
            <Button color="link" className="card-header-action btn-setting"><i className="icon-settings"></i></Button>
            <Button color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></Button>
            <Button color="link" className="card-header-action btn-close" onClick={this.toggleFade}><i className="icon-close"></i></Button>
          </div>
        </CardHeader>
        <Collapse isOpen={this.state.collapse} id="collapseExample">
          <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="name" placeholder="Supplier's Name" value="" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                  
                    <Col md="3">
                      <Label htmlFor="text-input">Address</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="address" placeholder="Address.." value=""/>
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                   
                  </FormGroup>
                  
                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="text-input">Phone number</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="phone" placeholder="Phone.." value=""/>
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">User Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="disabled-input" name="username" placeholder="Automatically comes from logged in user" disabled value="" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email-input" name="email" placeholder="Please enter email" value=""/>
                    </Col>
                  </FormGroup>
              
                  <FormGroup row>
                    <Col md="3">
                      <Label>Charge Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="chargeName" placeholder="Charge Name" value=""/>
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label>Charge Position</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="chargePosition" placeholder="Charge Position" value=""/>
                      <FormText color="muted" >This is a help text</FormText>
                    </Col>
                  </FormGroup>
       
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input"> Personal Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email-input" name="personalEmail" placeholder="Please enter email" value=""/>
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="text-input">Personal Phone number</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="phone-input" name="phone" placeholder="Personal Phone.." value=""/>
                      <FormText color="muted" value="">This is a help text</FormText>
                    </Col>
                  </FormGroup>
                
                  <FormGroup row>
                  <Col md="3">
                      <Label htmlFor="text-input">Notes</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" id="notes-input" name="phone" placeholder="Notes.." value=""/>
                      <FormText color="muted" value="">This is a help text</FormText>
                    </Col>
                  </FormGroup>
                </Form>
             
          </CardBody>
          <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
        </Collapse>
      </Card>
    )
  }
}
