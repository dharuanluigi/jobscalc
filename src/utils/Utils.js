module.exports = {
    checkFields(fields) {
        let isEmpty = false

        // verify if a field has an empty value
        Object.keys(fields).forEach((field) => {
            if(!fields[field] || fields[field].trim().length == 0) {
                isEmpty = true 
            }
        })

        return isEmpty
    },
    nameLengthVerif(fields) {
        return fields.name.trim().length <= 30
    }
}