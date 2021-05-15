const btn_save = document.getElementById('btnSave')
btn_save.addEventListener('click', checkFields)

function checkFields() {
    const fields = document.getElementsByTagName('input')
    for(let field of fields) {
        if(isEmpty(field)) {
            window.alert('Todos os campos devem ser preenchidos!')
        }
    }
}

function isEmpty(field) {
    return field.value == ''
}