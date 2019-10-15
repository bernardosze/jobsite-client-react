import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href='http://www.wall-upcarpentry.ca/' target='_blank' rel='noopener noreferrer'>
            Wall-up Carpentry
          </a>{' '}
          &copy; 2019.
        </span>
        <span className='ml-auto'>
          Powered by{' '}
          <a href='https://reactjs.org/' target='_blank' rel='noopener noreferrer'>
            Reactjs
          </a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
