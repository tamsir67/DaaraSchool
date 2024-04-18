import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Matiere } from '../types';

type DialogFormProps = {
  matiere: Matiere;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function MatiereDialogContent({ matiere, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>

      <Stack spacing={2} mt={1}>

<TextField label="name" name="name"
value={matiere.name} onChange={handleChange}/>

<TextField label="coefficient" name="coefficient"
value={matiere.coefficient} onChange={handleChange}/>


</Stack>

      </DialogContent>  
    </>
  );
}
export default MatiereDialogContent;