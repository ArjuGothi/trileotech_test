import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Completed from "./completed/completed";
import Remaining from "./remaining/remaining";
import "./router.css";

class RouterPage extends Component {
  state = {
    logout: false,
    url: '',
    user: {},
    title: ""
  };

  componentDidMount() {
    let x = localStorage.getItem("userData");
    this.setState({ user: JSON.parse(x), url:this.props.location.pathname});
  }
  componentWillUnmount() {
    this.setState({ logout: false });
  }

  setUrl = url => {
    this.setState({ url });
  };

  addTask = () => {
    let data = {
      title: this.state.title,
      user_id: this.state.user.id,
      completed:false
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
    fetch(`/api/public-api/users/${this.state.user.id}/todos`, requestOption)
      .then(response => response.json())
      .then(response => {
        setTimeout(() => {
          this.setState({title:''});
        }, 500);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.logout) {
      return <Redirect to="/" />;
    }
    const { url, title } = this.state;
    return (
      <div style={{ height: "100%" }}>
        <div className="outerNavbar">
          <div className="leftSideDiv">
            <div style={{ width: "100%" }}>
              <div className="navbar">
                <Link to="/pages/remaining">
                  <div
                    onClick={() => this.setUrl("/pages/remaining")}
                    className={
                      url === "/pages/remaining"
                        ? "navItem selectedBlock"
                        : "navItem"
                    }
                  >
                    <span className="navLabel">Remaining</span>
                    <span className="navCount">5</span>
                  </div>
                </Link>
                <Link to="/pages/completed">
                  <div
                    onClick={() => this.setUrl("/pages/completed")}
                    className={
                      url === "/pages/completed"
                        ? "navItem selectedBlock"
                        : "navItem"
                    }
                  >
                    <span className="navLabel">Completed</span>
                    <span className="navCount">12</span>
                  </div>
                </Link>
              </div>
              <Switch>
                <Route exact path="/pages/completed" component={Completed} />
                <Route exact path="/pages/remaining" component={Remaining} />
              </Switch>
            </div>
          </div>
          <div className="rightSideDiv">
            <div className="taskAddBox">
              <div className="boxTitle">Welcome Demo</div>
              <div className="boxLabel">
                <label>ToDo</label>
              </div>
              <textarea
                placeholder="message"
                className="boxTextarea"
                value={title ? title : ""}
                onChange={e => this.setState({ title: e.target.value })}
              ></textarea>
              <button
                style={{ marginBottom: "15px" }}
                className="button"
                onClick={() => this.addTask()}
              >
                Add
              </button>
              <div style={{ textAlign: "center" }}>
                <span className="boxBottomText">Signout from App</span>
                <span
                  className="boxSignOutTxt"
                  onClick={() => this.setState({ logout: true })}
                >
                  {" "}
                  SignOut
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RouterPage;
