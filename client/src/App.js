import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import Expenses from "./components/Expenses/Expenses";
import Login from './components/Login/Login'
import MenuAppBar from './components/MenuAppBar/MenuAppBar'
import Report from "./components/Report/Report";

function App() {
  return (
    <div>
      <Router>
        <MenuAppBar />
        <Container >
          <Switch>
            <Route exact path={["/", "/login"]}>
              <Login />
            </Route>
            <Route path="/expenses">
              <Expenses />
            </Route>
            <Route path="/categories">
              <Categories />
            </Route>
            <Route path="/reports">
              <Report />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div >
  );
}

export default App;
