import "./App.css";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Signup1 from "./components/Signup1";
import Main from "./components/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Signup1" component={Signup1} />
          <Route exact path="/Main" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
