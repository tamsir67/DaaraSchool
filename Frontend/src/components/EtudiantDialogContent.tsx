import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Etudiant } from '../types';

type DialogFormProps = {
  etudiant: Etudiant;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function EtudiantDialogContent({ etudiant, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>

      <Stack spacing={2} mt={1}>

      <TextField label="Numero" name="numEtudiant"
value={etudiant.numEtudiant} onChange={handleChange}/>

<TextField label="Prenom" name="prenom"
value={etudiant.prenom} onChange={handleChange}/>

<TextField label="Nom" name="nom"
value={etudiant.nom} onChange={handleChange}/>

<TextField label="Email" name="email"
value={etudiant.email} onChange={handleChange}/>

<TextField label="Adresse" name="adresse"
value={etudiant.adresse} onChange={handleChange}/>

<TextField label="Téléphone" name="telephone"
value={etudiant.telephone} onChange={handleChange}/>

</Stack>

      </DialogContent>  
    </>
  );
}
export default EtudiantDialogContent;