import axios from 'axios';

export default async function getTodos() {
  try {
    const { data: todos } = await axios.get('http://localhost:3001/todos');
    return todos;
  } catch (err) {
    console.error(err);
  }
} 