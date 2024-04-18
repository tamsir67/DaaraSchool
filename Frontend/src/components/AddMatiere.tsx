import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMatiere } from '../api/matiereapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import MatiereDialogContent from './MatiereDialogContent';
import { Matiere } from '../types';

function AddMatiere() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [matiere, setMatiere] = useState<Matiere>({
    name: '',
    coefficient: '',
   
  });

  const { mutate } = useMutation(addMatiere, {
    onSuccess: () => {
      queryClient.invalidateQueries(["matieres"]);
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
    setMatiere({...matiere, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    mutate(matiere);
    setMatiere({ name: '', coefficient: '' });
    handleClose();
  }  

  return(
    <>
      <button onClick={handleClickOpen}>Ajout de Matieres</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Matiere</DialogTitle>
          <MatiereDialogContent matiere={matiere} handleChange={handleChange} />
        <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddMatiere;