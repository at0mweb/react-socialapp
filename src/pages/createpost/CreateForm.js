import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

function CreateForm() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const shema = yup.object().shape({
    title: yup.string().required('Please input post title.'),
    desc: yup.string().required('Please input post description.')
  })

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(shema)
  })

  const postsRef = collection(db, 'posts');

  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      title: data.title,
      desc: data.desc,
      username: user?.displayName,
      userid: user?.uid
    })
    navigate('/')
  }

  return (
    <form className='px-8 pt-9 pb-8 mb-4' onSubmit={handleSubmit(onCreatePost)}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='title'>Title</label>
        <input type='text' placeholder='Post title..' id='title' {...register('title')} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-shadow' />
        <p className='text-sm text-red-700'>{errors.title?.message}</p>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='desc'>Description</label>
        <textarea placeholder='Post description..' id='desc' {...register('desc')} className='shadow appearance-none border h-32 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-shadow' />
        <p className='text-sm text-red-700'>{errors.desc?.message}</p>
      </div>
      
      <button type='submit' className='py-2.5 px-5 bg-indigo-500 hover:bg-indigo-400 cursor-pointer rounded-lg text-white'>Create</button>


    </form>
  )
}

export default CreateForm