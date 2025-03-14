let tarefas = [];
let proximoId = 1;

function criarTarefa(nome, data) {
    const novaTarefa = {
        id: proximoId++,
        nome,
        data,
        concluida: false
    };
    tarefas = [...tarefas, novaTarefa];
    atualizarListaDeTarefas();
}

function atualizarTarefa(id) {
    tarefas = tarefas = tarefas.map(tarefa =>
        tarefa.id === id ? {
            ...tarefa, concluida: true
        } : tarefa);
    atualizarListaDeTarefas();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    atualizarListaDeTarefas();
}

function atualizarListaDeTarefas() {
    const listElement = document.getElementById('listaTarefas');
    listElement.innerHTML = '';

    tarefas.forEach(tarefa => {
        const tarefaElement = document.createElement('li');
        tarefaElement.classList.add('tarefa-item');
        tarefaElement.innerHTML = `
        <span>${tarefa.id}. ${tarefa.nome} (${tarefa.data}) (${tarefa.concluida ? 'Concluída' : 'Pendente'})</span>
        <button onclick="atualizarTarefa(${tarefa.id})">Concluir</button>
        <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>`;
        
        listElement.appendChild(tarefaElement);
    });
}
function adicionarTarefa() {
    const nomeTarefa = document.getElementById('novaTarefa').value;
    const dataTarefa = document.getElementById('dataTarefa').value;

    if (nomeTarefa) {
        criarTarefa(nomeTarefa,dataTarefa);
        document.getElementById('novaTarefa').value = '';
        document.getElementById('dataTarefa').value = '';
    } else {
        alert("Preencha o campo de tarefa antes de adicionar.");
    }
}

const dataAtual = new Date()

flatpickr("#dataTarefa", {
    enableTime: true,
    dateFormat: "d/m/Y H:i",
    minDate: dataAtual
});