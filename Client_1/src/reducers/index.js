import { combineReducers } from 'redux';
import AuthReducer from './auth';
import { reducer as FormReducer } from 'redux-form';
import PostsReducer from './PostsReducer';
import UsersReducer from './users';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  users: UsersReducer,
  Posts: PostsReducer,
});

export default rootReducer;

