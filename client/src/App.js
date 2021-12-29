import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./pages/NavBar";
import ShowUserAccount from "./pages/user/ShowUserAccount";
import UserBlog from "./pages/card/UserBlog";
import CreateBlog from "./pages/blog/CreateBlog";
import UpdateBlog from "./pages/blog/UpdateBlog";
import Description from "./pages/blog description/Description";
import "rsuite/dist/rsuite.min.css";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <>
      <HashRouter>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/myAccount">
            <ShowUserAccount />
          </Route>
          <Route exact path="/myBlogs">
            <UserBlog />
          </Route>
          <Route exact path="/createBlog">
            <CreateBlog />
          </Route>
          <Route exact path="/updateBlog/:id">
            <UpdateBlog />
          </Route>
          <Route exact path="/blogDetail/:id">
            <Description />
          </Route>
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;
