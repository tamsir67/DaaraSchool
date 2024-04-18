import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteInscription, getInscriptions } from '../api/inscriptionapi';
import AddInscription from './AddInscription';
import EditInscription from './EditInscription';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Etudiantlist from './Etudiantlist';
import Professeurlist from './Professeurlist';
import Matierelist from './Matierelist';
import Classelist from './Classelist';



type listProps = {
  logOut?: () => void;
 }

 const handleLogout = () => {
  setAuth(false);
  sessionStorage.setItem("jwt", "");
 }
 
function Inscriptionlist({ logOut }: InscriptionlistProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["inscriptions"],
    queryFn: getInscriptions
  });

  const { mutate } = useMutation(deleteInscription, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['inscriptions'] });
    },
    onError: (err) => {
      console.error(err);
    },
  }); 

  const handleLogout = () => {
    setAuth(false);
    sessionStorage.setItem("jwt", "");
   }

   
  const columns: GridColDef[] = [
    {field: 'numInscrit', headerName: 'numInscrit', width: 200},
    {field: 'prenom', headerName: 'Prénom', width: 200},
    {field: 'nom', headerName: 'Nom', width: 200},
    {field: 'email', headerName: 'Email', width: 150},
    {field: 'adresse', headerName: 'Adresse', width: 150},
    {field: 'telephone', headerName: 'Téléphone', width: 150},
    {field: 'sexe', headerName: 'Sexe', width: 150},
    {field: 'montantInscrit', headerName: 'Montant Inscription', width: 150},
    {field: 'montantVerse', headerName: 'Montant versé', width: 150},
    {field: 'classe', headerName: 'Classe', width: 150},
    {field: 'dateNaissance', headerName: 'Date Naissance', width: 150},
    {field: 'dateInscription', headerName: 'Date Inscription', width: 150},


    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        <EditInscription inscriptiondata={params.row} />
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
            if (window.confirm(`Etes vous sûr de vouloir supprimer ? ${params.row.numInscrit} ${params.row.prenom} ${params.row.nom}?`)) {
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
        <AddInscription />
        <Button onClick={logOut}>Log out</Button>
        </Stack>
        <h2>Liste des Incrits</h2>
       <br />
        
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
          message="Incription supprimee" />

<Etudiantlist />
<Professeurlist />
<Matierelist />
<Classelist />

        </>
    );
  }
}


export default Inscriptionlist;
