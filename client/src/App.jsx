import { useState } from 'react'
import './App.css'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Home from './component/Home/Home'
import SingleBlog from './component/SingleBlog/SingleBlog'
import BlogPostForm from './component/BlogPostForm/BlogPostForm'
import { Route, Routes, BrowserRouter } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <BrowserRouter>
        <Routes>
          
        <Route path="/" element={  <Login/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view/:id" element={<SingleBlog />} />
          <Route path="/create" element={<BlogPostForm />} />
      
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
