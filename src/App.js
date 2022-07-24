import './App.css';
import Nav from './component/Nav.jsx'
import Header from './component/Header.jsx'
import PostList from './PostList.jsx'
import Post from './component/Post.jsx'
import EditPage from './EditPage.jsx'
import LoginPage from './LoginPage.jsx'
import { HashRouter , Routes, Route } from "react-router-dom";
// require('dotenv').config()

function App() {
  return (
    <div className="App">
      <HashRouter>
      <Nav></Nav>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<PostList />}  />
        <Route exact path="/editPage" element={<EditPage />}  />
        <Route exact path="/loginPage" element={<LoginPage />}  />
        <Route exact path="/post/:key" element={<Post />}  />
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
