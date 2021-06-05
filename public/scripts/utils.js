export function nameLengthVer(field) {
    const content = field.value
    return content.trim().length > 30
}

export function isEmpty(fields) {
    let empty_value = false

    for(let field of fields) {
        if(field.value == '' || field.value.trim().length == 0) {
            empty_value = true
        }
    }

    return empty_value
}