import "./App.css";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/SettingsPage/Settings"
import Diet from './components/DietPage/Diet'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/diet" component={Diet} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
