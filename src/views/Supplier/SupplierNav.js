import React, { Component } from 'react';


import { CardBody, Nav, NavItem, NavLink } from 'reactstrap';


export default class SupplierNav extends Component {
  state = {
    dropdownOpen: [false, false],
  };


  toggle=i=> {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  render() {
    return (
      <div>
        
         
          
         <CardBody>
            <Nav tabs>
              <NavItem>
                <NavLink to="/supplier" active>Suppliers</NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink to="supplier/addsupplier">Add</NavLink>
              </NavItem>
              
            </Nav>
          </CardBody>
        
      </div>
    )
  }
}
