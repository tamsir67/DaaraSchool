import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEtudiant } from '../api/etudiantapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import EtudiantDialogContent from './EtudiantDialogContent';
import { Etudiant } from '../types';

function AddEtudiant() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [etudiant, setEtudiant] = useState<Etudiant>({
    numEtudiant: '',
    prenom: '',
    nom: '',
    email: '',
    adresse: '',
    telephone:'',
  });

  const { mutate } = useMutation(addEtudiant, {
    onSuccess: () => {
      queryClient.invalidateQueries(["etudiants"]);
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
    setEtudiant({...etudiant, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    mutate(etudiant);
    setEtudiant({ numEtudiant: '', prenom: '', nom: '', email: '', adresse: '', telephone: '' });
    handleClose();
  }  

  return(
    <>
      <button onClick={handleClickOpen}>Nouveau Etudiant</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Etudiant</DialogTitle>
          <EtudiantDialogContent etudiant={etudiant} handleChange={handleChange} />
        <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddEtudiant;