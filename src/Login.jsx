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
          navigate("/main");
        } else {
          navigate("/error");
        }
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={!!errors.email}
          valid={isValid && !errors.email && form.email.trim() !== ""}
        />
        <FormFeedback>{errors.email}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={!!errors.password}
          valid={isValid && !errors.password && form.password.trim() !== ""}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={!!errors.terms}
        />{" "}
        <FormFeedback>{errors.terms}</FormFeedback>
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
