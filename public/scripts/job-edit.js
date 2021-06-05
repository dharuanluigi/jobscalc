import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

document
  .querySelector('.open-modal')
  .addEventListener('click', modal.open)

// add field validation
const btn_save = document.getElementById('btnSave')
btn_save.addEventListener('click', checkFields)

function checkFields() {
  const fields = document.getElementsByTagName('input')
  let empty_value = false

  for(let field of fields) {
      if(isEmpty(field)) {
          empty_value = true
      }
  }

  if(empty_value) {
      window.alert('Todos os campos devem ser preenchidos!')
  }

  const inputName = document.getElementById('name')
    if(nameLengthVer(inputName)) {
        window.alert('O nome não pode ter mais que 30 caracteres!')
    }
}

function isEmpty(field) {
  return field.value == ''
}

function nameLengthVer(field) {
  const content = field.value
  return content.trim().length > 30
}