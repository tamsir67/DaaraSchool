import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { Matiere, MatiereResponse, MatiereEntry } from '../types';
import { updateMatiere } from '../api/matiereapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Tooltip from '@mui/material/Tooltip';
import MatiereDialogContent from './MatiereDialogContent';

type FormProps = {
  matieredata: MatiereResponse;
}

function EditMatiere({ matieredata }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [matiere, setMatiere] = useState<Matiere>({
    name: '',
    coefficient: '',
   
  });

  const { mutate } = useMutation(updateMatiere, {
    onSuccess: () => {
      queryClient.invalidateQueries(["matieres"]);
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
    setMatiere({
      name: matieredata.name,
      coefficient: matieredata.coefficient,
      
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const url = matieredata._links.self.href;
    const matiereEntry: MatiereEntry = {matiere, url}
    mutate(matiereEntry);
    setMatiere({ name: '', coefficient: ''});    
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setMatiere({...matiere, [event.target.name]: event.target.value});
  }

  return(
    <>
    <Tooltip title="Edit matiere">
        <IconButton aria-label="edit" size="small"
          onClick={handleClickOpen}>
            <EditIcon fontSize= "small" />
        </IconButton>
        </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit matiere</DialogTitle>
        <MatiereDialogContent matiere={matiere} handleChange={handleChange}/>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog> 
      </>
  );

  
}

export default EditMatiere;