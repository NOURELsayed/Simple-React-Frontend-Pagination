
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Posts from './components/posts'
import Pagination from './components/Pagination';

function App() {
  const [posts,setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage] = useState(10)

useEffect(() => {
  const fetchPosts = async () =>{
    setLoading(true);
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setPosts(res.data);
    setLoading(false);
  }
  fetchPosts()
}, [])

//Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//change page
const paginate = (pageNumbers) => setcurrentPage(pageNumbers)
  return (
    <div className="container mt-5">
      <h1 className='text-primary mb-3'>My Blog</h1>
      < Posts posts={currentPosts} loading={loading}/>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;
