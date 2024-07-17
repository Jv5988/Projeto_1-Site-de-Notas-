const navbar = document.querySelector(".navbar")
const menuButton = document.querySelector(".menu-button")

menuButton.addEventListener("click", () =>{
    navbar.classList.toggle("show-menu")
})


let inputNovaTarefa = document.querySelector("#inputNovaTarefa");
let btnAddTarefa = document.querySelector("#btnAddTarefa");
let listaTarefas = document.querySelector("#listaTarefas");
let janelaEdicaoFechar = document.querySelector("#janelaEdicaoBtnFechar");
let btnAtualizarTarefa = document.querySelector("#btnAtualizarTarefa");
let idTarefaEdicao = document.querySelector("#IdTarefaEdicao");
let inputTarefaNomeEdicao = document.querySelector("#inputTarefaNomeEdicao");

inputNovaTarefa.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) { 
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        };
        adicionarTarefa(tarefa);
    }
});

btnAddTarefa.addEventListener("click", (e) => {
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),
    };
    adicionarTarefa(tarefa);
});

function gerarId() {
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa) {
    let li = criarTagLi(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = "";
}

function criarTagLi(tarefa) {
    let li = document.createElement("li");
    li.id = tarefa.id;

    let span = document.createElement("span");
    span.classList.add("textoTarefa");
    span.textContent = tarefa.nome;

    let div = document.createElement("div");

    let btnEditar = document.createElement("button");
    btnEditar.classList.add("btnAcao");
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.addEventListener("click", () => editar(tarefa.id));

    let btnExcluir = document.createElement("button");
    btnExcluir.classList.add("btnAcao");
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.addEventListener("click", () => excluir(tarefa.id));

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    
    return li;
}

function editar(idTarefa) {
    let li = document.getElementById(`${idTarefa}`);
    if (li) {
        idTarefaEdicao.textContent = "#" + idTarefa;
        inputTarefaNomeEdicao.value = li.querySelector(".textoTarefa").textContent;

        alternarJanelaEdicao();
    } else {
        alert("Elemento não encontrado");
    }
}

function excluir(idTarefa) {
    let confirmacao = window.confirm("Tem certeza que deseja excluir?");
    if (confirmacao) {
        let li = document.getElementById(`${idTarefa}`);
        if (li) {
            listaTarefas.removeChild(li);
        } else {
            alert("Elemento não encontrado");
        }
    }
}

function alternarJanelaEdicao() {
    let janelaEdicao = document.querySelector("#janelaEdicao");
    let janelaEdicaoFundo = document.querySelector("#janelaEdicaoFundo");

    janelaEdicao.classList.toggle("abrir");
    janelaEdicaoFundo.classList.toggle("abrir");
}

janelaEdicaoFechar.addEventListener("click", alternarJanelaEdicao);

btnAtualizarTarefa.addEventListener("click", (e) => {
    e.preventDefault(); 

    let idTarefa = idTarefaEdicao.textContent.replace("#", "");

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    };

    let tarefaAtual = document.getElementById(`${idTarefa}`);

    if (tarefaAtual) {
        let li = criarTagLi(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } else {
        alert("Elemento não encontrado");
    }
});

let el = document.querySelector(".number-days");
for (let i = 1; i <= 31; i++) {
    let day = document.createElement("span");
    day.innerText = i;
    day.addEventListener("click", () => openReminderForm(i));
    el.appendChild(day);
}

function openReminderForm(day) {
    document.querySelector(".reminder-form").style.display = "block";
    document.querySelector("#selected-day").value = day;}

document.querySelector("#reminder-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let day = document.querySelector("#selected-day").value;
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#description").value;

    addReminder(day, title, description);

    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";

    document.querySelector(".reminder-form").style.display = "none";

});

function addReminder(day, title, description) {
    let reminderList = document.querySelector("#reminder-list");
    let listItem = document.createElement("li");
    listItem.innerText = `Dia ${day}: ${title} - ${description}`;
    reminderList.appendChild(listItem);
}

document.querySelector("#search-button").addEventListener("click", function () {
    let day = document.querySelector("#search-day").value;
    searchReminder(day);
});

function searchReminder(day) {
    let reminderList = document.querySelectorAll("#reminder-list li");
    let remindersForDay = [];
    reminderList.forEach(function (reminder) {
        if (reminder.innerText.includes(`Dia ${day}:`)) {
            remindersForDay.push(reminder.innerText);
        }
    });

    if (remindersForDay.length > 0) {
        alert("Lembretes:\n" + remindersForDay.join("\n"));
    } else {
        alert("Nenhum lembrete encontrado para o dia " + day + ".");
    }
}