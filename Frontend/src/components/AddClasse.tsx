import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addClasse } from '../api/classapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ClasseDialogContent from './ClasseDialogContent';
import { Classe } from '../types';

function AddClasse() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [classe, setClasse] = useState<Classe>({
    name: '',   
  });

  const { mutate } = useMutation(addClasse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
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
    setClasse({...classe, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    mutate(classe);
    setClasse({ name: ''});
    handleClose();
  }  

  return(
    <>
      <button onClick={handleClickOpen}>Nouvelle Classe</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Classe</DialogTitle>
          <ClasseDialogContent classe={classe} handleChange={handleChange} />
        <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddClasse;