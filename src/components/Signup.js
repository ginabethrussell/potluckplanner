import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const initialUserCredentials = {
  username: "",
  password: "",
  primaryemail: "",
};

function Signup() {
  const [userCredentials, setUserCredentials] = useState(
    initialUserCredentials
  );
  const [loginError, setLoginError] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const signupUser = (e) => {
    e.preventDefault();
    console.log(userCredentials);
    
    axios
		.post('https://potluck-tt11.herokuapp.com/createnewuser', userCredentials)
			.then((res) => {
				console.log('submit res:', res);
				localStorage.setItem('access_token', res.data.access_token);
				history.push('/dashboard');
			})
			.catch((err) =>
				setLoginError(
					'Registration failed. Please double-check your information and try again.'
				)
			);
    setUserCredentials(initialUserCredentials);
  };

  return (
      <div className='signup'>
    <div className="form-wrapper">
      <h2>Signup for an Account</h2>
      <Form className="form" onSubmit={signupUser}>
        <FormGroup>
          <Label for="username">
            Username:
          </Label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder='username'
            value={userCredentials.username}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">
            Password:
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder='password'
            value={userCredentials.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">
            Email:
          </Label>
          <Input
            type="email"
            id="email"
            name="primaryemail"
            placeholder='email'
            value={userCredentials.primaryemail}
            onChange={handleChange}
          />
        </FormGroup>
        <div className='btn-wrapper'>
            <Button color="secondary" type="submit">
                Signup
            </Button>
        </div>
        {loginError !== ''? (<p className='error-message'>{loginError}</p>): null }
      </Form> 
    </div>
    </div>
  );
}

export default Signup;

