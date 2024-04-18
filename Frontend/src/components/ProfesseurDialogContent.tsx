import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Professeur } from '../types';

type DialogFormProps = {
  professeur: Professeur;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ProfesseurDialogContent({ professeur, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>

      <Stack spacing={2} mt={1}>

<TextField label="Prenom" name="prenom"
value={professeur.prenom} onChange={handleChange}/>

<TextField label="Nom" name="nom"
value={professeur.nom} onChange={handleChange}/>

<TextField label="Email" name="email"
value={professeur.email} onChange={handleChange}/>

<TextField label="Adresse" name="adresse"
value={professeur.adresse} onChange={handleChange}/>

<TextField label="Téléphone" name="telephone"
value={professeur.telephone} onChange={handleChange}/>

</Stack>

      </DialogContent>  
    </>
  );
}
export default ProfesseurDialogContent;