import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const RegisterReactBoots = () => {
  const [user, setUser] = useState({});
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = event => {
    event.preventDefault();
    const form = event.target;
    setSuccess(false);
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    //Validation password
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError("Please provide At least 2 uppercase");
      return;
    }

    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError("Please use at least one special Character");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Please set at least 6 character to set password");
      return;
    }
    setPasswordError("");

    // handle user create
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        setUser(user);
        setSuccess(true);
        form.reset();
        verifyEmail();
        updateUserName();
        console.log(user);
      })
      .catch(error => {
        setPasswordError(error.message);
        console.error(error);
      });

    // verify user email and update profile
    const verifyEmail = () => {
      sendEmailVerification(auth.currentUser).then(() => {
        alert("Please verify your email");
      });
    };

    const updateUserName = name => {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          alert("Profile update Successfully");
        })
        .catch(error => {
          console.log("error:", error);
        });
    };
  };

  return (
    <div className="w-50 mx-auto">
      <h3 className="text-primary">Please Register</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="name"
            name="name"
            placeholder="Your Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
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
        <p className="text-danger">{passwordError}</p>
        {success && <p className="text-success">User created successfully</p>}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p>
        <small>
          Already have an account? Please <Link to="/login">Login</Link>
        </small>{" "}
      </p>
    </div>
  );
};

export default RegisterReactBoots;
