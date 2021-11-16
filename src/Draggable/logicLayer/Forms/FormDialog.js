import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getRandomOptionPhoto } from '../../dataLayer/newAdditions/RandomData.js';
import { Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { withAlert } from 'react-alert'

export default function FormDialog({setData, data}) {
  const lastElementinArray = data[data.length-1]
  console.log("This is Last", lastElementinArray);
  const [modalData, setModalData] = useState({id: "", src:"", title: "", caption:"",})
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [increment, setIncrement] = useState(lastElementinArray.id + 1 );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
  };

 const addModalData = (passedData) => {
      setData((prev) => [...prev, passedData])
  }

  const handleSave = () => {
    if (title && caption){
    setIncrement(increment+1);
    addModalData({id: increment, src: getRandomOptionPhoto(),
     title: title, caption: caption});
    console.log(modalData);
    console.log("data", data);
    setTitle("");
    setCaption("");
    setOpen(false);

     }
     else {
      alert("You cannot submit empty fields!")
     }
  }
  useEffect(() => {
    console.log("title", title);
    console.log("caption", caption);
  },[title])
  

  return (
    <div>
      <button className="addBtn"  onClick={handleClickOpen}>
      ✡︎Add New Data✡︎
      </button>
     
      <Dialog className="dialog" open={open} onClose={handleClose}>
        <DialogTitle className="dialog">Add an Event ✡︎</DialogTitle>
        <DialogContent className="dialog">
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="title"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => setTitle(e.target.value)}
          /> 
          <TextField
          autoFocus
          margin="dense"
          id="caption"
          label="caption"
          type="text"
          fullWidth
          variant="standard"
          onChange={e => setCaption(e.target.value)}
        />
        </DialogContent>
        <DialogActions className="dialog">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}