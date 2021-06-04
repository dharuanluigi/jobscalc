const btn_save = document.getElementById('btnSave')
btn_save.addEventListener('click', checkFields)

function checkFields() {
    const fields = document.getElementsByTagName('input')
    
    // verify if fields are empty
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
    return field.value == '' || field.value.trim().length == 0
}

function nameLengthVer(field) {
    const content = field.value
    return content.trim().length > 30
}