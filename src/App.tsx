import { Button, TextField, Container, Grid, Paper, Typography, ThemeProvider } from '@mui/material';
import theme from './components/theme';

const App = () => {

  const handleCreate = () => {
    
  };

  const handleSearch = () => {
    
  };

  const handleUpdate = () => {
    
  };

  const handleDelete = () => {
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{'padding': 20}}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Informações do Produto
          </Typography>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Nome do Produto"
                  fullWidth
                  variant="outlined"
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descrição do Produto"
                  fullWidth
                  variant="outlined"
                  name="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Preço do Produto"
                  fullWidth
                  variant="outlined"
                  name="price"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignContent={'baseline'}>
                  <Grid item><Button variant="contained" color="primary" onClick={handleCreate}>
                    Criar
                  </Button></Grid>
                  <Grid item> <Button variant="contained" color="primary" onClick={handleSearch}>
                    Buscar
                  </Button></Grid>
                  <Grid item> <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Atualizar
                  </Button></Grid>
                  <Grid item><Button variant="contained" color="primary" onClick={handleDelete}>
                    Deletar
                  </Button></Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
