import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import './App.css';
import Head from './componentes/head/index';
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
  const [vacina, setvacinas] = useState([])
  const [remedios , setremedios] = useState([])
  const [hipertenso, sethipertenso] = useState([])
  const [diabetico, setdiabetico] = useState([])
  const [cadastro, setcadasctro] = useState([])


 
  const vac = vacina.map(vacinas=>(
    <div className='info_data'>
    <p id={vacinas.nome + '*' + vacinas.data}> Vacina: {vacinas.nome} <span>aplicada em: {vacinas.data}</span><button className='btn btn-danger' onClick={(event)=>{
      var pai = event.currentTarget.parentElement;
      var pai1 = pai.parentElement;
      var dado = pai1.querySelector('p').getAttribute('id');
      var dividir = dado.split('*');
      var dados = {nome: dividir[0], data: dividir[1]};
      var newvacinas = vacina.filter(vac => vac.nome !== dados.nome || vac.data !== dados.data);
      setvacinas(newvacinas)
    }}>X</button></p>
    
    </div>
    ))
    const conteudo = remedios.map(medicamentos =>(
      <div className='info_data'>
      <p id={medicamentos}>{medicamentos}<button className='exclude btn btn-danger'  onClick={(event)=>{
        var pai = event.currentTarget.parentElement;
        var pai1 = pai.parentElement;
        var dado = pai1.querySelector('p').getAttribute('id');
        var newremedios = remedios.filter(vac => vac !== dado );
        setremedios(newremedios)
      }}>X</button></p>
      
      </div>
      ))
      const content = dados.map(paciente => (
        <div className='info_bio' key={paciente.cpf}>
        <h2>{paciente.nome}</h2>
        <h4>{paciente.cpf}</h4>
        <h4>{paciente.nascimento}</h4>
        <div className='alterar'>
        <button  className='btn btn-danger btn-sm' id={paciente._id} onClick={(event)=>{
          var id = event.currentTarget.getAttribute('id');
          console.log(id)
          deletar(id);
        }
      }>Deletar</button>
      <button className='btn btn-primary btn-sm' id={paciente._id} onClick={(event)=>{
        var id = event.currentTarget.getAttribute('id');
        setmodal('Editar')
        var paciente = dados.filter(item=>item._id === id)
        Editar(id, paciente)
        setremedios(paciente[0].medicamentosdeusocontinuo)
        setvacinas(paciente[0].dosesdevacina)
      }}>Editar</button>
      <button className='btn btn-secondary' id={paciente._id} onClick={async(event)=>{
        var id = event.currentTarget.getAttribute('id');
        var novo = dados.filter(item =>item._id ===id)
        console.log(novo)
        setcadasctro(novo[0])
        if(cadastro.diabetico === true){
          setdiabetico('Sim')
        }
        else{
          setdiabetico('Não')
        }
        if(cadastro.hipertenso === true){
          sethipertenso('Sim')
        }
        else{
          sethipertenso('Não')
        }
        
        
        $('.modal_view').css('display', 'flex')
      }}>Ver</button>
      </div>
      </div>
      ));
