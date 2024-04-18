import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateInscription } from '../api/inscriptionapi';
import { Inscription, InscriptionEntry, InscriptionResponse } from '../types';
import InscriptionDialogContent from './InscriptionDialogContent';

type FormProps = {
  inscriptiondata:InscriptionResponse;
}

function EditInscription({ inscriptiondata }: FormProps) {
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

  const { mutate } = useMutation(updateInscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(["inscriptions"]);
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
    setInscription({
      numInscrit: inscriptiondata.numInscrit,
      prenom: inscriptiondata.prenom,
      nom: inscriptiondata.nom,
      email: inscriptiondata.email,
      adresse: inscriptiondata.adresse,
      telephone: inscriptiondata.telephone,
      sexe: inscriptiondata.sexe,
      dateNaissance: inscriptiondata.dateNaissance,
      dateInscription: inscriptiondata.dateInscription,
      classe: inscriptiondata.classe,
      montantInscrit: inscriptiondata.montantInscrit,
      montantVerse: inscriptiondata.montantVerse,

    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const url = inscriptiondata._links.self.href;
    const inscriptionEntry: InscriptionEntry = {inscription, url}
    mutate(inscriptionEntry)
    setInscription({ numInscrit: '', prenom: '', nom: '', email: '', adresse: '', telephone: '',sexe: '', dateNaissance: new Date(), dateInscription: new Date(), classe: '', montantInscrit: 0, montantVerse: 0 });    
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setInscription({...inscription, [event.target.name]: event.target.value});
  }

  return(
    <>
      <Tooltip title="Edit Inscription">
        <IconButton aria-label="edit" size="small"
          onClick={handleClickOpen}>
            <EditIcon fontSize= "small" />
        </IconButton>
        </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit inscription</DialogTitle>
        <InscriptionDialogContent inscription={inscription} handleChange={handleChange}/>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>    
    </>
  );
}

export default EditInscription;