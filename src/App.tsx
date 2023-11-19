import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Container, Grid, Paper, Typography, ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/theme';

const App = () => {
  const URL = 'https://localhost:5432/'; //url da api

  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    preco: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduto({
      ...produto,
      [e.target.name] : e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // para converter um obj em string json, tem que o instalar. npm install querystring-es3

    fetch(
      URL + 'produto',{
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(produto)        
      }
    )
    .then(resposta => resposta.json())
    .then(dado => console.log(dado))
    .catch((msgErro) => console.error('Erro:', msgErro));
  }

  const handleSearch = () => {
    
  };

  const handleUpdate = () => {
    
  };

  const handleDelete = () => {
    
  };

  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <Container style={{'padding': 20}}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Informações do Produto
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Nome do Produto"
                  fullWidth
                  variant="outlined"
                  name="nome"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descrição do Produto"
                  fullWidth
                  variant="outlined"
                  name="descricao"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Preço do Produto"
                  fullWidth
                  variant="outlined"
                  name="preco"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} width={'100%'}>
                <Grid container alignContent={'baseline'}>
                  <Grid item><Button variant="contained" color="primary" type='submit'>
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
