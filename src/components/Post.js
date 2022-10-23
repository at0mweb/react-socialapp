import React, {useEffect, useState} from 'react'
import { HeartIcon, ChatBubbleOvalLeftEllipsisIcon, ShareIcon } from '@heroicons/react/24/outline'
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid'
import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


function Task(props) {
  const [user] = useAuthState(auth);
  const likesRef = collection(db, 'likes');

  const [likes, setLikes] = useState([])

  const likesDoc = query(likesRef, where("postid", "==", props?.postid));

  const likePost = async () => {
    try{
      const newDoc = await addDoc(likesRef, {
        userid: user?.uid,
        postid: props?.postid
      })
      if(user){
        setLikes((prev) => prev ? [...prev, {userid: user?.uid, likeId: newDoc.id }] : [{userid: user?.uid, likeId: newDoc.id }]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const unlikePost = async () => {
    try{
      const likeToDelQuery = query(likesRef, 
        where("postid", "==", props?.postid),
        where("userid", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDelQuery)
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, 'likes', likeToDeleteData.docs[0].id)


      await deleteDoc(likeToDelete)
      if(user){
        setLikes((prev) => prev && prev.filter((like) => like.id === likeId));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({userid: doc.data().userid, postid: props.postid})));
  }

  const isUserLiked = likes?.find((like) => like?.userid === user?.uid)

  useEffect(() => {
    getLikes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='max-w-lg bg-gray-100 p-5 border border-indigo-200 font-medium text-gray-800'>
        <h1 className='text-2xl'>{props?.title}</h1>
        <p className='text-sm'>{props?.desc}</p>
        <p className='text-xs'>@{props?.user}</p>
        <hr className='mt-5 mb-5' />

        <div className='flex justify-start items-center space-x-2'>
          {!isUserLiked ? (
          <HeartIcon className='h-6 w-6 text-indigo-500 cursor-pointer' onClick={likePost} />
          ) : (
            <FilledHeartIcon className='h-6 w-6 text-indigo-500 cursor-pointer' onClick={unlikePost} />
          )}
          <ChatBubbleOvalLeftEllipsisIcon className='h-6 w-6 text-indigo-500 cursor-pointer' />
          <ShareIcon className='h-5 w-5 text-indigo-500 cursor-pointer' />

        </div>
        <div className='ml-1.5 flex justify-start items-center space-x-6 text-sm text-gray-700'>
          <p>{likes?.length}</p>
          <p>0</p>
          <p>0</p>
        </div>
        

    </div>
  )
}

export default Task