const dadospaciente = (
  <div className='formulario' id='visualizador'>
    <h1>Dados do paciente</h1>
    <label>Nome:{cadastro.nome}</label>
    <label>Data de nascimento: {cadastro.nascimento}</label>
    <label>Sexo: {cadastro.sexo}</label>
    <label>CPF: {cadastro.cpf}</label>
    <label>SUS: {cadastro.sus}</label>
    <label>Hipertenso: {hipertenso}</label>
    <label>Diabetico: {diabetico}</label>
    <label>Medicamentos de uso continuo:</label>
    <div className='lista'>
      {cadastro.medicamentosdeusocontinuo && (
        <div>
          {cadastro.medicamentosdeusocontinuo.map(remedio => (
            <div key={remedio}>
              <label>{remedio}</label>
            </div>
          ))}
        </div>
      )}
    </div>
    <label>Doses de vacina</label>
    <div className='lista'>
      {cadastro.dosesdevacina &&(
        <div>
          {cadastro.dosesdevacina.map(vacinas => (
            <div key={vacinas.nome}>
              <label>{vacinas.nome}: {vacinas.data}</label>
            </div>
          ))}
        </div>
      )}
    </div>
    <button className='btn btn-danger' onClick={()=>{
      $('.modal_view').css('display', 'none')
    }}>Fechar</button>

  </div>
)
      return (
        <div className="App">
        <header className="App-header">
        <Head/>
        <button className='criar' style={{marginTop: '1rem'}} onClick={()=>{
          $('.modal').css('display', 'flex');
          
          setmodal('Adicionar')
        }}>Novo paciente</button>
        <div className='info'>
        <div className='modal' style={{display:'none'}}>
        <div className='formulario' id={modal}>
        <h4>{modal}</h4>
        <div className='edit'>
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
        <input className='medicamentos'></input><button className='addremedio btn btn-primary' onClick={()=>{
          var ds = $('.medicamentos').val()
          addremedio(ds, remedios)
        }
      }>adicionar</button>
      <div className='text_scrol'>
      {conteudo}
      </div>
      </div>
      <div className='dados'>
      <label>Vacinas</label>
      <input className='vacinas'></input><input className='datavacina' type='date'></input><button className='addvacina btn btn-primary' onClick={()=>{
        var data = $('.datavacina').val()
        var nomevac = $('.vacinas').val()
        var newdata = data.split('-', 3)
        var vacinas = {nome:nomevac, data:newdata[2]+'/'+newdata[1]+'/'+newdata[0]}
        var jaexiste = vacina.some(object=>{
            return object.nome === vacinas.nome && object.data === vacinas.data
        })
        if(jaexiste){
            window.alert('vacina ja adicionada')
        }else{
            vacina.push(vacinas)
        }
        console.log(vacina)
      }
    }>adicionar</button>
    <div className='text_scrol'>
    {vac}
    </div>
    </div>
    </div>
    <div>
    <button className='modal_salvar btn btn-success' style={{fontSize:'1.5rem'}} onClick={()=>{
      if($('.formulario').attr('id') === 'Adicionar'){
        console.log('clicou')
        criar(vacina, remedios)
        setmodal('')
        Limpar()
      }
      else if($('.formulario').attr('id') === 'Editar'){
        var id = $('.edit').attr('id')
        console.log(id)
        editando(id, vacina, remedios)
      }
    }} 
    >salvar</button>
    <button className='modal_sair btn btn-danger' style={{marginRight:'1rem', fontSize:'1.5rem'}} onClick={()=>{
      $('.modal').css('display', 'none')
      setmodal('')
      Limpar()
    }}>sair</button>
    </div>
  
    
    </div>
    </div>
    <div className='modal_view' style={{display:'none'}}>
      {dadospaciente}
    </div>
    
    <div className='lista'>
    <h1>Lista de pacientes</h1>
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
  async function criar(vacina, remedios){
    var data = $('.nascimento').val()
    var newdata = data.split('-', 3)
    var paciente = {nome:$('.nome').val(), nascimento:newdata[2]+'/'+newdata[1]+'/'+newdata[0], cpf:$('.cpf').val(), diabetico:$("input[name='diabetico']:checked").val(), hipertenso:$("input[name='hipertenso']:checked").val(), sexo:$("input[name='sexo']:checked").val(), sus:$('.sus').val(), medicamentosdeusocontinuo:remedios, dosesdevacina:vacina};
    const response = await fetch(url,{method:'POST', body:JSON.stringify(paciente), headers:{'Content-Type': 'application/json'}})
    if(!response.ok){
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }
    else{
        console.log(`ok ${paciente}`)
    }
    $('.modal').css('display', 'none')
}
function addremedio(remedio, lista){
    if(lista.includes(remedio)){
        window.alert('remedio ja adicionado')
    }else{
        lista.push(remedio)
        $('.medicamentos').val('')
    }
}

async function Editar(id, dados){
  $('.modal').css('display', 'flex');
  $('.edit').attr('id', id)
  $('.nome').val(dados[0].nome)
  var data = await dados[0].nascimento
  var newdata = data.split('/', 3)
  $('.nascimento').val(newdata[2]+'-'+newdata[1]+'-'+newdata[0])
  $('.cpf').val(dados[0].cpf)
  $("input[name='diabetico'][value ='"+ dados[0].diabetico + "']").prop('checked', true);
  $("input[name='hipertenso'][value ='"+ dados[0].hipertenso + "']").prop('checked', true);
  $("input[name='sexo'][value ='"+ dados[0].sexo + "']").prop('checked', true);
  $('.sus').val(dados[0].sus)
}
function Limpar(){
  $('.modal').find('input').val('')
  $("input[name='diabetico']").prop('checked', false);
  $("input[name='hipertenso']").prop('checked', false);
  $("input[name='sexo']").prop('checked', false);
}
async function editando(id, vacina, remedios){
  var data = $('.nascimento').val()
  var newdata = data.split('-', 3)
  var paciente = {nome:$('.nome').val(), nascimento:newdata[2]+'/'+newdata[1]+'/'+newdata[0], cpf:$('.cpf').val(), diabetico:$("input[name='diabetico']:checked").val(), hipertenso:$("input[name='hipertenso']:checked").val(), sexo:$("input[name='sexo']:checked").val(), sus:$('.sus').val(), medicamentosdeusocontinuo:remedios, dosesdevacina:vacina};
  const response = await fetch(url +'/'+ id,{method:'PUT', body:JSON.stringify(paciente), headers:{'Content-Type': 'application/json'}})
    if(!response.ok){
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }
    else{
        console.log(`ok ${paciente}`)
    }
    $('.modal').css('display', 'none')

}