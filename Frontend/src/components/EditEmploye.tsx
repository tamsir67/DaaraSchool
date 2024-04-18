import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import EmployeDialogContent from './EmployeDialogContent';
import { Employe, EmployeResponse, EmployeEntry } from '../types';
import { updateEmploye } from '../api/employeapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

type FormProps = {
  employedata: EmployeResponse;
}

function EditEmploye({ employedata }: FormProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [employe, setEmploye] = useState<Employe>({
    numEmploye: '',
    prenom: '',
    nom: '',
    email: '',
    adresse: '',
    telephone: '',
    fonction: '',
    salaire: '',
  });

  const { mutate } = useMutation(updateEmploye, {
    onSuccess: () => {
      queryClient.invalidateQueries(["employes"]);
    },
    onError: (err) => {
      console.error(err);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
    setEmploye({
      numEmploye: employedata.numEmploye,
      prenom: employedata.prenom,
      nom: employedata.nom,
      email: employedata.email,
      adresse: employedata.adresse,
      telephone: employedata.telephone,
      fonction: employedata.fonction,
      salaire: employedata.salaire,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    const url = employedata._links.self.href;
    const employeEntry: EmployeEntry = {employe, url}
    mutate(employeEntry);
    setEmploye({ numEmploye: '', prenom: '', nom: '', email: '', adresse: '', telephone: '', fonction: '', salaire: '' });    
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setEmploye({...employe, [event.target.name]: event.target.value});
  }

  return(
    <>
      <Tooltip title="Edit employe">
        <IconButton aria-label="edit" size="small"
          onClick={handleClickOpen}>
            <EditIcon fontSize= "small" />
        </IconButton>
        </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit employe</DialogTitle>
        <EmployeDialogContent employe={employe} handleChange={handleChange}/>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>    
    </>
  );
}

export default EditEmploye;