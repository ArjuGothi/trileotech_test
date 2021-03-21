import React, { Component } from "react";
import "./remaining.css";

class Remaining extends Component {
  state = {
    editVar: {},
    user: {},
    allUsers: []
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

  editIconClick = data => {
    this.setState({ editVar: data });
  };

  onBlurEdit = () => {
    const requestOption = {
      method: "PUT",
      headers: new Headers({
        "content-type": "application/json",
        Authorization:
          "Bearer 483be5e0b819044244f5d4fb818e38fe5c3fdb1a848ed0f39ea914e9aba39a0b"
      }),

      body: JSON.stringify(this.state.editVar)
    };
    fetch(`/api/public-api/todos/${this.state.editVar.id}`, requestOption)
      .then(response => response.json())
      .then(response => {
        this.getAllToDos();
        this.setState({ editVar: {} });
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onEditChange = e => {
    const editVar = { ...this.state.editVar };
    editVar["title"] = e;
    this.setState({ editVar });
  };

  deleteIconClick = id => {
    const requestOption = {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json",
        Authorization:
          "Bearer 483be5e0b819044244f5d4fb818e38fe5c3fdb1a848ed0f39ea914e9aba39a0b"
      })
    };
    fetch(
      `/api/public-api/todos/${id}`,
      requestOption
    )
      .then(response => response.json())
      .then(response => {
        //   console.log(response);
        this.getAllToDos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onCheckClick = data => {
    data["completed"] = !data["completed"];
    this.setState({ editVar: data }); 
    setTimeout(() => {
      this.onBlurEdit();
    }, 500);   
  };

  render() {
    const { allUsers, editVar } = this.state;
    return (
      <div  style={{height:"200px",overflow:"auto"}}>
        {allUsers.map(
          (t, i) =>
            t.completed === false && (
              <div className="chechDiv" key={i}>
                <input
                  style={{marginTop:"6px"}}
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => this.onCheckClick(t)}
                />
                {editVar.id === t.id ? (
                  <input
                    value={editVar.title}
                    onBlur={this.onBlurEdit}
                    onChange={e => this.onEditChange(e.target.value)}
                  ></input>
                ) : (
                  <label style={{padding:"0 0 6px 5px"}} htmlFor={t.id}> {t.title}</label>
                )}
                <div className="iconDiv">
                  <span
                    className="fa fa-pencil iconStyle"
                    onClick={() => this.editIconClick(t)}
                  ></span>
                  <span
                    className="fa fa-trash iconStyle"
                    onClick={() => this.deleteIconClick(t.id)}
                  ></span>
                </div>
              </div>
            )
        )}
      </div>
    );
  }
}

export default Remaining;
