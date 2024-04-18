import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteUser, getUsers } from '../api/appuserapi';
import AddUser from './AddUser';
import EditUser from './EditUser';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type UserlistProps = {
  logOut?: () => void;
 }

function Userlist({ logOut }: UserlistProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      console.error(err);
    },
  }); 

  const columns: GridColDef[] = [
    {field: 'username', headerName: 'Username', width: 200},
    {field: 'password', headerName: 'Password', width: 200},
    {field: 'role', headerName: 'Role', width: 200},
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditUser userdata={params.row} />
    },
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton aria-label="delete" size="small" onClick={() => {
            if (window.confirm(`Etes vous sûr de vouloir supprimer ? ${params.row.username} ?`)) {
              mutate(params.row._links.inscription.href);
            } 
          }}       
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ]; 

  if (isLoading) {
    return <span>Loading...</span>
  }
  else if (isError) {
    return <span>Error when fetching inscriptions...</span>
  }
  else if (isSuccess) {
    return (
      <>
        <Stack direction="row" alignItems="center"
            justifyContent="space-between">
            <AddUser />
            <Button onClick={logOut}>Log out</Button>
        </Stack>
        <h2>Liste des USers</h2>
        <AddUser /><br />
        
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={row => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="User supprimee" />
        </>
    );
  }
}

export default Userlist;
