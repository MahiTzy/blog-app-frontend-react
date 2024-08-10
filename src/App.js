import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PrivatePages from './components/PrivatePages';
import AboutUs from './pages/AboutUs';
import BlogPage from './pages/BlogPage';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import UpdatePost from './pages/UpdatePost';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/blog-page/:postId" element={<BlogPage />} />
      <Route path="/user" element={<PrivatePages />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="update-post/:postId" element={<UpdatePost />} />
      </Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
