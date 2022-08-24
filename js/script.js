const newForm = document.getElementById('newForm')
const editForm = document.getElementById('editForm')

const novaTarefaI = document.getElementById('nomeJob')
const novaTarefaD = document.getElementById('dateJob')
const btnNovaTarefa = document.getElementById('btnNewJob')

const editarTarefaI = document.getElementById('eNomeJob')
const editarTarefaD = document.getElementById('eDateJob')
const btnEditarTarefa = document.getElementById('btnEditJob')
const btnCancelEditarTarefa = document.getElementById('btnCancelEditJob')
const btnClearSearch = document.getElementById('clearSearch')
const btnRemoveCard = document.querySelector('removeToDo')

const toDoList = document.getElementById('toDoList')
const dataTarefa = document.getElementById('data')

const searchFilter = document.getElementById('toolBar')
let oldInputData 
let oldInputText 

newForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const inputNome = novaTarefaI.value
  const inputData = novaTarefaD.value

  if (verificarCampo(inputNome, inputData) != true) {
    saveJob(inputNome,inputData)
  } else {
    return 
  }

})

function verificarCampo (iText,iDate) {
  if(iText == '' || iDate == '' ) {
    return true
  } else {
    return false
  }
}

function saveJob (job,dtJob) {

  saveStorage (job,dtJob)

  createCard(job, dtJob)

  setTimeout(clearInput(novaTarefaI, novaTarefaD), 50000)

}

function clearInput (inputT, inputD) {
  inputT.value = '';
  inputD.value = ''
}

document.addEventListener('click', (e) => {
  const targetEl = e.target
  const parentEl = targetEl.closest('div.cardToDo')

  let toDoTitle
  let toDoData 

  if(parentEl && parentEl.querySelector('h3')) {
    toDoTitle = parentEl.querySelector('h3').innerText
  }

  if(parentEl && parentEl.querySelector('p')) {
    toDoData = parentEl.querySelector('p').innerText
  }

  if(targetEl.classList.contains('finishToDo')) {
    if (parentEl.classList.toggle('done')) {
      localStorage.setItem('filizado', 's')
    } else {
      localStorage.removeItem('filizado')
    }
  }

  if(targetEl.classList.contains('editToDo')) {
    showForm()

    editarTarefaI.value = toDoTitle
    oldInputText = toDoTitle

    editarTarefaD.value = toDoData.substr(0, 10).split('/').reverse().join('-')
    oldInputData = toDoData
  }

  if(targetEl.classList.contains('removeToDo')) {
    parentEl.remove()
    removeStorage(toDoTitle, toDoData)
  }
  
})

function showForm () {
  editForm.classList.toggle('hide')
  newForm.classList.toggle('hide')
  toDoList.classList.toggle('hide')
  searchFilter.classList.toggle('hide')
}

btnCancelEditarTarefa.addEventListener('click', (e) => {
  e.preventDefault()

  showForm()
})

editForm.addEventListener('submit',(e) => {
  e.preventDefault()

  const editNome = editarTarefaI.value
  const editData = editarTarefaD.value

  if (verificarCampo(editNome, editData) != true) {
    upDateJob(editNome,editData)
  } else {
    return 
  }

  showForm()

})

function upDateJob (editT, editD) {

  const listToDo = document.querySelectorAll('.cardToDo')

  listToDo.forEach((toDoT) => {
    let toDoTitle = toDoT.querySelector('h3')

    if(toDoTitle.innerText == oldInputText) {
      toDoTitle.innerText = editT
    }
  })

  listToDo.forEach((toDoD) => {
    let toDoData = toDoD.querySelector('p')

    if(toDoData.innerText == oldInputData) {
      toDoData.innerText = editD.substr(0, 10).split('-').reverse().join('/')
    }
  })

  saveStorage (editT, editD)

}

function saveStorage (j, d) {
  localStorage.setItem('tarefa', j)
  localStorage.setItem('dt_tarefa', d)
}

btnClearSearch.addEventListener('click', () => {
  clearSearch()
})

function clearSearch () {
  const input = document.getElementById('searchJob')

  input.value = ''
}

onload( getInformation() )

function getInformation () {
  let tarefa = localStorage.getItem('tarefa')
  let data = localStorage.getItem('dt_tarefa')

  createCard (tarefa, data)
}

function createCard ( job, dtJob ) {

  const card = document.createElement('div')
  card.classList.add('cardToDo')

  const dtTarefa = document.createElement('p')
  dtTarefa.innerText = `${dtJob.substr(0, 10).split('-').reverse().join('/')}`

  card.appendChild(dtTarefa)

  const contJob = document.createElement('div')
  contJob.classList.add('job')

  card.appendChild(contJob)

  const titleCard = document.createElement('h3')
  titleCard.innerText = `${job}`

  contJob.appendChild(titleCard)

  const btnsCard = document.createElement('div')
  btnsCard.classList.add('btnCard')

  contJob.appendChild(btnsCard)

  const btnDone = document.createElement('button')
  btnDone.classList.add('finishToDo')
  btnDone.innerHTML = '<i class="fa-solid fa-check"></i>'

  const btnEdit = document.createElement('button')
  btnEdit.classList.add('editToDo')
  btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'

  const btnRemove = document.createElement('button')
  btnRemove.classList.add('removeToDo')
  btnRemove.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

  btnsCard.appendChild(btnDone)
  btnsCard.appendChild(btnEdit)
  btnsCard.appendChild(btnRemove)

  toDoList.appendChild(card)

}

function removeStorage (text, data) {
  localStorage.removeItem('tarefa', text)
  localStorage.removeItem('dt_tarefa', data)
}


