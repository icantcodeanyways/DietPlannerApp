import "./App.css";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/SettingsPage/Settings";
import Diet from "./components/DietPage/Diet";
import { AuthProvider } from "./context/AuthContext";
import NavbarSample from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ViewDietPlan from "./components/ViewDietPlan/ViewDietPlan";
import "react-toastify/dist/ReactToastify.css";
import CustomMealPage from "./components/CustomMealPage/CustomMealPage";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <NavbarSample />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
            <PrivateRoute exact path="/custom_meal" component={CustomMealPage} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/view_diet_plan"
              component={ViewDietPlan}
            />
            <PrivateRoute exact path="/settings" component={Settings} />
            <PrivateRoute exact path="/diet" component={Diet} />
          </Switch>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
