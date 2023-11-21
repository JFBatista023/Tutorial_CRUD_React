import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, TextField, Container, Grid, Paper, Typography, ThemeProvider, CssBaseline, FormLabel } from '@mui/material';
import theme from './components/theme';

const App = () => {
  const URL = 'http://127.0.0.1:8000';

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

  const [novoDado, setNovoDado] = useState<{id: number, nome : string, imagem : File | null, preco : number}>({
    id: -1,
    nome: '',
    preco: 0,
    imagem: null,
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
    if(produto.nome === null || produto.nome === '') {
      alert("Adicione um nome");
      return;
    }
    if(produto.preco === null || produto.preco === 0) {
      alert("Adicione um preco");
      return;
    }
    if(produto.imagem === null) {
      alert("Adicione uma imagem");
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

      alert('Produto removido com sucesso.');
      if (idProduto.id === novoDado.id){
        setNovoDado({
          id: -1,
          nome: '',
          preco: 0,
          imagem: null,
        });
        setResultadosVisiveis(false);
      }
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

      setNovoDado({
        ...novoDado,
        'id': idProduto.id
      });
      const dados = await resposta.json();
      
      if (dados.length > 0) {
        const produtoEncontrado = dados[0];
        setProdutoResgatado({
          nome: produtoEncontrado.nome,
          preco: produtoEncontrado.preco,
          imagem: produtoEncontrado.imagem,
        });

        setResultadosVisiveis(true);
      } else {
        alert(`Erro ao encontrar o produto de ID ${idProduto.id}. Verifique se o ID do produto está correto.`);
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleChangeAtualizar = (e : ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'imagem'){
      if (e.target.files) {
        setNovoDado({
          ...novoDado,
          [e.target.name]: e.target.files[0]
        });
      }
    }else if(e.target.name === 'preco'){
      setNovoDado({
        ...novoDado,
        [e.target.name]: parseFloat(e.target.value)
      });
    }else{
      setNovoDado({
        ...novoDado,
        [e.target.name] : e.target.value
      });
    }
  };

  const handleAtualiza = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    let tem_dado = false;
    if(novoDado.nome !== '' && novoDado.nome !== null){
      formData.append('nome',novoDado.nome);
      tem_dado = true;
    }
    if(novoDado.preco !== 0 && novoDado.preco !== null){
      formData.append('preco',novoDado.preco.toString());
      if(!tem_dado) tem_dado = true;
    }
    if(novoDado.imagem !== null){
      formData.append('imagem',novoDado.imagem);
      if(!tem_dado) tem_dado = true;
    }

    if(tem_dado){
      try {
        const resposta = await fetch(
          URL + '/api/produtos/' + novoDado.id + '/', {
            method: 'PATCH',
            body: formData
          }
        );
  
        if(!resposta.ok){
          alert('Erro ao adicionar produto.');
          throw new Error(`HTTP error! status: ${resposta.status}`);
        }

        setResultadosVisiveis(false);

        alert('Produto atualizado com sucesso.');
      } catch (error) {
        console.error('Erro:', error);
      }
    }else{
      alert(`Preencha ao menos 1 campo para atualizar o produto de ID ${novoDado.id}.`)
    }
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
              <Grid item xs={12} style={{width: '100%'}}><Button variant="contained" color="primary" type='submit'>
                Criar
              </Button></Grid>
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
            <Grid>
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
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Atualizar informações do produto
                  </Typography>
                </Grid>
                <form onSubmit={handleAtualiza}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Nome do Produto"
                        fullWidth
                        variant="outlined"
                        name="nome"
                        onChange={handleChangeAtualizar}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Preço do Produto"
                        fullWidth
                        variant="outlined"
                        name="preco"
                        onChange={handleChangeAtualizar}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <input 
                        type="file" 
                        name="imagem" 
                        onChange={handleChangeAtualizar} 
                      />
                    </Grid>
                    <Grid item><Button variant="contained" color="primary" type='submit'>
                      Atualizar
                    </Button></Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
  
}
export default App;
