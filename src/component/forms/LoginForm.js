import React from "react";
import propTypes from "prop-types";
import { Form, Button, Label } from "semantic-ui-react";
import Validator from 'validator';
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if(Object.keys(errors).length === 0){ //check if errors is empty
        this.props.submit(this.state.data);
    }
  };

  validate = (data) => {
    const errors = {};
    if(!Validator.isEmail(data.email)){
        errors.email = "Invalid email";
    }
    if(!data.password){
        errors.password = "can't be blank";
    }
    return errors;
  }

  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit = {this.onSubmit}>
        <Form.Field error = {!!errors.email}>
          <Label htmlFor="email">Email</Label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text = {errors.email}/>}
        </Form.Field>
        <Form.Field error = {!!errors.password}>
          <Label htmlFor="password">Password</Label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secue"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text = {errors.password}/>}
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
    submit:propTypes.func.isRequired
};

export default LoginForm;
