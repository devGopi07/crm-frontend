import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Table from "react-bootstrap/Table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function Users() {
  const [users, setUsers] = useState([]);
  const [usernamee, setUsernamee] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [emaill, setEmaill] = useState("");
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function AddUser() {
    let newLead = {
      name: usernamee,
      password: passwordd,
      email: emaill,
    };
    let { name, password, email } = newLead;
    let payload = { name, password, email };
    console.log(payload);
    try {
      let res = await axios.post(`${url}/users/signUp`, payload);
      console.log(res);
      let newUser = res.data.user;
      console.log(newUser);
      toast.success(res.data.message);
      setUsers([...users, newUser]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function Delete(idx) {
    let alteredList = users.filter((val) => val._id === idx);

    let alterList = users.filter((val) => val._id !== idx);
    console.log("alteredList._id == ", alteredList[0]._id);
    let _id = alteredList[0]._id;
    console.log("Last", _id);
    try {
      let res = await axios.delete(`${url}/users/deleteUser/${_id}`);
      console.log(res);
      toast.success(res.data.message);
      setUsers(alterList);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  }
  async function getData() {
    try {
      let res = await axios.get(`${url}/users/getAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      toast.success(res.data.message);
      setUsers(res.data.user);
    } catch (error) {
      if (error.response.status > 399 || error.response.status < 500) {
        toast.error(error.response.data.message);
        logout();
      } else {
        toast.error(error.response.data.message);
      }
    }
  }

  let logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      if (error.response.status > 399 || error.response.status < 500) {
        toast.error("Session Expired Login Again");
        logout();
      }
    }
  }, []);
  return (
    <div>
      <Dashboard />
      <div>
        <div className="title-create">
          <h1 style={{ textAlign: "center", fontFamily: "Montserrat" }}>
            Welcome To Users
          </h1>

          <div>
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Create New User
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  onChange={(e) => setUsernamee(e.target.value)}
                />
              </MenuItem>

              <MenuItem>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmaill(e.target.value)}
                />
              </MenuItem>

              <MenuItem>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => setPasswordd(e.target.value)}
                />
              </MenuItem>

              <MenuItem
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: " stretch",
                }}
              >
                <Button
                  variant="contained"
                  style={{ textAlign: "center" }}
                  onClick={() => AddUser()}
                >
                  Submit
                </Button>
              </MenuItem>
            </StyledMenu>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{v.name}</td>
                  <td>{v.role}</td>
                  <td>{v.email}</td>
                  <td>{v.phone}</td>
                  <td style={{ display: "flex", justifyContent: " center" }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => Delete(v._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
