import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import Fab from "@mui/material/Fab";
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineKey,
  AiOutlineDatabase,
} from "react-icons/ai";
import RegisterChangePassword from "./ChangePassword";
import RegisterDialog from "./RegisterDialog";
import { NavLink } from "react-router-dom";

export default function LoginBtn({
  email,
  setEmail,
  password,
  setPassword,
  setOpen,
  open,
  loggedIn,
  setLoggedIn,
}) {
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [openRegisterdDialog, setOpenRegisterDialog] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setLoggedIn(true);
      setEmail(storedEmail);
    }
  }, [setEmail, setLoggedIn]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission

    axios
      .post(
        // "http://127.0.0.1:5000/login",
        "https://yoglabs.pythonanywhere.com/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        handleMenuClose();
        setOpenChangePasswordDialog(false);
        // console.log(response);
        // Assuming the server returns a success status
        const cookies = response.headers["Set-Cookie"];
        // console.log(cookies + "This is cookies!");
        setLoggedIn(true);
        setOpen(false);

        if (cookies) {
          sessionStorage.setItem("cookie", cookies);
          // console.log("Login cookie set");
        }
        sessionStorage.setItem("email", email); // Store email in session storage
        // Redirect to "/dataAnalysis" page
        window.location.href = "/dataAnalysis";
      })
      .catch((error) => {
        window.alert(error.response.data);

        // console.error("Login failed:", error.response);
        if (error.response.status === 401) {
          setError("Wrong Credential. Please try again.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });

    // handleClose();
  };

  const handleLogout = () => {
    axios
      .get("https://yoglabs.pythonanywhere.com/logout", {
        withCredentials: true,
      })
      .then((response) => {
        // Assuming the server returns a success status
        if (response.status === 200) {
          // Clear login status and remove email from session storage
          setLoggedIn(false);
          setOpen(false);
          sessionStorage.removeItem("email");
          // console.log("Logout successful");
        }
      })
      .catch((error) => {
        window.alert(error.response.data);

        // console.error("Logout failed:", error);
      });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenChangePasswordDialog(false);
  };

  const handlePasswordChange = () => {
    // setAnchorEl(null);
    // setOpenChangePasswordDialog(false);
    // console.log(openChangePasswordDialog);
    handleMenuClose();
    setOpenChangePasswordDialog(true);
    // console.log("hello here o s,");
    // console.log(openChangePasswordDialog);
  };

  const handleRegisteruser = () => {
    // setAnchorEl(null);
    // setOpenChangePasswordDialog(false);
    // console.log(openChangePasswordDialog);
    handleMenuClose();
    setOpenRegisterDialog(true);
    // console.log("hello here o s,");
    // console.log(openChangePasswordDialog);
  };

  if (loggedIn) {
    return (
      <div>
        <Fab variant="extended" onClick={handleMenuOpen}>
          <AiOutlineLogin className="svg-login-icon" sx={{ mr: 1 }} />
          <p className="login-name">{email}</p>
        </Fab>
        <Menu
          sx={{
            position: "fixed",
            top: "1.1rem",
            left: "3rem",
            zIndex: 9999,
          }}
          id="login-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <AiOutlineDatabase sx={{ mr: 1 }} />
            <NavLink to="/upload">Upload Files </NavLink>
          </MenuItem>

          <MenuItem onClick={handleRegisteruser}>
            <AiOutlineKey sx={{ mr: 1 }} />
            Register Users
          </MenuItem>
          <MenuItem onClick={handlePasswordChange}>
            <AiOutlineKey sx={{ mr: 1, backgroundColor: "black" }} />
            Change Password
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <AiOutlineLogout sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
        {openChangePasswordDialog && (
          <RegisterChangePassword
            setOpenChangePasswordDialog={setOpenChangePasswordDialog}
          />
        )}
        {openRegisterdDialog && (
          <RegisterDialog setOpenChangePasswordDialog={setOpenRegisterDialog} />
        )}
      </div>
    );
  }

  return (
    <div>
      <Fab variant="extended" onClick={handleOpen}>
        <AiOutlineLogin className="svg-login-icon" sx={{ mr: 1 }} />
        <p className="login-name">Login</p>
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "350px",
            backgroundColor: "floralwhite",
            color: "black",
          },
          "& .MuiDialogContentText-root": {
            display: "flex",
            color: "black",
            flexDirection: "column",
          },
          "& .MuiTextField-root": {
            color: "black",
            width: "90%",
            fontSize: "2rem",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Login To View Analysis
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <br />
              <TextField
                id="email-input"
                label="Email"
                variant="outlined"
                sx={{ color: "black", fontSize: "2.5rem" }} // Adjust the font size here
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
              <br />
              <br />
              <TextField
                id="password-input"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" // Add the autocomplete attribute
              />

              <br />
              <br />
              <Button type="submit" variant="contained" autoFocus>
                Login
              </Button>
            </form>
          </DialogContentText>
          <br />
          <DialogContentText>
            {/* <Link href="/forgot-password">Forgot password?</Link> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "black", fontSize: "1.1rem" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
