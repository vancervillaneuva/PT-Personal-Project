import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import { PostsList } from './PostsList';

// const POSTS = [
//   {id: 1, hash: '#food', subject: 'In and Out', notes: 'Animal Style Fries'},
//   {id: 2, hash: '#food', subject: 'Soju Coffee', notes: 'Coffee and no sugar'},
//   {id: 3, hash: '#food', subject: 'Gen BBQ', notes: 'Beef Briskett'},
//   {id: 4, hash: '#food', subject: 'Sizzler', notes: 'Chicken Wings'},
//   {id: 5, hash: '#food', subject: 'Johns Incredible Pizza', notes: 'Just Pizza'},
//   {id: 6, hash: '#food', subject: 'La Vics', notes: 'Orange Sauce'},
//   {id: 7, hash: '#food', subject: 'Home Meal', notes: 'Spaghetti'}
// ];

const POSTS = [ 
  {"_id": "59d3311c5700c32ab07f00e9", "hash": "#fun", "subject": "Going to Canada one day", "notes": "This is the day I'm going which is October 29, 2017", "__v": 0, "createdAt": "2017-10-03T06:41:32.379Z" },
  {"_id": "59d331565700c32ab07f00ea", "hash": "#fun", "subject": "Going to John's Pizza baby","notes": "Josh's birthday is coming up on October 3rd, 2017", "__v": 0, "createdAt": "2017-10-03T06:42:30.622Z" },
  {"_id": "59d331765700c32ab07f00eb", "hash": "#fun", "subject": "Last day for LambaSchool Bootcamp!", "notes": "This will be on October 7, 2017!", "__v": 0, "createdAt": "2017-10-03T06:43:02.182Z" },
  {"_id": "59d332eb0a68a40fc0ed1bbb", "hash": "#fun", "subject": "Getting somewhere tonight!", "notes": "Got a password generated and the data on the routes.  Need pictures!", "email": "filp530@hotmail.com", "__v": 0, "createdAt": "2017-10-03T06:49:15.183Z" },
  {"_id": "59d333350a68a40fc0ed1bbc", "hash": "#fun", "subject": "Next steps will be to finish the routes, picture, authentication, and query", "notes": "If I can get to that portion tomorrow that would great!", "email": "filp530@hotmail.com", "__v": 0, "createdAt": "2017-10-03T06:50:29.912Z" }
];

class Posts extends Component {
    constructor() {
        super();
        this.state = {
          Posts: [],
        };
      }

      componentDidMount() {
        this.setState({Posts: POSTS});
        //this.props.getPosts();
       
        
      }

    render() {
        return (
            <div>
           
             <form onSubmit={this.handleSubmit}>
              <input type="text" />
              <button action="submit">Search1</button>
             </form>

             <label>Hash    Subject   Date(Notes)</label>
             
             <PostsList post={this.state.Posts} />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Posts: state.Posts,
    };
  };


//export default connect(null, { userPosts })(Posts);

export default connect(mapStateToProps, { getPosts })(Posts);