import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployes, deleteEmploye } from '../api/employeapi';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddEmploye from './AddEmploye';
import EditEmploye from './EditEmploye';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function Employelist() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["employes"],
    queryFn: getEmployes
  });

  const { mutate } = useMutation(deleteEmploye, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['employes'] });
    },
    onError: (err) => {
      console.error(err);
    },
  }); 

  const columns: GridColDef[] = [
    {field: 'numEmploye', headerName: 'NumEmploye', width: 200},
    {field: 'prenom', headerName: 'Prénom', width: 200},
    {field: 'nom', headerName: 'Nom', width: 200},
    {field: 'email', headerName: 'Email', width: 150},
    {field: 'adresse', headerName: 'Adresse', width: 150},
    {field: 'telephone', headerName: 'Téléphone', width: 150},
    {field: 'fonction', headerName: 'Fonction', width: 150},
    {field: 'salaire', headerName: 'Salaire', width: 150},
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditEmploye employedata={params.row} />
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
          if (window.confirm(`Etes vous sûr de vouloir supprimer ? ${params.row.numEmploye} ${params.row.prenom} ${params.row.nom}?`)) {
            mutate(params.row._links.employe.href);
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
    return <span>Error when fetching employes...</span>
  }
  else if (isSuccess) {
    return (
      <>
        <h2>Liste des Employes</h2>
        <AddEmploye /><br />
        
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
          message="Employe supprime" />
        </>
    );
  }
}

export default Employelist;
