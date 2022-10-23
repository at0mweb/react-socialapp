import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'

// PAGES
import Main from './pages/Main'
import CreatePost from './pages/createpost/CreatePost'

//COMPONENTS
import NavigationBar from './components/Navbar'


function App() {

  return (
    <div className="App">
      
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/createpost' element={<CreatePost />} />
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
