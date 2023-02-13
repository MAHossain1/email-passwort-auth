import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);
const LoginBootstrap = () => {
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  //handle submit
  const handleSubmit = event => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // handle user Login
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        setSuccess(true);
        console.log(user);
      })
      .catch(error => {
        console.error("error", error);
      });
  };

  const handleUserEmail = event => {
    const email = event.target.value;
    setUserEmail(email);
  };

  const handleForgetPassword = () => {
    if (!userEmail) {
      alert("Please enter your email address.");
    }
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert("Check your Email to rest your password");
      })
      .catch(error => {
        console.error("error:", error);
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h3 className="text-primary">Please Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
            onBlur={handleUserEmail}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        {success && (
          <p className="text-success">Successfully login to the account</p>
        )}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p>
        <small>
          New to this website? Please <Link to="/register">Register</Link>
        </small>{" "}
      </p>
      <p>
        Forget password?{" "}
        <button onClick={handleForgetPassword} className="btn btn-link">
          Reset your password
        </button>
      </p>
    </div>
  );
};

export default LoginBootstrap;
