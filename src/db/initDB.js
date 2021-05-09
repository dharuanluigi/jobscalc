const Database = require('./configDB')

// just for development implements
const initDB_DEV = {
    async init() {
        await this.createProfile()
        await this.insertDefaultProfile()
        await this.createJobs()
        await this.insertDefaultJobs()
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
                0,
                0,
                0,
                0,
                0
          );
        `)

        await connector.close()
    },
    async createJobs() {
        const connector = await Database()

        await connector.run(`
            CREATE TABLE Jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME,
                dueDate INT,
                budget FLOAT
            );
        `)

        await connector.close()
    },
    async insertDefaultJobs() {
        const connector = await Database()

        await connector.run(`
            INSERT INTO Jobs VALUES (
                NULL,
                "Pizzaria Guloso OverPower",
                0,
                0,
                1620517789137,
                0,
                0
            );
        `)

        await connector.close()
    }
}

initDB_DEV.init()