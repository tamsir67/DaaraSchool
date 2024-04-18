import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { Professeur, ProfesseurResponse, ProfesseurEntry } from '../types';
import { updateProfesseur } from '../api/professeurapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Tooltip from '@mui/material/Tooltip';
import ProfesseurDialogContent from './ProfesseurDialogContent';

type FormProps = {
  professeurdata: ProfesseurResponse;
}

function EditProfesseur({ professeurdata }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [professeur, setProfesseur] = useState<Professeur>({
    prenom: '',
    nom: '',
    email: '',
    adresse: '',
    telephone: ''
  });

  const { mutate } = useMutation(updateProfesseur, {
    onSuccess: () => {
      queryClient.invalidateQueries(["professeurs"]);
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
    setProfesseur({
      prenom: professeurdata.prenom,
      nom: professeurdata.nom,
      email: professeurdata.email,
      adresse: professeurdata.adresse,
      telephone: professeurdata.telephone
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const url = professeurdata._links.self.href;
    const professeurEntry: ProfesseurEntry = {professeur, url}
    mutate(professeurEntry);
    setProfesseur({ prenom: '', nom: '', email: '', adresse: '', telephone: '' });    
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setProfesseur({...professeur, [event.target.name]: event.target.value});
  }

  return(
    <>
    <Tooltip title="Edit professeur">
        <IconButton aria-label="edit" size="small"
          onClick={handleClickOpen}>
            <EditIcon fontSize= "small" />
        </IconButton>
        </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit professeur</DialogTitle>
        <ProfesseurDialogContent professeur={professeur} handleChange={handleChange}/>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog> 
      </>
  );

  
}

export default EditProfesseur;