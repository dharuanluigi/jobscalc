const Database = require('./configDB')

// just for development implements
const initDB_DEV = {
    async init() {
        await this.createProfile()
        await this.insertDefaultProfile()
    },
    async createProfile() {
        const connector = await Database()

        await connector.run(`
            CREATE TABLE Profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthy_budget FLOAT,
                hours_per_day INT,
                days_per_week INT,
                vacation_per_year INT,
                hour_value FLOAT
            );
        `)

        await connector.close()
    },
    async insertDefaultProfile() {
        const connector = await Database()

        await connector.run(`
            INSERT INTO Profile VALUES (
                NULL,
                "Dharuan Luigi",
                "https://github.com/dharuanluigi.png",
                3000,
                8,
                5,
                4,
                50
          );
        `)

        await connector.close()
    }
}

initDB_DEV.init()