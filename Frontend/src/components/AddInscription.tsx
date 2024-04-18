import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addInscription } from '../api/inscriptionapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import InscriptionDialogContent from './InscriptionDialogContent';
import { Inscription } from '../types';

function AddInscription() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [inscription, setInscription] = useState<Inscription>({

    numInscrit: '',
    prenom: '',
    nom: '',
    email: '',
    adresse: '',
    telephone:'',
    sexe: '',
    classe: '',
    dateNaissance: new Date(),
    dateInscription: new Date(),
    montantInscrit: 0,
    montantVerse: 0,

  });

  const { mutate } = useMutation(addInscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(["inscriptions"]);
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
    setInscription({...inscription, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    mutate(inscription);
    setInscription({ numInscrit: '', prenom: '', nom: '', email: '', adresse: '', telephone: '', sexe: '', dateNaissance: new Date(), classe: '' , dateInscription: new Date(), montantInscrit: 0, montantVerse: 0});
    handleClose();
  }  

  return(
    <>
      <button onClick={handleClickOpen}>Nouvelle Inscription</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Inscription</DialogTitle>
          <InscriptionDialogContent inscription={inscription} handleChange={handleChange} />
        <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddInscription;