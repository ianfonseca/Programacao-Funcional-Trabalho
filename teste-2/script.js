let tarefas = [];
let proximoId = 1;

function criarTarefa(nome, descricao) {
    const novaTarefa = {
        id: proximoId++,
        nome,
        descricao,
        concluida: false
    };
    tarefas = [...tarefas, novaTarefa]; // Cria uma nova lista com a tarefa adicionada
    atualizarListaDeTarefas();
}

function atualizarTarefa(id) {
    tarefas = tarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, concluida: true } : tarefa
    ); // Cria uma nova lista com a tarefa atualizada
    atualizarListaDeTarefas();
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id); // Cria uma nova lista sem a tarefa excluída
    atualizarListaDeTarefas();
}

function obterTarefasPendentes() {
    return tarefas.filter(tarefa => !tarefa.concluida);
}

function atualizarListaDeTarefas() {
    const listElement = document.getElementById('lista');
    listElement.innerHTML = '';

    tarefas.forEach(tarefa => {
        const tarefaElement = document.createElement('div');
        tarefaElement.classList.add('tarefa-item');
        tarefaElement.innerHTML = `
            <span>${tarefa.id}. ${tarefa.nome} (${tarefa.concluida ? 'Concluída' : 'Pendente'})</span>
            <button onclick="atualizarTarefa(${tarefa.id})">Marcar como Concluída</button>
            <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
        `;
        listElement.appendChild(tarefaElement);
    });
}

function adicionarTarefa() {
    const nomeTarefa = document.getElementById('nome-tarefa').value;
    const descricaoTarefa = document.getElementById('descricao-tarefa').value;

    if (nomeTarefa && descricaoTarefa) {
        criarTarefa(nomeTarefa, descricaoTarefa);
        document.getElementById('nome-tarefa').value = '';
        document.getElementById('descricao-tarefa').value = '';
    } else {
        alert("Preencha os campos obrigatórios antes de adicionar uma nova tarefa");
    }
}