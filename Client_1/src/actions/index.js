import axios from 'axios';
// Fixes an issue with axios and express-session where sessions
// would not persist between routes
axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:5000';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_USERS = 'GET_USERS';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';
export const GET_POSTS = 'GET_POSTS';

export const getPosts = () => {
  // const promise = axios.get(`${ROOT_URL}/posts`);
  // return {
  //   type: GET_POSTS,
  //   payload: promise,
  // };
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`)
      .then(() => {
        dispatch({
          type: GET_POSTS,
        });
      
      })
      .catch(() => {
        dispatch(authError('Failed to get the data'));
      });
  };


};



export const authError = (error) => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error,
  };
};

export const register = (userName, password, confirmPassword, history) => {
  return (dispatch) => {
  
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios.post(`${ROOT_URL}/users`, { userName, password })
      .then(() => {
        dispatch({
          type: USER_REGISTERED,
        });
        history.push('/users');
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
  };
};

export const signIn = (userName, password, history) => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/login`, { userName, password })
      .then(() => {
        dispatch({
          type: USER_AUTHENTICATED,
        });
        history.push('/login');
      })
      .catch(() => {
        dispatch(authError('Incorrect email/password combo'));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/logout`)
      .then(() => {
        dispatch({
          type: USER_UNAUTHENTICATED,
        });
      
      })
      .catch(() => {
        dispatch(authError('Failed to log you out'));
      });
  };
};

// Added this to create a signOutUser
export const signOutUser = () => {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/logout`)
      .then(() => {
        dispatch({
          type: USER_UNAUTHENTICATED,
        });
      })
      .catch(() => {
        dispatch(authError('Failed to log you out'));
      });
  };
};

export const getUsers = () => {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/restricted/users`)
      .then((response)=> {
        dispatch({
          type: GET_USERS,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(authError('Failed to fetch users'));
      });
  };
};

// Added this for the Posts page 
export const userPosts = () => {
   
};

