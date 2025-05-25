
const mysql2 = require('mysql2');
var cognitive = require('./cognitive');

module.exports = {
    registration: function (req, res, app, pool) {
        app.locals.registeredUsers = [];
        const { index } = req.params;
        const config = {
            host: 'localhost',
            user: 'postgraduate_study',
            database: 'postgraduate_study',
            password: 'Qis-WKe-5si-J7E',
        };
        if (req.body) {
            if (cognitive.checkUser(+index, req, res, pool)) {
                executeTransaction()
            } else {
                res.redirect(`http://localhost:3001/exit`)
            }
        } else res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);

        async function executeTransaction() {
            const connection = await mysql2.createConnection(config).promise();;
            const keys = Object.keys(req.body);
            const length = keys.length;
            let usersArr = [];

            for (let i = 0; i < (length / 7); i++) {
                usersArr[i] = {
                    lastname: req.body[keys[i * 7]],
                    firstname: req.body[keys[i * 7 + 1]],
                    patronymic: req.body[keys[i * 7 + 2]],
                    departmentID: req.body[keys[i * 7 + 3]],
                    specialtyID: req.body[keys[i * 7 + 4]],
                    scientificSupervisorID: req.body[keys[i * 7 + 5]],
                    yearofadmission: req.body[keys[i * 7 + 6]],
                }
            }
            const sql1 = `INSERT INTO users (userID, firstname, patronymic, lastname, role, blocking) VALUES `
            const sql2 = `INSERT INTO credentials (username, password, userID) VALUES `
            const sql3 = `INSERT INTO graduatestudents (userID, scientificSupervisorID, department, specialty, yearofadmission)
                            VALUES  `
            usersArr.map(async function (u, index) {
                await connection.beginTransaction();
                try {
                    const { lastname, firstname, patronymic, departmentID, specialtyID, scientificSupervisorID, yearofadmission } = u
                    const [result2] = await connection.query(sql1 + `(NULL, '${firstname}', ${patronymic ? (`'` + patronymic + `'`) : `NULL`}, '${lastname}', 1, 0)`);
                    const userID = result2.insertId;
                    const login = cognitive.transliterate(lastname + "_" + firstname + "_" + patronymic + "_stud");
                    const passwordSrting = cognitive.generatePassword();
                    const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                    await connection.query(sql2 + `('${login}', '${passwordHash}', ${userID})`);
                    await connection.query(sql3 + `(${userID}, ${scientificSupervisorID}, ${departmentID}, ${specialtyID}, ${yearofadmission})`);
                    app.locals.registeredUsers[index] = [login, passwordSrting, passwordHash];
                    await connection.commit();
                    console.log('Transaction Completed Successfully.');
                } catch (err) {
                    await connection.rollback();
                    console.error('Transaction Failed:', err);
                } finally {
                    await connection.end();
                }
            })
            await res.redirect(`http://localhost:3000/successfulRegistration/${req.session.this_user}/file`);
        }
    },
}