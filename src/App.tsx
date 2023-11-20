import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Container, Grid, Paper, Typography, ThemeProvider, CssBaseline, FormLabel } from '@mui/material';
import theme from './components/theme';

const App = () => {
  const URL = 'http://127.0.0.1:8000'; //url da api

  const [produto, setProduto] = useState<{nome : string, imagem : File | null, preco : number}>({
    nome: '',
    preco: 0,
    imagem: null,
  });

  const [produtoResgatado, setProdutoResgatado] = useState<{nome : string, imagem : string, preco : string}>({
    nome: '',
    preco: '',
    imagem: '',
  });

  const [idProduto, setIdProduto] = useState<{id : number}>({
    id : -1,
  });

  const [resultadosVisiveis, setResultadosVisiveis] = useState(false);


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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    try {
      const resposta = await fetch(
        URL + '/api/produtos/', {
          method: 'POST',
          body: formData
        }
      );

      if(!resposta.ok){
        alert('Erro ao adicionar produto.');
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dado = await resposta.text();
      console.log(dado);
      alert('Produto adicionado com sucesso.');
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  const handleChangeDelete = (e: ChangeEvent<HTMLInputElement>) => {
   
    setIdProduto({
      ...idProduto,
      [e.target.name]: e.target.value
    });
  }

  const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(idProduto.id === null || idProduto.id === -1){
      console.log('Informe o id');
    }

    try {
      const resposta = await fetch(URL + '/api/produtos/' + idProduto.id.toString() + '/', {
        method: 'DELETE',
      });

      if(!resposta.ok){
        alert('Erro ao deletar produto. Verifique se o ID do produto está correto.');
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }

      const dado = await resposta.text();
      console.log(dado);
      alert('Produto removido com sucesso.');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleChangeBusca = (e: ChangeEvent<HTMLInputElement>) => {
    setIdProduto({
      ...idProduto,
      [e.target.name]: e.target.value
    });
  }

  const handleBusca = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(idProduto.id === -1 || idProduto.id === null){
      console.log('Informe o ID do produto');
      return;
    }

    try {
      const resposta = await fetch(URL + '/api/produtos/' + idProduto.id + '/', {
        method: 'GET'
      });

      if(!resposta.ok){
        alert(`Erro ao encontrar o produto de ID ${idProduto}. Verifique se o ID do produto está correto.`);
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }

      const dados = await resposta.json();
      console.log('json: ', dados);
      if (dados.length > 0) {
        const produtoEncontrado = dados[0];
        setProdutoResgatado({
          nome: produtoEncontrado.nome,
          preco: produtoEncontrado.preco,
          imagem: produtoEncontrado.imagem,
        });
        console.log('link encontrado:' + URL + produtoEncontrado.imagem);

        setResultadosVisiveis(true); // Mostra os resultados após a busca
      } else {
        alert(`Erro ao encontrar o produto de ID ${idProduto.id}. Verifique se o ID do produto está correto.`);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleChangeAtualizar = (e : ChangeEvent<HTMLInputElement>) => {

  };

  const handleAtualiza = () => {
    
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
                  <Grid item><Button variant="contained" color="primary" onClick={handleAtualiza}>
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
      <Container style={{'padding': 20}}>
        <Paper elevation={3} style={{ padding: '20px'}}>
          <Typography variant="h4" gutterBottom>
            Buscar por Produto
          </Typography>
          <form onSubmit={handleBusca}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="ID do produto"
                  fullWidth
                  variant="outlined"
                  name="id"
                  onChange={handleChangeBusca}
                />
              </Grid>
              <Grid item><Button variant="contained" color="primary" type='submit'>
                Buscar
              </Button></Grid>
            </Grid>
          </form>
          {resultadosVisiveis && (
            <Grid container spacing={3} style={{ width: '100%', marginTop: '20px' }}>
              <Grid item xs={3}>
                <img src={URL + produtoResgatado.imagem} alt={produtoResgatado.nome} style={{maxWidth: '100%'}} />
              </Grid>
              <Grid item xs={9} container direction="column" justifyContent="flex-start">
                <Grid item style={{marginTop: '20px'}}>
                  <FormLabel>Nome: {produtoResgatado.nome}.</FormLabel>
                </Grid>
                <Grid item style={{marginTop: '10px'}}>
                  <FormLabel>Preço: {produtoResgatado.preco} reais (BR).</FormLabel>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
  
}
export default App;
