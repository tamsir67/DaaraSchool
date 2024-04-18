import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import UserDialogContent from './UserDialogContent';
import { AppUser, AppUserResponse, AppUserEntry } from '../types';
import { updateUser } from '../api/appuserapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type FormProps = {
  userdata: AppUserResponse;
}

function EditUser({ userdata }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AppUser>({
    username: '',
    password: '',
    role: '',
  });

  const { mutate } = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
    setUser({
      username: userdata.username,
      password: userdata.password,
      role: userdata.role,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const url = userdata._links.self.href;
    const userEntry: AppUserEntry = {user, url}
    mutate(userEntry);
    setUser({ username: '', password: '', role: '' });    
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  return(
    <>
      <button onClick={handleClickOpen}>
        Edit
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <UserDialogContent user={user} handleChange={handleChange}/>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>    
    </>
  );
}

export default EditUser;