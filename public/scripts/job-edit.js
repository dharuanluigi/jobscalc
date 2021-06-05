import Modal from './modal.js';
import {nameLengthVer} from './utils.js'
import {isEmpty} from './utils.js'

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

document
  .querySelector('.open-modal')
  .addEventListener('click', modal.open)

// add field validation
const btn_save = document.getElementById('btnSave')
btn_save.addEventListener('click', checkFields)

function checkFields() {
  const fields = document.getElementsByTagName('input')

  if(isEmpty(fields)) {
      window.alert('Todos os campos devem ser preenchidos!')
  }

  const inputName = document.getElementById('name')
    if(nameLengthVer(inputName)) {
        window.alert('O nome não pode ter mais que 30 caracteres!')
    }
}