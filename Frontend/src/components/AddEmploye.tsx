import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEmploye } from '../api/employeapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import EmployeDialogContent from './EmployeDialogContent';
import { Employe } from '../types';

function AddEmploye() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [employe, setEmploye] = useState<Employe>({
    numEmploye: '',
    prenom: '',
    nom: '',
    email: '',
    adresse: '',
    telephone:'',
    fonction: '',
    salaire: '',
  });

  const { mutate } = useMutation(addEmploye, {
    onSuccess: () => {
      queryClient.invalidateQueries(["employes"]);
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
    setEmploye({...employe, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    mutate(employe);
    setEmploye({ numEmploye: '' , prenom: '', nom: '', email: '', adresse: '', telephone: '', fonction: '', salaire: '' });
    handleClose();
  }  

  return(
    <>
      <button onClick={handleClickOpen}>Nouveau Employé</button><br></br>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nouveau Employé</DialogTitle>
          <EmployeDialogContent employe={employe} handleChange={handleChange} />
        <DialogActions>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddEmploye;