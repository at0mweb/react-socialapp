import React from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db, auth } from '../config/firebase'
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import Post from '../components/Post'

function Main() {
  const [postsList, setPostsList] = useState([]);
  const postsRef = collection(db, 'posts');

  const [user] = useAuthState(auth);

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    );
  }

  useEffect(() => {
    getPosts();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='w-full max-w-[1240px] mx-auto px-4 mt-10'>
        <h1 className='pb-5 text-xl font-bold text-gray-800'>All posts</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {!user ? (
              <div className='max-w-lg bg-gray-100 p-5 border border-indigo-200 font-medium text-gray-800'>
                <p className='text-sm'>Please login to see posts</p>
              </div>
            ) : (postsList.map((post) => {
              return(
                <Post key={post.id} postid={post.id} title={post.title} desc={post.desc} user={post.username} />
              );
            }))}
          </div>
    </div>
  )
}

export default Main