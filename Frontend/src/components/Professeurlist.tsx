import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfesseurs, deleteProfesseur } from '../api/professeurapi';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddProfesseur from './AddProfesseur';
import EditProfesseur from './EditProfesseur';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Profresseurlist() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["professeurs"],
    queryFn: getProfesseurs
  });

  const { mutate } = useMutation(deleteProfesseur, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['professeurs'] });
    },
    onError: (err) => {
      console.error(err);
    },
  }); 

  const columns: GridColDef[] = [
    {field: 'prenom', headerName: 'Prénom', width: 200},
    {field: 'nom', headerName: 'Nom', width: 200},
    {field: 'email', headerName: 'Email', width: 150},
    {field: 'adresse', headerName: 'Adresse', width: 150},
    {field: 'telephone', headerName: 'Téléphone', width: 150},
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditProfesseur professeurdata={params.row} />
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
          if (window.confirm(`Etes vous sûr de vouloir supprimer ?  ${params.row.prenom} ${params.row.nom}?`)) {
            mutate(params.row._links.professeur.href);
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
    return <span>Error when fetching professeurs...</span>
  }
  else if (isSuccess) {
    return (
      <>
        <h2>Liste des Professeurs</h2>
        <AddProfesseur /><br />
        
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
          message="Professeur deleted" />
        </>
    );
  }
}

export default Profresseurlist;
