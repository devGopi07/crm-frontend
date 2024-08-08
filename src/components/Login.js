import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Checkbox, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

import { url } from "../App";

const LoginSchemaValidation = yup.object({
  email: yup.string().email().required("Please Enter A Valid Email"),
  password: yup.string().required("Minimum 8 Characters Required").min(8),
});

export default function Login() {
  let [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }, []);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "gopi.rg03@gmail.com",
        password: "gopi@321",
      },
      validationSchema: LoginSchemaValidation,
      onSubmit: (val) => {
        login(val);
      },
    });

  const login = async (val) => {
    let { email, password } = val;
    let payload = { email, password };

    console.log(payload);
    try {
      let res = await axios.post(`${url}/users/signIn`, payload);
      console.log(res);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login-main">
      <div className="formm-outer">
        <Form
          className="formm shadow-lg p-3 mb-5 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <div style={{ textAlign: "center", fontFamily: "Montserrat" }}>
            <h2>Login</h2>
          </div>
          <div className="login-fields">
            <TextField
              className="input-field"
              label="Enter The Email"
              variant="outlined"
              onBlur={handleBlur}
              name="email"
              value={values.email}
              onChange={handleChange}
              style={{
                marginTop: "15px",
                fontSize: "15px",
              }}
            />
            {touched.email && errors.email ? (
              <p style={{ color: "red" }}>{errors.email}</p>
            ) : (
              ""
            )}
            <TextField
              className="input-field"
              label="Enter The Password"
              variant="outlined"
              onBlur={handleBlur}
              name="password"
              value={values.password}
              onChange={handleChange}
              style={{
                marginTop: "15px",
                fontSize: "15px",
              }}
              type={show ? "text" : "password"}
            />
            {touched.password && errors.password ? (
              <p style={{ color: "red" }}>{errors.password}</p>
            ) : (
              ""
            )}
            <div className="checkbox-div">
              <Checkbox onClick={() => setShow(!show)} />
              <p>Show Password</p>
            </div>
            <Button
              style={{
                marginTop: "15px",
                backgroundColor: "#4e73df",
                borderColor: "#4e73df",
                color: "#fff",
                borderRadius: "20px",
              }}
              variant="primary"
              type="submit"
              // onClick={() => login()}
            >
              Submit
            </Button>
          </div>

          <div style={{ marginTop: "25px" }}>
            <div className="text-center mb-1">
              <Link to="/reset-password" underline="hover">
                {" "}
                Forgot Password{" "}
              </Link>
            </div>
            <div className="text-center">
              <Link to="/account-registration" underline="hover">
                {" "}
                Create A New Account{" "}
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
