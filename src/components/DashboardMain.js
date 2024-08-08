import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../App";

export default function DashboardMain() {
  const [leads, setLeads] = useState([]);
  const [contacts, setContacts] = useState([]);

  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    navigate("/");
  }

  async function getData() {
    let res = await axios.get(`${url}/leads/getAllLeads`);
    setLeads(res.data.leads);
    toast.success(res.data.message);

    let res1 = await axios.get(`${url}/contacts/getAllContacts`);
    setContacts(res1.data.contacts);
    toast.success(res1.data.message);
  }
  useEffect(() => {
    if (token) {
      getData();
    } else {
      toast.error("Token Has been Expired Login Again");
      logout();
    }
  }, []);
  return (
    <div>
      <Dashboard />
      <div>
        <div className="dashboard-body">
          <h2 style={{ textAlign: "center" }}>Welcome to Dashboard</h2>
          <div className="container-fluid">
            <div className="row">
              <div className="dashboard-maincard col-sm-12 col-md-12 col-xl-5 shadow-lg bg-white rounded">
                <h4>Leads</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Lead Name</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td>{v.leadName}</td>
                          <td>{v.company}</td>
                          <td>{v.email}</td>
                          <td>{v.phone}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              <div className="dashboard-maincard col-sm-12 col-md-12 col-xl-6 shadow-lg bg-white rounded">
                <h4>Contacts</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Contact Name</th>
                      <th>Account Name</th>
                      <th>Email</th>
                      <th>Phone</th>
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
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
