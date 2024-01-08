import React, {useEffect, useState} from 'react';
import './App.css';
import Head from './componentes/head/index';
const url = 'http://localhost:3333/pacientes';
let tarefa = ''
function App() {
  const [remedios , setremedios] = useState([])
  const [dados, setdados] = useState([]);
  const [vacina, setvacinas] = useState([])
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
  const vac = vacina.map(vacinas=>(
    <div className='info_data'>
      <p id={vacinas.nome + '*' + vacinas.data}> Vacina: {vacinas.nome} <span>aplicada em: {vacinas.data}</span><button onClick={(event)=>{
        var pai = event.currentTarget.parentElement;
        var pai1 = pai.parentElement;
        var dado = pai1.querySelector('p').getAttribute('id');
        var dividir = dado.split('*');
        var dados = {nome: dividir[0], data: dividir[1]};
        var newvacinas = vacina.filter(vac => vac.nome !== dados.nome || vac.data !== dados.data);
        setvacinas(newvacinas)
        console.log(dados)
        console.log(newvacinas)
      }}>excluir</button></p>
      
    </div>
  ))
  const conteudo = remedios.map(medicamentos =>(
    <div className='info_data'>
      <p id={medicamentos}>{medicamentos}<button className='exclude'  onClick={(event)=>{
        var pai = event.currentTarget.parentElement;
        var pai1 = pai.parentElement;
        var dado = pai1.querySelector('p').getAttribute('id');
        var newremedios = remedios.filter(vac => vac !== dado );
        setremedios(newremedios)
      }}>excluir</button></p>
      
    </div>
  ))
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
        <button className='criar' onClick={criarpaciente}>Novo paciente</button>
        <div className='info'>
          <div className='modal' style={{display:'none'}}>
            <div className='formulario'>
              <div className='dados'>
                <label id='nome'>Nome:</label>
                <input className='nome'></input>
              </div>
              <div className='dados'>
                <label id='cpf'>CPF:</label>
                <input className='cpf'></input>
              </div>
              <div className='dados'>
                <label id='nascimento'>Data de nascimento:</label>
                <input type='date' className='nascimento'></input>
              </div>
              <div className='dados'>
                <label id='sexo'>sexo: </label>
                <label id='sexo'>Masculino</label>
                <input className='sexo' type='radio' value={'Masculino'} name='sexo'></input>
                <label id='sexo'>Feminino</label>
                <input className='sexo' type='radio' value={'Feminino'} name='sexo'></input>
              </div>
              <div className='dados'>
                <label id='sus'>SUS:</label>
                <input className='sus'></input>
              </div>
              <div className='dados'>
                <label id='hipertenso'>Hipertenso: </label>
                <label id='hipertenso'>sim</label>
                <input className='hipertenso' type='radio' value={true} name='hipertenso'></input>
                <label id='hipertenso'>não</label>
                <input className='hipertenso' type='radio' value={false} name='hipertenso'></input>
              </div>
              <div className='dados'>
                <label id='diabetico'>Diabetico: </label>
                <label id='diabetico'>sim</label>
                <input className='diabetico' type='radio' value={true} name='diabetico'></input>
                <label id='diabetico'>não</label>
                <input className='diabetico' type='radio' value={false} name='diabetico'></input>
              </div>
              <div className='dados'>
                <label>Medicamentos</label>
                <input className='medicamentos'></input><button className='addremedio' onClick={()=>{
                    var ds = document.querySelector('.medicamentos').value
                    addremedio(ds, remedios)
                  }
                }>adicionar</button>
                <div className='text_scrol'>
                  {conteudo}
                </div>
              </div>
              <div className='dados'>
                <label>Vacinas</label>
                <input className='vacinas'></input><input className='datavacina' type='date'></input><button className='addvacina' onClick={()=>{
                    var ds = document.querySelector('.vacinas').value
                    var db = document.querySelector('.datavacina').value
                    addvacina(ds, db, vacina)
                  }
                }>adicionar</button>
                <div className='text_scrol'>
                  {vac}
                </div>
              </div>
              <div className='dados' style={{alignItems:'center'}}>
                <label>Observações: <textarea rows="4" cols="50" className='observacao'></textarea></label>
                
              </div>
              <div>
                <button onClick={async()=>{
                  var data = document.querySelector('.nascimento').value
                  var newdata = data.split('-', 3)
                  var paciente = {nome:document.querySelector('.nome').value, nascimento:newdata[2]+'/'+newdata[1]+'/'+newdata[0], cpf:document.querySelector('.cpf').value, diabetico:document.querySelector("input[name='diabetico']:checked").value, hipertenso:document.querySelector("input[name='hipertenso']:checked").value, sexo:document.querySelector("input[name='sexo']:checked").value, sus:document.querySelector('.sus').value, medicamentosdeusocontinuo:remedios, dosesdevacina:vacina, observações: document.querySelector('.observacao').value};
                  if(tarefa === 'criar'){
                    const response = await fetch(url,{method:'POST', body:JSON.stringify(paciente), headers:{'Content-Type': 'application/json'}})
                    if(!response.ok){
                      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
                    }
                    const data = await response.json()
                    console.log(data)
                    document.querySelector('.modal').querySelector('input').value = ''
                    document.querySelector('.modal').style.display = 'none'
                    tarefa = ''
                  }
                  else if(tarefa === 'atualizar'){

                  }
                  }
                }>salvar</button>
                <button>sair</button>
              </div>
              
              
            </div>

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
function addremedio(remedio, lista){
  if(lista.includes(remedio)){
    window.alert('remedio ja adicionado')
  }else{
    lista.push(remedio)
    document.querySelector('.medicamentos').value = ''
  }
}
function addvacina(vac, data, lista){
  var newdata = data.split('-', 3)
  var vacina = {nome:vac, data:newdata[2]+'/'+newdata[1]+'/'+newdata[0]}
  var jaexiste = lista.some(object=>{
    return object.nome === vacina.nome && object.data === vacina.data
  })
  if(jaexiste){
    window.alert('vacina ja adicionada')
  }else{
    lista.push(vacina)
  }
  console.log(lista)
}

function criarpaciente(){
  const modal = document.querySelector('.modal')
  if(modal.style.display === 'none' && tarefa === ''){
    modal.style.display = 'flex'
    tarefa = 'criar'
  }
  else if(modal.style.display === 'flex' && tarefa === 'criar'){
    modal.style.display = 'none'
    tarefa = ''
  }
}

/*function atualizarpaciente(paciente){
  const modal = document.querySelector('.modal')
  if(modal.style.display === 'none'){
    modal.style.display = 'flex'
    tarefa = 'atualizar'
  }
}*/