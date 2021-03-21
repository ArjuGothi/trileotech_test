import React, { Component } from "react";
import "./completed.css";

class Completed extends Component {
  state = {
    user:{},
    allUsers:[],
  };

  componentDidMount() {
    let x = localStorage.getItem("userData");
    this.setState({ user: JSON.parse(x) });
    setTimeout(() => {
      this.getAllToDos();
    }, 500);
  }

  getAllToDos = () => {
    const requestOption = {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        Authorization:
          "Bearer 483be5e0b819044244f5d4fb818e38fe5c3fdb1a848ed0f39ea914e9aba39a0b"
      })
    };
    fetch(`/api/public-api/users/${this.state.user.id}/todos`, requestOption)
      .then(response => response.json())
      .then(response => {
        this.setState({ allUsers: response.data });
      })
      .catch(err => {
        this.setState({ message: err.message });
      });
  };

  onCheckClick = data => {
    data["completed"] = !data["completed"];
    const requestOption = {
      method: "PUT",
      headers: new Headers({
        "content-type": "application/json",
        Authorization:
          "Bearer 483be5e0b819044244f5d4fb818e38fe5c3fdb1a848ed0f39ea914e9aba39a0b"
      }),

      body: JSON.stringify(data)
    };
    fetch(`/api/public-api/todos/${data.id}`, requestOption)
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        this.getAllToDos();
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { allUsers } = this.state;
    return (
      <div  style={{height:"200px",overflow:"auto"}}>
        {allUsers.map((t, i) => (
          t.completed && <div className="completeCheckDiv" key={i}>
            <input
              style={{marginTop:"6px"}}
              type="checkbox"
              checked={t.completed}
            />
            <label style={{padding:"0 0 6px 5px", textDecoration: 'line-through'}} htmlFor={t.id}> {t.title}</label>
            <div className="undoIcon">
              <span class="fa fa-undo" onClick={()=>this.onCheckClick(t)}></span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Completed;
