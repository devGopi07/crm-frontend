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

export default function Leads() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const [contactname, setContactname] = useState("");
  const [company, setCompany] = useState("");
  const [emaill, setEmaill] = useState("");
  const [phonee, setPhonee] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function AddContact() {
    let newLead = {
      contactName: contactname,
      accountName: company,
      email: emaill,
      phone: phonee,
    };
    let { contactName, accountName, email, phone } = newLead;
    let payload = { contactName, accountName, email, phone };
    try {
      let res = await axios.post(`${url}/contacts/createContact`, payload);
      console.log(res);
      let newUser = res.data.contact;
      console.log(newUser);
      toast.success(res.data.message);
      setContacts([...contacts, newUser]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function Delete(idx) {
    let alteredList = contacts.filter((val) => val._id === idx);
    let alterList = contacts.filter((val) => val._id !== idx);
    console.log("alteredList == ", alteredList);
    console.log("alteredList._id == ", alteredList[0]._id);
    let _id = alteredList[0]._id;
    console.log("Last", _id);
    try {
      let res = await axios.delete(`${url}/contacts/deleteContact/${_id}`);
      console.log(res);
      toast.success(res.data.message);
      setContacts(alterList);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function getData() {
    let res = await axios.get(`${url}/contacts/getAllContacts`);
    console.log(res);
    setContacts(res.data.contacts);
    toast.success(res.data.message);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Dashboard />
      <div>
        <div className="title-create">
          <h1 style={{ textAlign: "center", fontFamily: "Montserrat" }}>
            Welcome To Contacts
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
              Create New Contact
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
                  label="Contact Name"
                  variant="outlined"
                  onChange={(e) => setContactname(e.target.value)}
                />
              </MenuItem>

              <MenuItem>
                <TextField
                  id="outlined-basic"
                  label="Account Name"
                  variant="outlined"
                  onChange={(e) => setCompany(e.target.value)}
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
                  label="Phone"
                  variant="outlined"
                  onChange={(e) => setPhonee(e.target.value)}
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
                  onClick={() => AddContact()}
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
              <th>Contact Name</th>
              <th>Account Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{v.contactName}</td>
                  <td>{v.accountName}</td>
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
