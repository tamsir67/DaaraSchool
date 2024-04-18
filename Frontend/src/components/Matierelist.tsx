import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMatieres, deleteMatiere } from '../api/matiereapi';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddMatiere from './AddMatiere';
import EditMatiere from './EditMatiere';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Matierelist() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["matieres"],
    queryFn: getMatieres
  });

  const { mutate } = useMutation(deleteMatiere, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['matieres'] });
    },
    onError: (err) => {
      console.error(err);
    },
  }); 

  const columns: GridColDef[] = [
    {field: 'name', headerName: 'name', width: 200},
    {field: 'coefficient', headerName: 'coefficient', width: 200},
    
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditMatiere matieredata={params.row} />
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
          if (window.confirm(`Etes vous sûr de vouloir supprimer ?  ${params.row.name} ${params.row.coefficient}?`)) {
            mutate(params.row._links.matiere.href);
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
    return <span>Error when fetching matieres...</span>
  }
  else if (isSuccess) {
    return (
      <>
        <h2>Liste des Matieres</h2>
        <AddMatiere /><br />
        
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
          message="Matiere deleted" />
        </>
    );
  }
}

export default Matierelist;
