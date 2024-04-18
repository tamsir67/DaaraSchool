import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClasses, deleteClasse } from '../api/classapi';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddClasse from './AddClasse';
import EditClasse from './EditClasse';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Classelist() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["classes"],
    queryFn: getClasses
  });

  const { mutate } = useMutation(deleteClasse, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
    onError: (err) => {
      console.error(err);
    },
  }); 

  const columns: GridColDef[] = [
    {field: 'name', headerName: 'Nom Classe', width: 200},    
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditClasse classedata={params.row} />
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
          if (window.confirm(`Etes vous sûr de vouloir supprimer ?  ${params.row.name} ?`)) {
            mutate(params.row._links.classe.href);
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
    return <span>Error when fetching classes...</span>
  }
  else if (isSuccess) {
    return (
      <>
        <h2>Liste des Classes</h2>
        <AddClasse /><br />
        
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
          message="Classe deleted" />
        </>
    );
  }
}

export default Classelist;
