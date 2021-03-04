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
  password: ""
};

function Login() {
  const [userCredentials, setUserCredentials] = useState(initialUserCredentials);
  const [loginError, setLoginError] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    console.log(userCredentials);
    axios
		.post(
			'https://potluck-tt11.herokuapp.com/login',
				`grant_type=password&username=${userCredentials.username}&password=${userCredentials.password}`,
				{
					headers: {
						Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			)
			.then((res) => {
				localStorage.setItem('token', res.data.access_token);
				history.push('/dashboard');
			})
			.catch((err) =>
				setLoginError(
					'The name or password you entered is not correct. Please double-check and try again.'
				)
			);
        }
  return (
    <div className='login'>
    <div className="form-wrapper">
      <h2>Login to Your Account</h2>
      <Form className="form" onSubmit={loginUser}>
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
          />
        </FormGroup>
        <div className='btn-wrapper'>
            <Button color="secondary" type="submit">
                Login
            </Button>
        </div>
        {loginError !== ''? (<p className='error-message'>{loginError}</p>): null }
      </Form> 
    </div>
    </div>
  )
}
export default Login;