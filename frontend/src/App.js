import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, LinearProgress, Toolbar, AppBar, Typography, Button, TextField, Checkbox} from '@material-ui/core';

import { ListTodo } from './components/ListTodo';

import * as api from './api/api.todos';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export const App = () => {
  const classes = useStyles();

  const dataDefault = {
    title: '',
    description: '',
    complete: false
  };

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(dataDefault);

  const handleChange = (event) => {
    event.persist();
    setCurrent( prev => ({...prev, [event.target.name]: event.target.value}) );
  }

  const handleChangeCheck = (event) => {
    event.persist();
    setCurrent( prev => ({...prev, [event.target.name]: event.target.checked}) );
  }

  // =======================================================
  /// COnsulta el listado de todos almacenados
  // =======================================================
  const listData = async () => {
    setIsLoading(true);
    const resp = await api.listTodos();
    console.log(resp);
    if( resp.success ) {
      setTodos(resp.data);
    }
    setIsLoading(false);
  }

  const handleDelete = () => {}

  // =======================================================
  /// Crea un nuevo TODo
  // =======================================================
  const handleSubmit = async (event) => {
    setIsLoading(true);
    const resp = await api.createTodo( current );
    console.log(resp);
    if (resp.success) {
      setTodos(resp.data);
    }
    setIsLoading(false);
  }

  const handleUpdate = () => {}

  useEffect(() => {
    const fetchData = async () => listData();
    fetchData();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Lista de pendientes
          </Typography>
        </Toolbar>
      </AppBar>

      {isLoading && <LinearProgress color="secondary" />}
      
      <br />

      <React.Fragment>
        <Container fixed>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField 
                  id="standard-basic" 
                  label="Tarea" 
                  name="title" 
                  value={current.title} 
                  onChange={handleChange}
                />
                <TextField 
                  id="filled-basic" 
                  label="Descripción" 
                  multiline 
                  name="description"
                  value={current.description}
                  onChange={handleChange}
                />
                <Checkbox
                  name="complete"
                  checked={current.complete}
                  onChange={handleChangeCheck}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Button color="primary" type="submit">Guardar</Button>
              </form>

            <br />
            <hr />
            
            </Grid>
            <Grid item xs={12}>

              <ListTodo 
                todos={todos} 
                handleSelected={setCurrent}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />

            </Grid>
          </Grid>

        </Container>
      </React.Fragment>
    </>
  );
}
