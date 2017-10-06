import React, {Component} from 'react';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
          post: {},
        };
    }
   
   componentDidMount(){
       this.setState({post: this.props.post});
   }

   render() {
       return (
        <div className="Person-Wrappe">
        <div>{this.state.post.hash}</div>
        <div>{this.state.post.subject}</div>
        <div>{this.state.post.notes}</div>
        </div>
       )
   }

};