class QueryManager {

    constructor(pSql, pValues = []) {
        this.sql = pSql;
        this.values = pValues;
    }

    executeQuery() {
        return new Promise((resolve, reject) => {
            db.query(this.sql, this.values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
        });
    }

    executeQueryOne() {
        return new Promise((resolve, reject) => {
            db.query(this.sql, this.values, (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) return resolve(null);
                resolve(result[0]);
            })
        });
    }

}

module.exports = QueryManager;