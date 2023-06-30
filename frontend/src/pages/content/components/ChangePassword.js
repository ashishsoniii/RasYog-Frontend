import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

function RegisterChangePassword(props) {
  const [open, setOpen] = useState(true);
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");

  const handleClose = () => {
    setOpen(false);
    props.setOpenChangePasswordDialog(false);
  };

  const handleChangePassword = () => {
    axios
      .post(
        "http://127.0.0.1:5000/ChangePassword",
        {
          oldpassword,
          newpassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // Assuming the server returns a success status
        window.alert("Password has been changed successfully!");
        handleClose(); // Close the dialog after handling password change
      })
      .catch((error) => {
        window.alert(error.response.data);

        // console.error("Password change failed:", error.response);
        // Handle the error accordingly
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          id="old-password-input"
          label="Old Password"
          variant="outlined"
          type="password"
          value={oldpassword}
          onChange={(e) => setOldpassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="new-password-input"
          label="New Password"
          variant="outlined"
          type="password"
          value={newpassword}
          onChange={(e) => setNewpassword(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleChangePassword}
          color="primary"
        >
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterChangePassword;
