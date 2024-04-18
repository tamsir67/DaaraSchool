import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteEtudiant, getEtudiants } from '../api/etudiantapi';
import AddEtudiant from './AddEtudiant';
import EditEtudiant from './EditEtudiant';

function Etudiantlist() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["etudiants"],
    queryFn: getEtudiants
  });

  const { mutate } = useMutation(deleteEtudiant, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['etudiants'] });
    },
    onError: (err) => {
      console.error(err);
    },
  }); 

  const columns: GridColDef[] = [
    {field: 'numEtudiant', headerName: 'NumEtudiant', width: 200},
    {field: 'prenom', headerName: 'Prénom', width: 200},
    {field: 'nom', headerName: 'Nom', width: 200},
    {field: 'email', headerName: 'Email', width: 150},
    {field: 'adresse', headerName: 'Adresser', width: 150},
    {field: 'telephone', headerName: 'Téléphone', width: 150},
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditEtudiant etudiantdata={params.row} />
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
            if (window.confirm(`Etes vous sûr de vouloir supprimer ? ${params.row.numEtudiant} ${params.row.prenom} ${params.row.nom}?`)) {
              mutate(params.row._links.etudiant.href);
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
    return <span>Error when fetching etudiants...</span>
  }
  else if (isSuccess) {
    return (
      <>
        <h2>Liste des Etudiants</h2>
        <AddEtudiant /><br />
        
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
          message="Etudiant supprime" />
        </>
    );
  }
}

export default Etudiantlist;
