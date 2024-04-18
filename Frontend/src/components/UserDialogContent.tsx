import DialogContent from '@mui/material/DialogContent';
import { AppUser } from '../types';

type DialogFormProps = {
  user: AppUser;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UserDialogContent({ user, handleChange }: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <input placeholder="Username" name="username"
          value={user.username} onChange={handleChange}/><br/>

        <input placeholder="Password" name="password"
          value={user.password} onChange={handleChange}/><br/>

        <input placeholder="Role" name="role"
          value={user.role} onChange={handleChange}/><br/>

      </DialogContent>  
    </>
  );
}
export default UserDialogContent;