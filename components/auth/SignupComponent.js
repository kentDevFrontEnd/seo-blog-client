import React, { useState } from "react";
const { Button, Container, Row, Col } = require("reactstrap");

import { signup } from "../../actions/auth.action";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: null,
    loading: false,
    message: "",
    showForm: true,
  });

  const {
    name,
    email,
    password,
    passwordConfirm,
    error,
    loading,
    message,
    showForm,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", values);

    setValues({ ...values, loading: true, error: null });

    const user = { name, email, password, passwordConfirm };

    signup(user).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          error: null,
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (key) => (e) => {
    setValues({ ...values, [key]: e.target.value });
  };

  const showLoading = () => {
    return loading && <div className="alert alert-info">Loading ...</div>;
  };
  const showError = () => {
    return error && <div className="alert alert-warning">{error}</div>;
  };
  const showMessage = () => {
    return message && <div className="alert alert-info">{message}</div>;
  };

  const signupForm = () => {
    return (
      <Container>
        <Row>
          <Col sm={6} className="offset-sm-3">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  value={name}
                  onChange={handleChange("name")}
                  className="form-control"
                  placeholder="Type your name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={handleChange("email")}
                  className="form-control"
                  placeholder="Type your email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={handleChange("password")}
                  className="form-control"
                  placeholder="Type your password"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={passwordConfirm}
                  onChange={handleChange("passwordConfirm")}
                  className="form-control"
                  placeholder="Type your password comfirm"
                />
              </div>
              <div>
                <Button color="primary" type="submit">
                  Signup
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  };
  return (
    <React.Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
