import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
export default function Register() {
  const [loader, setLoader] = useState(false);

  const [toggleLoginSignUp, setTtoggleLoginSignup] = useState("register");

  let userTrue = false;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const togglehandle = (value) => {
    setTtoggleLoginSignup(value);
  };

  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  console.log(user.email.match(mailFormat));
  const submitRegister = (e) => {
    e.preventDefault();

    if (user.name === "" || null) {
      swal({
        title: "Name Required?",
        text: "Please Fill The required field",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    } else if (user.email === "" || null) {
      swal({
        title: "Email Required?",
        text: "Please fill the required field",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    } else if (user.email.match(mailFormat) === null) {
      swal({
        title: "Email Invalid",
        text: "Please fill the Valid email",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    } else if (user.password === "" || null) {
      swal({
        title: "Password Required",
        text: "Please fill the password",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    } else {
      setLoader(true);
      const userData = {
        username: user.name,
        email: user.email,
        password: user.password,
      };
      axios
        .post("http://localhost:5000/api/auth/register", userData)
        .then((response) => {
          const { message, success } = response.data;
          if (success) {
            swal("Good job!", "Registration Successfully", "success");
            setLoader(false);
          } else {
            swal("Bad job!", `${message}`, "error");
            setLoader(false);
          }
        });
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
     if (loginUser.email === "" || null) {
      swal({
        title: "Email Required?",
        text: "Please fill the required field",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    }
     else if (loginUser.email.match(mailFormat) === null) {
      swal({
        title: "Email Invalid",
        text: "Please fill the Valid email",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    } else if (loginUser.password === "" || null) {
      swal({
        title: "Password Required",
        text: "Please fill the password",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
    }
    else{
    setLoader(true);
    const userData = {
      email: loginUser.email,
      password: loginUser.password,
    };
 
    axios
      .post("http://localhost:5000/api/auth/login", userData)
      .then((response) => {
        const { message, success } = response.data;

        if (success) {
          swal("Good job!", `${message}`, "success");
          setLoader(false);
          localStorage.setItem("userTrue", true);
          window.location.replace("/home");
          return true;
        } else {
          swal("Bad job!", `${message}`, "error");
          setLoader(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setLoader(false);
          const { message } = error.response.data;
          swal("Bad job!", `${JSON.stringify(message)}`, "error");
            setLoader(false);
        }
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // console.log(name, value)
  };

  const loginHandle = (e) => {
    const { name, value } = e.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };

  return (
    <div className="container">
      {loader && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}
      {(() => {
        switch (toggleLoginSignUp) {
          case "register":
            return (
              <>
                <form>
                  <div class="InnereContainer">
                    <label htmlFor="email">
                      <b>Name</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">
                      <b>Email</b>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />

                    <label htmlFor="psw">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                    />
                    <div class="clearfix">
                      <button
                        type="submit"
                        onClick={(e) => {
                          submitRegister(e);
                        }}
                        class="signupbtn"
                      >
                        Register
                      </button>
                      <div className="login-option">
                        <span>
                          Already have an account?{" "}
                          <a
                            onClick={() => {
                              togglehandle("loginEvent");
                            }}
                          >
                            Login
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            );
          case "loginEvent":
            return (
              <>
                <form>
                  <div class="InnereContainer">
                    <label htmlFor="email">
                      <b>Email</b>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={loginUser.email}
                      onChange={loginHandle}
                    />

                    <label htmlFor="psw">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      value={loginUser.password}
                      onChange={loginHandle}
                    />
                    <div class="clearfix">
                      <button
                        type="submit"
                        onClick={(e) => {
                          submitLogin(e);
                        }}
                        class="signupbtn"
                      >
                        Login
                      </button>
                      <div className="login-option">
                        <span>
                          Don't have an account?{" "}
                          <a
                            onClick={() => {
                              togglehandle("register");
                            }}
                          >
                            Register
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            );

          default:
            return null;
        }
      })()}
    </div>
  );
}
