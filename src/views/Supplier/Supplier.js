import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Card,
 
} from 'reactstrap';

import Suppliers from "./Suppliers";
import AddSupplier from "./AddSupplier";

export default class Supplier extends Component {

  render() {
    return (
      <div>
        
      <Card>
      
        <Switch>
          <Route exact path="/supplier" component={Suppliers}/>
          <Route exact path="/supplier/addsupplier" component={AddSupplier}/>
        </Switch>
      </Card>
      
      </div>
    )
  }
}
