import { GET_POSTS } from '../actions';

export default (Posts = [], action) => {
    console.log('actions area');
  switch (action.type) {
    case GET_POSTS:
      return action.payload.data;
    default:
      return Posts;
  }
};
