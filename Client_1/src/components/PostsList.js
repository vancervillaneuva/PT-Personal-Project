import React from 'react';
import Post from './Post';

export const PostsList = (props) => {
    console.log(`in Post with props: ${props}`);
       return (
           <div>
              {props.post.map((post => {
                  return <Post key={post._id} post={post} />
              }))}
           </div>
       )
};