import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import json from "./companies.json";
import { MenuItem } from "@mui/material";
export default function Filter({ filterModal, setFilterModal }) {
  const [open, setOpen] = useState(false);
  const company_name = useRef(null);
  const firstName = useRef(null);
  const [company, setCompanyName] = useState(null);
  const [first_name, setFirst] = useState(null);

  const [jsonData, setJsonData] = useState(json);
  const company_names = [
    "Central Scaffold",
    "GROGAN REALTY LLC",
    "424 FIFTH AVENUE",
  ];
  const first_names = [
    "DAVID",
    "JEFF",
    "Eduard",
    "James",
    "Lyn",
    "Ghef",
    "Ledjo",
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCompanyChange = (event) => {
    setCompanyName(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirst(event.target.value);
  };
  const handleFilter = () => {
    console.log("first name", first_name);
    setFilterModal(first_name);
    // setFilterModal(company);
  };

  //   useEffect(() => {
  //     let rowData = [];
  //     jsonData.map((node) => rowData.push(node));
  //     const distinct_names = rowData.map((element) => element.company);
  //     console.log("distinct names", distinct_names);
  //     const unique = Array.from(new Set(distinct_names));
  //     console.log("unique: ", unique);
  //     // setUnique(unique);
  //   }, [setFilterModal]);
  return (
    <div>
      <Button style={styles} onClick={handleClickOpen}>
        Filter
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Filter Table Data"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Select options below to filter data according to your desired
            parameters and press okay to display.
          </DialogContentText>

          {/* <Select
            value={company}
            label="Company Name"
            onChange={handleCompanyChange}
            inputRef={company_name}
            style={{ marginLeft: "220px" }}
          >
            {company_names?.map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select> */}
          <Select
            value={first_name}
            label="First Name"
            onChange={handleFirstNameChange}
            inputRef={firstName}
            style={{ marginLeft: "20px" }}
          >
            {first_names?.map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilter}>Filter</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const styles = {
  marginTop: "20px",
};
