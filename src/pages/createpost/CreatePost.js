import React from 'react'
import CreateForm from './CreateForm'

function CreatePost() {
  return (
    <div className='w-full max-w-lg mx-auto mt-10'>
      <h1 className='px-8 text-3xl font-bold text-gray-800'>Create a new post</h1>
      <CreateForm />
    </div>
  )
}

export default CreatePost