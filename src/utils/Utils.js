module.exports = {
    checkFields(fields) {
        let isEmpty = false

        // verify if a field has an empty value
        Object.keys(fields).forEach((field) => {
            if(!fields[field]) {
                isEmpty = true 
            }
        })

        return isEmpty
    },
    
}