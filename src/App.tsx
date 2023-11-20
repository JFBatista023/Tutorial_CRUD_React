import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Container, Grid, Paper, Typography, ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/theme';

const App = () => {
  const URL = 'http://127.0.0.1:8000'; //url da api

  const [produto, setProduto] = useState<{nome : string, imagem : File | null, preco : number}>({
    nome: '',
    preco: 0,
    imagem: null,
  });

  const [idProduto, setIdProduto] = useState<{id : number}>({
    id : -1,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'imagem'){
      if (e.target.files) {
        setProduto({
          ...produto,
          [e.target.name]: e.target.files[0]
        });
      }
    }else if(e.target.name === 'preco'){
      setProduto({
        ...produto,
        [e.target.name]: parseFloat(e.target.value)
      });
    }else{
      setProduto({
        ...produto,
        [e.target.name] : e.target.value
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if(produto.imagem === null) {
      console.log("Adicione uma imagem");
      return;
    }
    if(produto.nome === null || produto.nome === '') {
      console.log("Adicione um nome");
      return;
    }
    if(produto.preco === null || produto.preco === 0) {
      console.log("Adicione um preco");
      return;
    }

    formData.append('nome', produto.nome);
    formData.append('preco', produto.preco.toString());
    formData.append('imagem', produto.imagem);

    fetch(
      URL + '/api/produtos/',{
        method: 'POST',
        body: formData
      }
    )
    .then(resposta => resposta.text())
    .then(dado => {
      console.log(dado);
      alert('Produto adicionado com sucesso.');
    })
    .catch((msgErro) => console.error('Erro:', msgErro));
  }

  const handleChangeDelete = (e: ChangeEvent<HTMLInputElement>) => {
   
    setIdProduto({
      ...idProduto,
      [e.target.name]: e.target.value
    });
  }

  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(idProduto.id === null || idProduto.id === -1){
      console.log('Informe o id');
    }

    fetch(URL + '/api/produtos/' + idProduto.id.toString() + '/', {
      method: 'DELETE',
    })
    .then(resposta => resposta.text())
    .then(dado => console.log(dado))
    .catch((msgErro) => console.error('Erro:', msgErro));
  };

  const handleChangeBusca = () => {
  }

  const handleBusca = () => {
  };

  const handleUpdate = () => {
    
  };

  

  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <Container style={{'padding': 20}}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Adicionar Produto
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
                  label="Preço do Produto"
                  fullWidth
                  variant="outlined"
                  name="preco"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <input 
                  type="file" 
                  name="imagem" 
                  onChange={handleChange} 
                />
              </Grid>
              <Grid item xs={12} style={{width: '100%'}}>
                <Grid container alignContent={'baseline'}>
                  <Grid item><Button variant="contained" color="primary" type='submit'>
                    Criar
                  </Button></Grid>
                  <Grid item> <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Atualizar
                  </Button></Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Container style={{'padding': 20}}>
        <Paper elevation={3} style={{ padding: '20px'}}>
          <Typography variant="h4" gutterBottom>
            Remover Produto
          </Typography>
          <form onSubmit={handleDelete}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="ID do produto"
                  fullWidth
                  variant="outlined"
                  name="id"
                  onChange={handleChangeDelete}
                />
              </Grid>
              <Grid item><Button variant="contained" color="primary" type='submit'>
                Deletar
              </Button></Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
  
}
export default App;
