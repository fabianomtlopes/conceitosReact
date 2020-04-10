import React, { useState, useEffect} from "react";
import api from './services/api';


import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then( res => {
      setRepositories(res.data);
    });
  },[]);


  async function handleAddRepository() {
    // const {title, url, techs} = repositories;
    const res = await api.post('repositories', {
      url: 'http://google.com',
      title: 'ReactJS' ,
      techs: ['New study', 'Thinking about it '] ,
    })

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repositor => repositor.id !== id )
      );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositor => (
            <li key={repositor.id}>
                {repositor.title}
              <button  onClick={() => handleRemoveRepository(repositor.id)}>
                Remover
              </button>
            </li>
        ))}
      </ul>

      <button  onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
