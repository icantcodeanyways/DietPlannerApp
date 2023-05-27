import React, { useContext, useState } from "react";
import samplePhoto from "../images/bg4.jpg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState({ status: false, message: "" });

  const history = useHistory();

  const handleForgotPassword = async () => {
    try {
      setIsLoading({ status: true, message: `Sending OTP to ${email}` });
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/forgot_password`,
        { email: email }
      );
      if (response.status === 200) {
        toast.success(
          "An OTP secret code has been send to your email. Please check your email"
        );
        setIsLoading({ status: false, message: "" });
        setIsCodeSent(true);
      }
    } catch (error) {
      setIsLoading({ status: false, message: "" });
      if (error.response.status === 404) {
        toast.error(
          "No user with such an email exist. Please check email again."
        );
      }
      setEmail("");
      setPassword("");
    }
  };

  const handleResetPassword = async () => {
    try {
      if (password != confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      setIsLoading({ status: true, message: "Resetting password..." });
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/reset_password`,
        { email: email, password: password, rest_code: code }
      );
      if (response.status === 200) {
        toast.success("Password reset successfully. Please login ");
        setIsCodeSent(false);
        setIsLoading({ status: false, message: "" });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCode("");
        history.push("/login");
      }
    } catch (error) {
      setIsLoading({ status: false, message: "" });
      if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 400) {
        toast.error("Password reset time expired. Try again");
      }
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCode("");
      setIsCodeSent(false);
    }
  };

  return (
    <>
      {isLoading.status && (
        <div className="overlay">
          <span className="loading-text">{isLoading.message}</span>
          <Spinner
            animation="grow"
            style={{ width: "4rem", height: "4rem" }}
            variant="warning"
          />
        </div>
      )}

      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src={samplePhoto}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Forgot password
                </h5>

                <div>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="formControlLg"
                    required
                    type="email"
                    size="lg"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />

                  {isCodeSent && (
                    <div>
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Secret code"
                        id="formControlLg"
                        type="text"
                        size="lg"
                        value={code}
                        required
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                      />

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        id="formControlLg"
                        type="password"
                        size="lg"
                        value={password}
                        required
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />

                      <MDBInput
                        wrapperClass="mb-4"
                        label="Confrim password"
                        id="formControlLg"
                        type="password"
                        size="lg"
                        value={confirmPassword}
                        required
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                      />

                      <div className="d-grid gap-2">
                        <Button
                          onClick={handleResetPassword}
                          variant="warning"
                          size="lg"
                        >
                          Reset password
                        </Button>
                      </div>
                    </div>
                  )}

                  {!isCodeSent && (
                    <div className="d-grid gap-2">
                      <Button
                        onClick={handleForgotPassword}
                        variant="warning"
                        size="lg"
                      >
                        Forgot password
                      </Button>
                    </div>
                  )}
                </div>
                <p className="mt-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ color: "#393f81" }}>
                    Register here
                  </Link>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default ForgotPassword;
