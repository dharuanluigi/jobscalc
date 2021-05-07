const Driver = require('sqlite3')
const { open } = require('sqlite')

module.exports = () => open({
    filename: 'database.sqlite',
    driver: Driver.Database
})