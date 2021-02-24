import React, { useEffect, useState } from "react";
import Router from "next/router";
const { Button, Container, Row, Col } = require("reactstrap");

import { authenticate, isAuth, signin } from "../../actions/auth.action";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "abc@abc.com",
    password: "123456",
    error: null,
    loading: false,
    message: "",
    showForm: true,
  });

  useEffect(() => {
    isAuth() && Router.push("/");
    console.log("redirect");
  }, []);

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", values);

    setValues({ ...values, loading: true, error: null });

    const user = { email, password };

    signin(user).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          email: "",
          password: "",
          error: null,
          loading: false,
          message: data.message,
          showForm: false,
        });
        // save user token to cookie
        // save user info to local storage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === "admin") {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
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
              <div>
                <Button color="primary" type="submit">
                  Signin
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

export default SigninComponent;
