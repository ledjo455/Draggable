import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminForm({item, setState, state}) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState(item.title);
  const [caption, setCaption] = useState(item.caption);
  const savedData = JSON.parse(localStorage.getItem("savedData"));
  const [formData, setFormData] = useState(state)

  const handleClickOpen = () => {
    setOpen(true);
    console.log(item);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const handleSaveChanges = (id) => {
      console.log("title ", title, "caption ", caption);
      const edit = state.map(el => (el.id === id ? {...el, caption, title } : el))
      console.log("splice",edit);
      setState(edit);
    localStorage.setItem("savedData", JSON.stringify(edit));
    handleClose()
    }

  const handleDelete = (id) => {
    handleClose()
   const edit= state.filter(el => el.id !== id)
    setState(edit)
    localStorage.setItem("savedData", JSON.stringify(edit));

}
  return (
    <div style={adminFormStyle}>
      <Button className="editBtn"  variant="contained" onClick={handleClickOpen}>
      EDIT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Manage Events</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="ID"
            type="text"
            fullWidth
            variant="standard"
            value={item.id}
          />
           <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={e => {setTitle(e.target.value)}}

          />
           <TextField
            autoFocus
            margin="dense"
            id="caption"
            label="Caption"
            type="email"
            fullWidth
            variant="standard"
            value={caption}
            onChange={e => setCaption(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSaveChanges(item.id)}>Save Changes</Button>
          <Button onClick={() => handleDelete(item.id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const adminFormStyle = {
    display: 'inline',
   

}