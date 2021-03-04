import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import {useState} from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Events from './components/Events';
import PrivateRoute from './utils/PrivateRoute';
import Logout from './components/Logout';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { axiosWithAuth } from './utils/axiosWithAuth';

const initialState = {
  user: {
    username: '',
    userid: '',
    organizedpotlucks: [],
    attendingpotlucks: []
  }
}
function App() {
const [appState, setAppState] = useState(initialState);
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);


  return (
    <div className="App">
      <header>
        <Navbar style={{height: '100px'}}color="light" light expand='md'>  
          <NavbarBrand href="#">Potluck Planner</NavbarBrand>
          <NavbarToggler dark onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink style={{width: '100px', textAlign: 'center', paddingLeft: '20px'}}tag={Link} to='/'>Home</NavLink>
            </NavItem>
            <NavItem style={{width: '100px', textAlign: 'center'}}>
              <NavLink tag={Link} to="/login">Login</NavLink>
            </NavItem>
            <NavItem style={{width: '100px', textAlign: 'center'}}>
              <NavLink tag={Link} to="/signup">Signup</NavLink>
            </NavItem>
            <NavItem style={{width: '100px', textAlign: 'center'}}>
              <NavLink color="light" tag={Link} to="/dashboard">Create</NavLink>
            </NavItem>
            <NavItem style={{width: '100px', textAlign: 'center'}}>
              <NavLink tag={Link} to="/events">Events</NavLink>
            </NavItem>
            <NavItem style={{width: '100px', textAlign: 'center'}}>
              <NavLink  tag={Link} to="/logout" >Logout</NavLink>
            </NavItem>
          </Nav>
          </Collapse>
        </Navbar>   
      </header>
      <main>
        <Switch>
          <Route exact path="/" component = {Home} />
          <Route path="/login" component = {Login} />
          <Route path="/signup" component = {Signup} />
          <PrivateRoute path="/dashboard" component = {Dashboard}/>
          <PrivateRoute path="/events" component = {Events}/>
          <PrivateRoute path="/logout" component = {Logout}/>
        </Switch>
      </main>
      <div className='footer'>
        <p>&copy; Potluck Planner 2021</p>
      </div>
    </div>
  );
}

export default App;
