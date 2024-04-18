import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { Classe, ClasseResponse, ClasseEntry } from '../types';
import { updateClasse } from '../api/classapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Tooltip from '@mui/material/Tooltip';
import ClasseDialogContent from './ClasseDialogContent';

type FormProps = {
  classedata: ClasseResponse;
}

function EditClasse({ classedata }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [classe, setClasse] = useState<Classe>({
    name: '',   
  });

  const { mutate } = useMutation(updateClasse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
    setClasse({
      name: classedata.name,      
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const url = classedata._links.self.href;
    const classeEntry: ClasseEntry = {classe, url}
    mutate(classeEntry);
    setClasse({ name: ''});    
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setClasse({...classe, [event.target.name]: event.target.value});
  }

  return(
    <>
    <Tooltip title="Edit Classe">
        <IconButton aria-label="edit" size="small"
          onClick={handleClickOpen}>
            <EditIcon fontSize= "small" />
        </IconButton>
        </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit classe</DialogTitle>
        <ClasseDialogContent classe={classe} handleChange={handleChange}/>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog> 
      </>
  );

  
}

export default EditClasse;