import { auth, provider } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut, signInWithPopup } from 'firebase/auth'
import { useState } from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

  

function NavigationBar() {

    const [open, setOpen] = useState(true);

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        window.location.reload();
    }

    const [user] = useAuthState(auth);

    
    const signUserOut = async () => {
      await signOut(auth);
    }

    return (
      <nav className='bg-white md:drop-shadow-sm'>
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-gray-400'>
          <h1 className='w-full text-2xl font-bold text-indigo-400'>Social Media</h1>
          <ul className='hidden md:flex text-gray-700 font-medium text-sm'>
            <li className='p-4 border-b-2 border-transparent hover:text-gray-500 hover:border-indigo-300 transition'><a href="/">Home</a></li>
            {!user ? ("") : (<li className='p-4 border-b-2 border-transparent hover:text-gray-500 hover:border-indigo-300 transition'><a href="/createpost">Create&nbsp;Post</a></li>)}
            <li className='p-4 border-b-2 border-transparent hover:text-gray-500 hover:border-indigo-300 transition'><a href="/">Friends</a></li>
            <li className='p-4 border-b-2 border-transparent hover:text-gray-500 hover:border-indigo-300 transition'><a href="/">Profile</a></li>
            <li className='px-4 py-1.5'><button type="button" onClick={!user ? signInWithGoogle : signUserOut} className='py-2.5 text-center rounded-lg focus:ring-indigo-800 px-5 font-medium bg-indigo-500 text-white hover:bg-indigo-400'>{!user ? 'Login' : 'Logout'}</button></li>
          </ul>
          <div onClick={() => setOpen(!open)} className='block md:hidden'>
            {!open ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
          <div className={!open ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-indigo-300 bg-white ease-in-out duration-500' : 'fixed left-[-100%] h-full border-r border-r-indigo-300 bg-white ease-linear duration-500'}>
            <h1 className='w-full text-2xl font-bold text-indigo-300 ml-4 mt-8'>Social Media</h1>
            <ul className='pt-5 uppercase text-gray-700 font-medium text-sm'>
              <li className='p-4 font-medium border-b border-indigo-300'>Home</li>
              {!user ? ("") : (<li className='p-4 font-medium border-b border-indigo-300'><a href="/createpost">Create Post</a></li>)}
              <li className='p-4 font-medium border-b border-indigo-300'>Friends</li>
              <li className='p-4 font-medium border-b border-indigo-300'>Profile</li>
              <li className='p-4'><button type="button" onClick={user ? signUserOut : signInWithGoogle} className='py-2.5 text-center rounded-lg focus:ring-indigo-800 px-5 font-medium bg-indigo-500 text-white hover:bg-indigo-400'>{user ? 'Logout' : 'Login'}</button></li>
            
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default NavigationBar
