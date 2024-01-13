import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import './App.css';
import Head from './componentes/head/index';
import Modal from './componentes/modal/index.js';
const url = 'http://localhost:3333/pacientes';
function App() {
  const [modal, setmodal] = useState([])
  const [dados, setdados] = useState([]);
  useEffect(()=>{
    fetch(url, {method: 'GET'})
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      setdados(data)
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  });
  const content = dados.map(paciente => (
    <div className='info_bio' key={paciente.cpf}>
      <h2>{paciente.nome}</h2>
      <h4>{paciente.cpf}</h4>
      <h4>{paciente.nascimento}</h4>
      <div className='alterar'>
        <button  id={paciente._id} onClick={(event)=>{
          var id = event.currentTarget.getAttribute('id');
          console.log(id)
          deletar(id);
        }
        }>Deletar</button>
      </div>
    </div>
  ));
  return (
    <div className="App">
      <header className="App-header">
        <Head/>
        <button className='criar' onClick={()=>{
          $('.modal').css('display', 'flex');
            
          setmodal(<Modal id = '' tipo = 'Adicionar' />)
        }}>Novo paciente</button>
        <div className='info'>
          <div className='modal' style={{display:'none'}}>
            {modal}
          </div>
          <div className='lista'>
            <h1>lista de pacientes</h1>
            {content}
          </div>
          
          
        </div>

      </header>
    </div>
  );
}

export default App;


function  deletar(params){
  fetch(url +'/'+ params, {method:'DELETE'})
    .then(response=>{
      if(!response.ok){
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
      console.log('vamos')
      return response.json();
      
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  
}
/*function atualizarpaciente(paciente){
  const modal = document.querySelector('.modal')
  if(modal.style.display === 'none'){
    modal.style.display = 'flex'
    tarefa = 'atualizar'
  }
}*/