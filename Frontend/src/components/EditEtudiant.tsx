import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateEtudiant } from '../api/etudiantapi';
import { Etudiant, EtudiantEntry, EtudiantResponse } from '../types';
import EtudiantDialogContent from './EtudiantDialogContent';

type FormProps = {
  etudiantdata: EtudiantResponse;
}

function EditEtudiant({ etudiantdata }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [etudiant, setEtudiant] = useState<Etudiant>({
    numEtudiant: '',
    prenom: '',
    nom: '',
    email: '',
    adresse: '',
    telephone: ''
  });

  const { mutate } = useMutation(updateEtudiant, {
    onSuccess: () => {
      queryClient.invalidateQueries(["etudiants"]);
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
    setEtudiant({
      numEtudiant: etudiantdata.numEtudiant,
      prenom: etudiantdata.prenom,
      nom: etudiantdata.nom,
      email: etudiantdata.email,
      adresse: etudiantdata.adresse,
      telephone: etudiantdata.telephone
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const url = etudiantdata._links.self.href;
    const etudiantEntry: EtudiantEntry = {etudiant, url}
    mutate(etudiantEntry);
    setEtudiant({ numEtudiant: '', prenom: '', nom: '', email: '', adresse: '', telephone: '' });    
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setEtudiant({...etudiant, [event.target.name]: event.target.value});
  }

  return(
    <>
      <Tooltip title="Edit étudiant">
        <IconButton aria-label="edit" size="small"
          onClick={handleClickOpen}>
            <EditIcon fontSize= "small" />
        </IconButton>
        </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit étudiant</DialogTitle>
        <EtudiantDialogContent etudiant={etudiant} handleChange={handleChange}/>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>    
    </>
  );
}

export default EditEtudiant;