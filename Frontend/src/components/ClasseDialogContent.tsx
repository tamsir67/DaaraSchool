import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Classe } from '../types';

type DialogFormProps = {
  classe: Classe;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function ClasseDialogContent({ classe, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>

      <Stack spacing={2} mt={1}>

<TextField label="name" name="name"
value={classe.name} onChange={handleChange}/>

</Stack>

      </DialogContent>  
    </>
  );
}
export default ClasseDialogContent;