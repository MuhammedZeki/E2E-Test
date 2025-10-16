import React, { useEffect, useState } from "react";
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

    if (!form.email) {
      valid.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      valid.email = "Please enter a valid email address";
    }

    if (!form.password) {
      valid.password = "Password is required";
    } else if (form.password.trim().length < 4) {
      valid.password = "Password must be at least 4 characters long";
    }

    if (!form.terms) {
      valid.terms = "You must agree to terms of service and privacy policy";
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
          (item) => item.password === form.password && item.email === form.email
        );
        if (user) {
          setForm(initialForm);
          navigate("/success");
        } else {
          setErrors({
            submit: "Invalid email or password. Please try again.",
          });
        }
      })
      .catch(() => {
        setErrors({
          submit: "Login failed. Please try again later.",
        });
      });
  };

  const getInputClass = (fieldName) => {
    if (errors[fieldName]) {
      return "form-control invalid";
    } else if (form[fieldName] && !errors[fieldName]) {
      return "form-control valid";
    }
    return "form-control";
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2>Sign In</h2>

        {errors.submit && (
          <div className="alert alert-error">{errors.submit}</div>
        )}

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={getInputClass("email")}
              onChange={handleChange}
              value={form.email}
            />
            {errors.email && (
              <div className="invalid-feedback show">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={getInputClass("password")}
              onChange={handleChange}
              value={form.password}
            />
            {errors.password && (
              <div className="invalid-feedback show">{errors.password}</div>
            )}
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              onChange={handleChange}
              checked={form.terms}
            />
            <label htmlFor="terms" className="checkbox-label">
              I agree to terms of service and privacy policy
            </label>
            {errors.terms && (
              <div className="invalid-feedback show">{errors.terms}</div>
            )}
          </div>

          <div className="form-group text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
