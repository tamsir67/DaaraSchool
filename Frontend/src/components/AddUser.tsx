import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser } from '../api/appuserapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import UserDialogContent from './UserDialogContent';
import { AppUser } from '../types';

function AddUser() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AppUser>({
    username: '',
    password: '',
    role: '',
  });

  const { mutate } = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });  

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };    
  
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    mutate(user);
    setUser({ username: '', password: '', role: ''});
    handleClose();
  }  

  return(
    <>
      <button onClick={handleClickOpen}>New User</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New User</DialogTitle>
          <UserDialogContent user={user} handleChange={handleChange} />
        <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddUser;