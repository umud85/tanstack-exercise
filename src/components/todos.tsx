'use client';

import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useFetchTodos from '@/src/hooks/useFetchTodos';
import useCreateTodo from '@/src/hooks/useCreateTodo';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { useState, ChangeEvent } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import useUpdateTodo from '@/src/hooks/useUpdateTodo';
import useDeleteTodo from '@/src/hooks/useDeleteTodo';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export default function Todos(props) {
  const [inputValue, setInputValue] = useState<string>('')
  const queryClient = useQueryClient();

  const { todos } = useFetchTodos(props);
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const todoList = todos?.map((todo: Todo) => (
    <li key={todo.id}>{todo.title}</li>
  ));

  function handleSortClick() {
    const newTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
    console.log(newTodos);
    queryClient.setQueryData(['todos'], newTodos);
  }

  function handleAddClick() {
    const id = uuidv4();
    createTodoMutation.mutate({ id: id, title: inputValue, done: false });
    setInputValue('');
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleToggle(todo: Todo) {
    const done = !todo.done;
    const updatedTodo = { ...todo, done: done }
    updateTodoMutation.mutate(updatedTodo);
  };

  function handleDeleteClick(id: string) {
    deleteTodoMutation.mutate(id);
  } 

  return (
    <>
      <Box>
        <TextField
          id="standard-basic"
          label="Todo"
          variant="standard"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          onClick={handleAddClick}
          variant="contained"
          sx={{ marginLeft: '1.5em' }}
        >Add Todo</Button>
      </Box>
      <IconButton onClick={handleSortClick} sx={{ marginLeft: '2.5em', marginTop: '2em'}}>
        <SortByAlphaIcon fontSize='small' />
      </IconButton>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos?.map((todo: Todo, index: number) => {
        const labelId = `checkbox-list-label-${todo.title}`;

        return (
          <ListItem
            key={todo.id}
            disablePadding
          >
            <IconButton onClick={() => handleToggle(todo)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.done}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
            </IconButton>
            <ListItemText
              id={labelId}
              primary={todo.title}
              sx={{
                textTransform: 'capitalize',
                textDecoration: `${todo.done ? 'line-through' : ''}`
              }}
            />
            <IconButton
              onClick={() => handleDeleteClick(todo.id)}
              sx={{ marginLeft: "0.7em" }}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </ListItem>
        );
      })}
    </List>
    </>
  );
}