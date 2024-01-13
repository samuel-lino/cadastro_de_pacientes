import React, {useState} from 'react';
import $ from "jquery";
const url = 'http://localhost:3333/pacientes';

export default function Modal(props){
    const [vacina, setvacinas] = useState([])
    const [remedios , setremedios] = useState([])
    
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
            return(
                <div className='formulario' id={props.id}>
                <h4>{props.tipo}</h4>
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
                    var ds = $('.medicamentos').val
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
                var ds = $('vacinas').val
                var db = $('datavacina').val
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
        <button onClick={()=>{
            if($('formulaio').find('h4').text === 'Adicionar'){
                criar(vacina, remedios)
            }
        }} 
        >salvar</button>
        <button>sair</button>
        </div>
        
        
        </div>
        )
    }
    
    
    async function criar(vacina, remedios){
        var data = $('.nascimento').val
        var newdata = data.split('-', 3)
        var paciente = {nome:$('.nome').val, nascimento:newdata[2]+'/'+newdata[1]+'/'+newdata[0], cpf:$('.cpf').val, diabetico:$("input[name='diabetico']:checked").val, hipertenso:$("input[name='hipertenso']:checked").val, sexo:$("input[name='sexo']:checked").val, sus:$('.sus').val, medicamentosdeusocontinuo:remedios, dosesdevacina:vacina, observações: $('.observacao').val};
        const response = await fetch(url,{method:'POST', body:JSON.stringify(paciente), headers:{'Content-Type': 'application/json'}})
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
        $('.modal').find('input')
        $('.modal').style.display = 'none'
    }
    function addremedio(remedio, lista){
        if(lista.includes(remedio)){
            window.alert('remedio ja adicionado')
        }else{
            lista.push(remedio)
            $('.medicamentos').val = ''
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