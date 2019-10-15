import React from 'react';

const Customer = React.lazy(() => import('./views/Customer/Customer'));
const Supplier = React.lazy(() => import('./views/Supplier/Supplier'));
const AddSupplier = React.lazy(() => import('./views/Supplier/AddSupplier'));
const Quote = React.lazy(() => import('./views/Quote/Quote'));
const QuoteForm = React.lazy(() => import('./views/Quote/QuoteForm'));
const Repair = React.lazy(() => import('./views/Repair/Repair'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  {
    path: '/customer',
    exact: true,
    name: 'Customer',
    component: Customer
  },

  {
    path: '/supplier',
    exact: true,
    name: 'Supplier',
    component: Supplier
  },
  {
    path: '/supplier/addsupplier',
    exact: true,
    name: 'AddSupplier',
    component: AddSupplier
  },

  {
    path: '/quote',
    exact: true,
    name: 'Quote',
    component: Quote
  },
  {
    path: '/quote/:id',
    exact: true,
    name: 'Quote details',
    component: QuoteForm
  },
  {
    path: '/quote/new',
    exact: true,
    name: 'New Quote',
    component: QuoteForm
  },

  {
    path: '/repair',
    exact: true,
    name: 'Repair',
    component: Repair
  }
];

export default routes;
