import React, { Component } from 'react';
import { connect } from 'react-redux';


export default (ComposedComponent) => {
    class RequireAuthentication extends Component {
        componentWillMount() {
            // Here, we want to check to see if `this.props.authenticated` is true
            // If it isn't, then redirect the user back to the /signin page
            if (this.props.authenticated !== true) {
                   this.props.history.replace('/signIn');
            }
        }

        render() {
            // Here, check to see if `this.props.authenticated` is true
            // If it isn't, then we don't want this component to return anything
            // Else, render the component that was passed to this higher-order component
            if (this.props.authenticated !== true) return null;
            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return { 
            authenticated: state.auth.authenticated
        };
    };

    return connect(mapStateToProps)(RequireAuthentication);
};
