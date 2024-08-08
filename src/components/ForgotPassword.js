import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate,Link} from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Checkbox, TextField } from "@mui/material";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const LoginSchemaValidation = yup.object({
  email: yup.string().email().required("Please Enter A Valid Email"),
});

export default function ForgotPassword() {
  let [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: LoginSchemaValidation,
      onSubmit: (val) => {
        done(val);
      },
    });

  const done = async (val) => {
    let { email } = val;
    console.log("val ==", val);

    let payload = { email };
    try {
      let res = await axios.post(`${url}/users/forgetPassword`, payload);
      console.log(res);
      localStorage.setItem("resetToken", res.data.token);
      toast.success(res.data.message);
      setShow(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setShow(false);
    }
  };

  return (
    <div className="login-main">
      <div className="formm-outer">
        {show ? (
          <Form
            className="formm shadow-lg p-3 mb-5 bg-white rounded"
            // onSubmit={handleSubmit}
          >
            <div style={{ textAlign: "center", fontFamily: "Montserrat" }}>
              <h2 style={{}}>
                {" "}
                {show ? "Check Your Email" : "Forgot Your Password?"}{" "}
              </h2>

              <p className="forget-exp">
                {" "}
                {show
                  ? "A Link Has Been Sent To Your Mail Id To Reset Your Password !"
                  : "Enter your email address below, we'll send you a link to reset your password."}{" "}
              </p>
            </div>
            <div className="login-fields">
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
                onClick={() => navigate("/")}
              >
                Click to login
              </Button>
            </div>
          </Form>
        ) : (
          <Form
            className="formm shadow-lg p-3 mb-5 bg-white rounded"
            onSubmit={handleSubmit}
          >
            <div style={{ textAlign: "center", fontFamily: "Montserrat" }}>
              <h2 style={{}}>
                {" "}
                {show ? "Check Your Email" : "Forgot Your Password?"}{" "}
              </h2>

              <p className="forget-exp">
                {" "}
                {show
                  ? "A Link Has Beedn Sent To Your Mail Id To Reset Your Password !"
                  : "Enter your email address below, we'll send you a link to reset your password."}{" "}
              </p>
            </div>
            <div className="login-fields">
              <TextField
                label="Enter The Email"
                variant="outlined"
                onBlur={handleBlur}
                name="email"
                value={values.email}
                onChange={handleChange}
                style={{
                  marginTop: "20px",
                  fontSize: "15px",
                }}
              />
              {touched.email && errors.email ? (
                <p style={{ color: "red" }}>{errors.email}</p>
              ) : (
                ""
              )}
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
                // onClick={() => done()}
              >
                Submit
              </Button>
            </div>

            <div style={{ marginTop: "25px" }}>
              <div className="text-center mb-1">
                <Link to="/account-registration" underline="hover">
                  {" "}
                  Create A New Account{" "}
                </Link>
              </div>
              <div className="text-center">
                <Link to="/" underline="hover">
                  {" "}
                  Already Have A Account? Login.{" "}
                </Link>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
