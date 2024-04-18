import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProfesseur } from '../api/professeurapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ProfesseurDialogContent from './ProfesseurDialogContent';
import { Professeur } from '../types';

function AddProfesseur() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [professeur, setProfesseur] = useState<Professeur>({
    prenom: '',
    nom: '',
    email: '',
    adresse: '',
    telephone:'',
  });

  const { mutate } = useMutation(addProfesseur, {
    onSuccess: () => {
      queryClient.invalidateQueries(["professeurs"]);
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
    setProfesseur({...professeur, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    mutate(professeur);
    setProfesseur({ prenom: '', nom: '', email: '', adresse: '', telephone: '' });
    handleClose();
  }  

  return(
    <>
      <button onClick={handleClickOpen}>Nouveau Professeur</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Professeur</DialogTitle>
          <ProfesseurDialogContent professeur={professeur} handleChange={handleChange} />
        <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddProfesseur;