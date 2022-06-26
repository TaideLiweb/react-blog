import './App.css';
import Nav from './component/Nav.jsx'
import Header from './component/Header.jsx'
import PostList from './component/PostList.jsx'
import EditPage from './EditPage.jsx'
import { HashRouter , Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
      <Nav></Nav>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<PostList />}  />
        <Route exact path="/editPage" element={<EditPage />}  />
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
