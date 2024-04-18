
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ResponsiveAppBar from './components/ResponsiveAppBar';
//import Menu from './components/Menu';
import Login from './components/Login';

const queryClient = new QueryClient();

function App() {
  

  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <ResponsiveAppBar />
      <QueryClientProvider client={queryClient}>
        <Login />

      </QueryClientProvider>
    </Container>
  );
}

export default App;