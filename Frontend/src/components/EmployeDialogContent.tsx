import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Employe } from '../types';

type DialogFormProps = {
  employe: Employe;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EmployeDialogContent({ employe, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>

      <Stack spacing={2} mt={1}>

      <TextField label="Numero" name="numEmploye"
value={employe.numEmploye} onChange={handleChange}/>

<TextField label="Prenom" name="prenom"
value={employe.prenom} onChange={handleChange}/>

<TextField label="Nom" name="nom"
value={employe.nom} onChange={handleChange}/>

<TextField label="Email" name="email"
value={employe.email} onChange={handleChange}/>

<TextField label="Adresse" name="adresse"
value={employe.adresse} onChange={handleChange}/>

<TextField label="Téléphone" name="telephone"
value={employe.telephone} onChange={handleChange}/>

<TextField label="Fonction" name="fonction"
value={employe.fonction} onChange={handleChange}/>

<TextField label="Salaire" name="salaire"
value={employe.salaire} onChange={handleChange}/>

</Stack>

      </DialogContent>  
    </>
  );
}
export default EmployeDialogContent;