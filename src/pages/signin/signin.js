import React, { Component } from "react";
import "./signin.css";
import { Redirect } from "react-router-dom";

class SigninWrapper extends Component {
  state = {
    authObj: {},
    authLoading: false,
    submitted: false,
    userRedir: false,
    message: "",
    errormsg: false,
    invalidemail: false,
    signUpVar: false,
  };

  setDataForAuth = (e, type, varType) => {
    const { authObj } = this.state;
    if (type === "email") {
      let re = /[^@]+@[^@]+\.[^@]+/;
      if (re.test(e)) {
        authObj[type] = e;
        this.setState({ authObj, invalidemail: false });
      } else {
        authObj[type] = e;
        this.setState({ authObj, invalidemail: true });
      }
    } else if (varType) {
      authObj[varType] = type;
      this.setState({ authObj });
    } else {
      authObj[type] = e;
      this.setState({ authObj });
    }
  };

  submit = type => {
    if (type === "signUp") {
      const { email, name, gender } = this.state.authObj;
      this.setState({ submitted: true });
      if (!(email && name && gender)) {
        return;
      }
      this.setState({ authLoading: true });
      let data = {
        name: name,
        email: email,
        gender: gender,
        status: "Active"
      };
      const requestOption = {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          Authorization:
            "Bearer 483be5e0b819044244f5d4fb818e38fe5c3fdb1a848ed0f39ea914e9aba39a0b"
        }),

        body: JSON.stringify(data)
      };
      fetch("/api/public-api/users", requestOption)
        .then(response => response.json())
        .then(response => {
          localStorage.setItem("userData", JSON.stringify(response.data));
          this.setState({ userRedir: true });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const { authObj } = this.state;
      const { email, name } = authObj;
      this.setState({ submitted: true });
      if (!(email && name)) {
        return;
      }
      this.setState({ authLoading: true });
      const requestOption = {
        method: "GET",
        headers: new Headers({
          "content-type": "application/json",
          Authorization:
            "Bearer 483be5e0b819044244f5d4fb818e38fe5c3fdb1a848ed0f39ea914e9aba39a0b"
        })
      };
      fetch(`/api/public-api/users?name=${name}&email=${email}`, requestOption)
        .then(response => response.json())
        .then(response => {
          if (response.data && response.data.length > 0) {
            let ind = response.data.findIndex(
              i => i.name === name && i.email === email
            );
            if (ind !== -1) {
              // localStorage.setItem('userData',JSON.stringify(allUsers[ind[0].id]));
              localStorage.setItem(
                "userData",
                JSON.stringify(response.data[ind])
              );
              this.setState({ userRedir: true });
            } else {
              this.setState({ message: "User Not Found." });
            }
          } else {
            this.setState({ message: "User Not Found." });
            this.setState({ authLoading: false });
          }
        })
        .catch(err => {});
    }
  };

  render() {
    if (this.state.userRedir) {
      return <Redirect to="/pages/remaining" />;
    }
    const {
      authObj,
      authLoading,
      submitted,
      invalidemail,
      signUpVar
    } = this.state;
    return (
      <div className="signinWrapper">
        <div className="signInImgDiv">
          <img style={{margin:"auto"}} src={require('./picture.png')} alt='Login'/>
        </div>
      <div className="mainDiv">
        {signUpVar ? (
          <div className="loginPage">
            <div className="loginLbl">Sign Up to ToDo App</div>
            <div className="spacing">
              <div className="inputLable">
                <label>Name</label>
              </div>
              <input
                onChange={e => this.setDataForAuth(e.target.value, "name")}
                autoComplete="off"
                className="input"
                placeholder="Enter fullname"
                value={authObj.name ? authObj.name : ""}
              />
              {submitted && !authObj.name && (
                <div className="errorMsg">
                  Name required<sup>*</sup>
                </div>
              )}
            </div>
            <div className="spacing">
              <div className="inputLable">
                <label>Email</label>
              </div>
              <input
                onChange={e => this.setDataForAuth(e.target.value, "email")}
                autoComplete="off"
                className="input"
                placeholder="Enter email address"
                value={authObj.email ? authObj.email : ""}
              />
              {invalidemail && (
                <div className="errorMsg">Enter a valid email</div>
              )}
              {submitted && !authObj.email && (
                <div className="errorMsg">
                  Email required<sup>*</sup>
                </div>
              )}
            </div>
            <div className="spacing">
              <div className="checkbxDiv">
                <div style={{ width: "50%" }}>
                  <input
                    type="checkbox"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={e =>
                      this.setDataForAuth(e.target.value, "Female", "gender")
                    }
                  />
                  <label for="gender"> Female</label>
                </div>
                <div style={{ width: "50%" }}>
                  <input
                    type="checkbox"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={e =>
                      this.setDataForAuth(e.target.value, "Male", "gender")
                    }
                  />
                  <label for="gender"> Male</label>
                </div>
              </div>
            </div>
            {submitted && !authObj.gender && (
              <div className="errorMsg">
                Gender required<sup>*</sup>
              </div>
            )}
            <div className="spacing">
              <button className="button" onClick={() => this.submit("signUp")}>
                {authLoading ? (
                  <i className="fa fa-spinner fa-spin" size="sm"></i>
                ) : null}{" "}
                Sign Up
              </button>
            </div>
            <div className="spacing" style={{textAlign:"center"}}>
              <div className="loginBlwTxt">Already Registered to ToDo App</div>
              <div
                className="signUpBlwTxt"
                onClick={() => this.setState({ signUpVar: false })}
              >
                Sign In Here
              </div>
            </div>
            {this.state.errormsg ? (
              <span className="errorMsg">{this.state.message}</span>
            ) : null}
          </div>
        ) : (
          <div className="loginPage">
            <div className="loginLbl">Sign In to ToDo App</div>
            <div className="spacing">
              <div className="inputLable">
                <label>Name</label>
              </div>
              <input
                onChange={e => this.setDataForAuth(e.target.value, "name")}
                autoComplete="off"
                className="input"
                placeholder="Enter fullname"
                value={authObj.name ? authObj.name : ""}
              />
              {submitted && !authObj.name && (
                <div className="errorMsg">
                  Name required<sup>*</sup>
                </div>
              )}
            </div>
            <div className="spacing">
              <div className="inputLable">
                <label>Email</label>
              </div>
              <input
                onChange={e => this.setDataForAuth(e.target.value, "email")}
                autoComplete="off"
                className="input"
                placeholder="Enter email address"
                value={authObj.email ? authObj.email : ""}
              />
              {invalidemail && (
                <div className="errorMsg">Enter a valid email</div>
              )}
              {submitted && !authObj.email && (
                <div className="errorMsg">
                  Email required<sup>*</sup>
                </div>
              )}
            </div>

            <div className="spacing">
              <button className="button" onClick={() => this.submit("signIn")}>
                {authLoading ? (
                  <i className="fa fa-spinner fa-spin" size="sm"></i>
                ) : null}{" "}
                Sign In
              </button>
            </div>
            <div className="spacing" style={{textAlign:"center"}}>
              <span className="loginBlwTxt">New to ToDo App</span>
              <span
                className="signUpBlwTxt"
                onClick={() => this.setState({ signUpVar: true })}
              >
                {" "}
                Sign Up Here
              </span>
            </div>
            {this.state.errormsg ? (
              <span className="errorMsg">{this.state.message}</span>
            ) : null}
          </div>
        )}
      </div>
      </div>
    );
  }
}

export default SigninWrapper;
