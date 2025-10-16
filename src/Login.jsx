import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === "checkbox" ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };
  const formValidation = (form) => {
    let valid = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      valid.email = "Please enter a valid email address";
    }
    if (form.password.trim().length < 4) {
      valid.password = "Password must be at least 4 characters long";
    }
    setErrors(valid);
    return Object.keys(valid).length === 0;
  };
  useEffect(() => {
    const isFormValid = formValidation(form);
    setIsValid(isFormValid);
  }, [form]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          navigate("/success");
        }
      });
  };
  return (
    <div class="container">
      <div class="login-card">
        <h2>Sign In</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              class="form-control"
              onChange={handleChange}
            />
            <div class="invalid-feedback" id="emailError"></div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              class="form-control"
              onChange={handleChange}
            />
            <div class="invalid-feedback" id="passwordError"></div>
          </div>

          <div class="form-group checkbox-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              onChange={handleChange}
            />
            <label for="terms" class="checkbox-label">
              I agree to terms of service and privacy policy
            </label>
            <div class="invalid-feedback" id="termsError"></div>
          </div>

          <div class="form-group text-center">
            <button
              type="submit"
              class="btn btn-primary"
              id="submitBtn"
              disabled
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
