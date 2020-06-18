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
    if( resp.success ) {
      setTodos(resp.data);
    }
    setIsLoading(false);
  }

  // =======================================================
  /// Elimina un todo seleccionado
  // =======================================================
  const handleDelete = async (id) => {
    setIsLoading(true);
    const resp = await api.deleteTodos(id);
    if (resp.success) {
      setTodos(resp.data);
    }
    setIsLoading(false);
  }

  // =======================================================
  /// Crea un nuevo TODo
  // =======================================================
  const handleSubmit = async (event) => {
    event.preventDefault();


    if (current.id) {
      updateTodo(current);
    } else {
      createTodo(current);
    }

  }

  // =======================================================
  /// Crea un nuevo TODO
  // =======================================================
  const createTodo = async (body) => {
    setIsLoading(true);
    const resp = await api.createTodo(body);
    if (resp.success) {
      listData();
      setCurrent(dataDefault);
    }
    setIsLoading(false);
  }

  // =======================================================
  /// Actualiza un TODO seleccionado
  // =======================================================
  const updateTodo = async (body) => {
    setIsLoading(true);

    const {id, title, description, complete} = body;

    const newBody = { title, description, complete };

    const resp = await api.updateTodo(id, newBody);
    if (resp.success) {
      setTodos(resp.data);
    }
    setIsLoading(false);
  }

  // =======================================================
  /// 
  // =======================================================
  const handleUpdate = async (id) => {
    
    const todo = todos.find(todo => todo.id == id);
    const newList = todos.map( todo => {
      if( todo.id == id ) {
        return {
          ...todo,
          complete: (!todo.complete)
        };
      }

      return todo;
    } );
    setTodos(newList);

    await updateTodo(todo);

  }

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
