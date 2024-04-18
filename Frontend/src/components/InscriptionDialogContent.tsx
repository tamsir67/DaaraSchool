import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Inscription } from '../types';

type DialogFormProps = {
  inscription: Inscription;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InscriptionDialogContent({ inscription, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>

      <Stack spacing={2} mt={1}>

      <TextField label="Numero" name="numInscrit"
value={inscription.numInscrit} onChange={handleChange}/>

<TextField label="Prenom" name="prenom"
value={inscription.prenom} onChange={handleChange}/>

<TextField label="Nom" name="nom"
value={inscription.nom} onChange={handleChange}/>

<TextField label="Email" name="email"
value={inscription.email} onChange={handleChange}/>

<TextField label="Adresse" name="adresse"
value={inscription.adresse} onChange={handleChange}/>

<TextField label="Téléphone" name="telephone"
value={inscription.telephone} onChange={handleChange}/>

<TextField label="sexe" name="sexe"
value={inscription.sexe} onChange={handleChange}/>

<TextField label="Date Naissance" name="dateNaissance"
value={inscription.dateNaissance} onChange={handleChange}/>

<TextField label="Date Inscription" name="dateInscription"
value={inscription.dateInscription} onChange={handleChange}/>

<TextField label="Classe" name="classe"
value={inscription.classe} onChange={handleChange}/>

<TextField label="montantInscrit" name="montantInscrit"
value={inscription.montantInscrit} onChange={handleChange}/>

<TextField label="montantVerse" name="montantVerse"
value={inscription.montantVerse} onChange={handleChange}/>

</Stack>

      </DialogContent>  
    </>
  );
}
export default InscriptionDialogContent;