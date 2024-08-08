import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const pages = ["Leads", "Contact"];
  const role=localStorage.getItem("role")  

  function logout(){
    localStorage.removeItem("token");
localStorage.removeItem("role")
    navigate("/login");
  }

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                flexGrow: 1,
              }}
              onClick={() => navigate("/dashboard")}
            >
              G.CRM
            </Typography>

            <Box sx={{ display: { md: "flex" } }}>
              
            {role==="admin" ? <Button
                sx={{ my: 1, color: "white", display: "block" }}
                onClick={() => navigate("/dashboard/users")}
              >
                Users
              </Button> :""}
              <Button
                sx={{ my: 1, color: "white", display: "block" }}
                onClick={() => navigate("/dashboard/leads")}
              >
                Leads
              </Button>
              <Button
                sx={{ my: 1, color: "white", display: "block" }}
                onClick={() => navigate("/dashboard/contacts")}
              >
                Contacts
              </Button>
              <Tooltip title="Logout">
                <IconButton sx={{ ml: 3, p: 0 }} onClick={()=>logout()}>
                  <LogoutIcon fontSize="medium" sx={{ color: "white " }} />{" "}
                  <p
                    style={{
                      color: "white",
                      fontFamily: "Roboto",
                      fontWeight: "500",
                      fontSize: "0.875rem",
                      margin: "0px 0px 0px 0px",
                      fontSize: "15px",
                    }}
                    
                  >
                    Logout
                  </p>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
    </div>
  );
}
