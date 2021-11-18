import React, { useState, useEffect, useRef } from "react";
import "./Aggrid.css";
import AggridTable from "./AggridTable";
import companydata from "./companies.json";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function Aggrid() {
  const [statusInstances, setStatusInstances] = useState(
    calculateStatusTotal()
  );
  const [calculateStatusCall, setCalcStatusCall] = useState(false);
  // for modal
  const [open, setOpen] = React.useState(false);
  const company_name = useRef(null);
  const first_name = useRef(null);
  const last_name = useRef(null);
  const phone = useRef(null);
  const status = useRef(null);
  const [formObject, setFormObject] = useState(null);

  useEffect(() => {
    console.log(formObject);
  }, [formObject]);

  const handleSave = () => {
    setFormObject({
      id: 99889,
      company: company_name.current.value,
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      phone: phone.current.value,
      status: status.current.value,
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [statusSelect, setStatusSelect] = React.useState("");

  const handleChange = (event) => {
    setStatusSelect(event.target.value);
  };
  //

  const [passedStatus, setPassedStatus] = useState(null);
  const [statusTest, setStatusTest] = useState([
    { status: "converted", color: "#9C89B8", sum: statusInstances.converted },
    { status: "new", color: "#49516F", sum: statusInstances.new },
    {
      status: "unqualified",
      color: "#FBC14B",
      sum: statusInstances.unqualified,
    },
    { status: "in process", color: "pink", sum: statusInstances.in_process },
    { status: "needs review", color: "red", sum: statusInstances.needs_review },
  ]);

  function calculateStatusTotal() {
    const news = companydata.filter((element) => element.status == "new");
    const converted = companydata.filter(
      (element) => element.status == "converted"
    );
    const unqualified = companydata.filter(
      (element) => element.status == "unqualified"
    );
    const process = companydata.filter(
      (element) => element.status == "in process"
    );
    const needs_review = companydata.filter(
      (element) => element.status == "needs review"
    );

    return {
      new: news.length,
      converted: converted.length,
      unqualified: unqualified.length,
      in_process: process.length,
      needs_review: needs_review.length,
    };
  }
  useEffect(() => {
    if (statusInstances != null) {
      calculateStatusTotal();
      console.log(statusInstances);
    }
  }, [setCalcStatusCall]);

  return (
    <div className="aggrid__container">
      <div className="aggrid__header">
        {statusTest.map((element) => (
          <div>
            {" "}
            <button
              className="aggrid__header__status"
              onClick={() => setPassedStatus(element.status)}
              style={{ backgroundColor: element.color }}
            >
              <h1>{element.sum}</h1>
              <p>{element.status}</p>
            </button>
          </div>
        ))}
      </div>

      <div className="aggrid__table">
        <AggridTable
          passedStatus={passedStatus}
          setPassedStatus={setPassedStatus}
          formObject={formObject}
          setCalcStatusCall={setCalcStatusCall}
        />
        <div className="modal">
          <Button onClick={handleClickOpen} className="ButtonModal">
            ADD New Company
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Jobsites</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add new Companies and New Jobsites, simply fill out the form
                below:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="company_name"
                label="Company Name"
                type="text"
                fullWidth
                variant="standard"
                inputRef={company_name}
              />
              <TextField
                autoFocus
                margin="dense"
                id="first_name"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
                inputRef={first_name}
              />
              <TextField
                autoFocus
                margin="dense"
                id="last_name"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                inputRef={last_name}
              />
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone"
                type="text"
                fullWidth
                variant="standard"
                inputRef={phone}
              />
              <br />
              <br />
              <InputLabel id="status_select__label">Status</InputLabel>
              <br />
              <Select
                value={statusSelect}
                label="Status"
                onChange={handleChange}
                inputRef={status}
                style={{ marginLeft: "220px" }}
              >
                <MenuItem value={"converted"}>Converted</MenuItem>
                <MenuItem value={"new"}>New</MenuItem>
                <MenuItem value={"unqualified"}>Unqualified</MenuItem>
                <MenuItem value={"in process"}>In Process</MenuItem>
                <MenuItem value={"needs review"}>Needs Review</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Aggrid;
