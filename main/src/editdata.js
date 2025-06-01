
const mysql2 = require('mysql2');
var cognitive = require('./cognitive');

module.exports = {
    newdepartment: function (req, res, pool) {
        const { index } = req.params;
        if (req.body) {
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { facultyID, department } = req.body;
                pool.execute(`INSERT INTO departments (departmentID, name, faculty) VALUES  (NULL, '${department}', ${+facultyID})`)
                    .then(result => {

                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }

    },
    editdepartment: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { department_id, department, facultyID } = req.body;
                pool.execute(`UPDATE departments SET name = '${department}',faculty = ${facultyID}  WHERE departments.departmentID = ${department_id};`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    deletedepartment: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { departmentID } = req.body;
                pool.execute(`DELETE FROM departments WHERE departments.departmentID = ${departmentID}`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Delete`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    newfaculty: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            const check = cognitive.checkUser(+index, req, res, pool)
            if (check) {
                const { id, faculty } = req.body;
                pool.execute(`INSERT INTO faculties (facultyID, name) VALUES  (${id}, '${faculty}')`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else {
                res.redirect(`http://localhost:3001/exit`);
            }
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    editfaculty: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { facultyID, id, faculty } = req.body;
                pool.execute(`UPDATE faculties SET name = '${faculty}',facultyID = ${id}  WHERE faculties.facultyID = ${facultyID}`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    deletefaculty: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { facultyID } = req.body;
                pool.execute(`DELETE FROM faculties WHERE faculties.facultyID = ${facultyID}`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Delete`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    newspecialty: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { specialty } = req.body;
                pool.execute(`INSERT INTO specialties (specialtyID, name) VALUES  (NULL, '${specialty}')`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    editspecialty: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { specialtyID, specialty } = req.body;
                pool.execute(`UPDATE specialties SET name = '${specialty}' WHERE specialties.specialtyID = ${specialtyID}`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    deletespecialty: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { specialtyID } = req.body;
                pool.execute(`DELETE FROM specialties WHERE specialties.specialtyID = ${specialtyID}`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Delete`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    registration: function (req, res, app, pool) {
        const { index, role } = req.params;
        const config = {
            host: 'localhost',
            user: 'postgraduate_study',
            database: 'postgraduate_study',
            password: 'Qis-WKe-5si-J7E',
        };
        if (req.body) {
            if (cognitive.checkUser(+index, req, res, pool)) {
                switch (+role) {
                    case 1:
                        executeTransaction1();
                        break
                    case 2:
                        executeTransaction2();
                        break
                    case 3:
                        executeTransaction3();
                        break
                    case 4:
                        executeTransaction4();
                        break
                    default:
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                        break
                }
            } else {
                res.redirect(`http://localhost:3001/exit`)
            }
        } else res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);

        async function executeTransaction1() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { lastname, firstname, patronymic, departmentID, specialtyID, scientificSupervisorID, yearofadmission } = req.body;
                if (departmentID == 'none' || specialtyID == 'none' || scientificSupervisorID == 'none') res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`)
                else {
                    if (patronymic) {
                        const [result1] = await connection.query(`SELECT userID FROM users WHERE firstname ='${firstname}' AND patronymic = '${patronymic}' AND lastname ='${lastname}' AND role = 1`)
                        if (result1.length > 0) {
                            await connection.rollback();
                            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/FIO`);
                        } else {
                            const [result2] = await connection.query(`INSERT INTO users (userID, firstname, patronymic, lastname, role, blocking) VALUES  (NULL,'${firstname}', '${patronymic}', '${lastname}', 1, 0)`)
                            const userID = result2.insertId;
                            const login = cognitive.transliterate(lastname + "_" + firstname + "_" + patronymic + "_stud");
                            const passwordSrting = cognitive.generatePassword();
                            const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                            await connection.query(`INSERT INTO credentials (username, password, userID) VALUES  ('${login}','${passwordHash}',${userID})`)
                            await connection.query(`INSERT INTO graduatestudents (userID, scientificSupervisorID, department, specialty, yearofadmission)
                            VALUES  (${userID}, ${scientificSupervisorID}, ${departmentID}, ${specialtyID}, ${yearofadmission})`)
                            app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                            await res.redirect(`http://localhost:3000/successfulRegistration/${req.session.this_user}/one`);
                            await connection.commit();
                            console.log('Transaction Completed Successfully.');

                        }
                    } else {
                        const [result1] = await connection.query(`SELECT userID FROM users WHERE firstname ='${firstname}' AND patronymic = NULL AND lastname ='${lastname}' AND role = 1`)
                        if (result1.length > 0) {
                            await connection.rollback();
                            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/FIO`);
                        } else {
                            const [result2] = await connection.query(`INSERT INTO users (userID, firstname, patronymic, lastname, role, blocking) VALUES  (NULL,'${firstname}', NULL, '${lastname}', 1, 0)`)
                            const userID = result2.insertId;
                            const login = cognitive.transliterate(lastname + "_" + firstname + "_stud");
                            const passwordSrting = cognitive.generatePassword();
                            const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                            await connection.query(`INSERT INTO credentials (username, password, userID) VALUES  ('${login}','${passwordHash}',${userID})`)
                            await connection.query(`INSERT INTO graduatestudents (userID, scientificSupervisorID, department, specialty, yearofadmission)
                            VALUES  (${userID}, ${scientificSupervisorID}, ${departmentID}, ${specialtyID}, ${yearofadmission})`)
                            app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                            await res.redirect(`http://localhost:3000/successfulRegistration/${req.session.this_user}/one`);

                            await connection.commit();
                            console.log('Transaction Completed Successfully.');
                        }
                    }
                }
            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }

        }
        async function executeTransaction2() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { lastname, firstname, patronymic, facultyID, departmentID } = req.body;
                if (patronymic) {
                    const [result1] = await connection.query(`SELECT userID FROM users WHERE firstname ='${firstname}' AND patronymic = '${patronymic}' AND lastname ='${lastname}' AND role = 2`)
                    if (result1.length > 0) {
                        await connection.rollback();
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/FIO`);
                    } else {
                        const [result2] = await connection.query(`INSERT INTO users (userID, firstname, patronymic, lastname, role, blocking) VALUES  (NULL,'${firstname}', '${patronymic}', '${lastname}', 2, 0)`)
                        const userID = result2.insertId;
                        const login = cognitive.transliterate(lastname + "_" + firstname + "_" + patronymic + "_sciens");
                        const passwordSrting = cognitive.generatePassword();
                        const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                        await connection.query(`INSERT INTO credentials (username, password, userID) VALUES  ('${login}','${passwordHash}',${userID})`)
                        await connection.query(`INSERT INTO affiliation (userID, department, faculty) VALUES  (${userID},${departmentID == 'NULL' || departmentID == 'none' ? 'NULL' : departmentID},${facultyID == 'NULL' || facultyID == 'none' ? 'NULL' : facultyID})`)
                        app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                        await res.redirect(`http://localhost:3000/successfulRegistration/${req.session.this_user}/one`);
                        await connection.commit();
                        console.log('Transaction Completed Successfully.');

                    }
                } else {
                    const [result1] = await connection.query(`SELECT userID FROM users WHERE firstname ='${firstname}' AND patronymic = NULL AND lastname ='${lastname}' AND role = 2`)
                    if (result1.length > 0) {
                        await connection.rollback();
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/FIO`);
                    } else {
                        const [result2] = await connection.query(`INSERT INTO users (userID, firstname, patronymic, lastname, role, blocking) VALUES  (NULL,'${firstname}', NULL, '${lastname}', 2, 0)`)
                        const userID = result2.insertId;
                        const login = cognitive.transliterate(lastname + "_" + firstname + "_sciens");
                        const passwordSrting = cognitive.generatePassword();
                        const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                        await connection.query(`INSERT INTO credentials (username, password, userID) VALUES  ('${login}','${passwordHash}',${userID})`)
                        await connection.query(`INSERT INTO affiliation (userID, department, faculty) VALUES  (${userID},${departmentID == 'NULL' || departmentID == 'none' ? 'NULL' : departmentID},${facultyID == 'NULL' || facultyID == 'none' ? 'NULL' : facultyID})`)
                        app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                        await res.redirect(`http://localhost:3000/successfulRegistration/${req.session.this_user}/one`);

                        await connection.commit();
                        console.log('Transaction Completed Successfully.');
                    }
                }
            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }
        }
        async function executeTransaction3() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { lastname, firstname, patronymic, facultyID, departmentID } = req.body;
                if (patronymic) {
                    const [result1] = await connection.query(`SELECT userID FROM users WHERE firstname ='${firstname}' AND patronymic = '${patronymic}' AND lastname ='${lastname}' AND role = 3`)
                    if (result1.length > 0) {
                        await connection.rollback();
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/FIO`);
                    } else {
                        const [result2] = await connection.query(`INSERT INTO users (userID, firstname, patronymic, lastname, role, blocking) VALUES  (NULL,'${firstname}', '${patronymic}', '${lastname}', 3, 0)`)
                        const userID = result2.insertId;
                        const login = cognitive.transliterate(lastname + "_" + firstname + "_" + patronymic + "_agent");
                        const passwordSrting = cognitive.generatePassword();
                        const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                        await connection.query(`INSERT INTO credentials (username, password, userID) VALUES  ('${login}','${passwordHash}',${userID})`)
                        await connection.query(`INSERT INTO affiliation (userID, department, faculty) VALUES  (${userID},${departmentID == 'NULL' || departmentID == 'none' ? 'NULL' : departmentID},${facultyID == 'NULL' || facultyID == 'none' ? 'NULL' : facultyID})`)
                        app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                        await res.redirect(`http://localhost:3000/successfulRegistration/${req.session.this_user}/one`);
                        await connection.commit();
                        console.log('Transaction Completed Successfully.');

                    }
                } else {
                    const [result1] = await connection.query(`SELECT userID FROM users WHERE firstname ='${firstname}' AND patronymic = NULL AND lastname ='${lastname}' AND role = 3`)
                    if (result1.length > 0) {
                        await connection.rollback();
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/FIO`);
                    } else {
                        const [result2] = await connection.query(`INSERT INTO users (userID, firstname, patronymic, lastname, role, blocking) VALUES  (NULL,'${firstname}', NULL, '${lastname}', 3, 0)`)
                        const userID = result2.insertId;
                        const login = cognitive.transliterate(lastname + "_" + firstname + "_agent");
                        const passwordSrting = cognitive.generatePassword();
                        const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                        await connection.query(`INSERT INTO credentials (username, password, userID) VALUES  ('${login}','${passwordHash}',${userID})`)
                        await connection.query(`INSERT INTO affiliation (userID, department, faculty) VALUES  (${userID},${departmentID == 'NULL' || departmentID == 'none' ? 'NULL' : departmentID},${facultyID == 'NULL' || facultyID == 'none' ? 'NULL' : facultyID})`)
                        app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                        await res.redirect(`http://localhost:3000/successfulRegistration/${req.session.this_user}/one`);

                        await connection.commit();
                        console.log('Transaction Completed Successfully.');

                    }
                }
            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }
        }
        async function executeTransaction4() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { lastname, firstname, patronymic } = req.body;
                if (patronymic) {
                    const [result1] = await connection.query(`SELECT userID FROM users WHERE firstname ='${firstname}' AND patronymic = '${patronymic}' AND lastname ='${lastname}' AND role = 4`)
                    if (result1.length > 0) {
                        await connection.rollback();
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/FIO`);
                    } else {
                        const [result2] = await connection.query(`INSERT INTO users (userID, firstname, patronymic, lastname, role, blocking) VALUES  (NULL,'${firstname}', '${patronymic}', '${lastname}', 4, 0)`)
                        const userID = result2.insertId;
                        const login = cognitive.transliterate(lastname + "_" + firstname + "_" + patronymic + "_admin")

                        const passwordSrting = cognitive.generatePassword();
                        const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();

                        await connection.query(`INSERT INTO credentials (username, password, userID) VALUES  ('${login}','${passwordHash}',${userID})`)
                        app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                        await res.redirect(`http://localhost:3000/successfulRegistration/${req.session.this_user}/one`);

                        await connection.commit();
                        console.log('Transaction Completed Successfully.');
                    }

                } else {
                    const [result1] = await connection.query(`SELECT userID FROM users WHERE firstname ='${firstname}' AND patronymic = NULL AND lastname ='${lastname}' AND role = 4`)
                    if (result1.length > 0) {
                        await connection.rollback();
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/FIO`);
                    } else {
                        const [result2] = await connection.query(`INSERT INTO users (userID, firstname, patronymic, lastname, role, blocking) VALUES  (NULL,'${firstname}', NULL, '${lastname}', 4, 0)`)
                        const userID = result2.insertId;
                        const login = cognitive.transliterate(lastname + "_" + firstname + "_admin")

                        const passwordSrting = cognitive.generatePassword();
                        const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();

                        await connection.query(`INSERT INTO credentials (username, password, userID) VALUES  ('${login}','${passwordHash}',${userID})`)
                        app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                        await res.redirect(`http://localhost:3000/successfulRegistration/${req.session.this_user}/one`);

                        await connection.commit();
                        console.log('Transaction Completed Successfully.');
                    }
                }
            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }
        }

    },
    successfulRegistrationOne: function (req, res, pool, registeredUsers) {
        const [username, password, passwordHash] = registeredUsers[0];
        let user
        pool.execute(`SELECT userID FROM  credentials WHERE username = '${username}' AND password = '${passwordHash}'`)
            .then(result => {
                pool.execute(`SELECT firstname, patronymic, lastname FROM users WHERE userID = ${result[0][0].userID}`)
                    .then(result => {

                        user = {
                            firstname: result[0][0].firstname,
                            patronymic: result[0][0].patronymic,
                            lastname: result[0][0].lastname,
                            username: username,
                            password: password
                        }
                        res.json(user)
                    }
                    )
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    blocking: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            const check = cognitive.checkUser(+index, req, res, pool)
            if (check) {
                const { users, block } = req.body;
                if (block == 'none') res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
                else {
                    if (users instanceof Array) {
                        pool.execute(`UPDATE users SET blocking = ${block} WHERE userID IN(${users.join(',')})`)
                            .then(result => {
                                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                            })
                            .catch(function (err) {
                                console.log(err.message);
                                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                            })
                    } else {
                        pool.execute(`UPDATE users SET blocking = ${block} WHERE userID = ${users}`)
                            .then(result => {
                                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                            })
                            .catch(function (err) {
                                console.log(err.message);
                                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                            })
                    }
                }
            } else {
                res.redirect(`http://localhost:3001/exit`);
            }
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    changepassword: async function (req, res, app, pool) {
        if (req.body) {
            const { index } = req.params;
            const check = cognitive.checkUser(+index, req, res, pool)
            if (check) {
                const { users } = req.body;
                if (users instanceof Array) {
                    let passwords = []

                    for (let i = 0; i < users.length; i++) {
                        passwordSrting = cognitive.generatePassword();
                        passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                        passwords[i] = [passwordSrting, passwordHash]
                    }
                    data = await pool.query(`SELECT username, userID FROM credentials`);
                    dataUsers = data[0];
                    await users.map((user, index) => pool.query(`UPDATE credentials                     
                    SET password = '${passwords[index][1]}' WHERE userID = ${user}`))

                    app.locals.registeredUsers = []
                    for (let i = 0; i < users.length; i++) {
                        app.locals.registeredUsers[i] = [dataUsers.find(x => x.userID == users[i]).username,
                        passwords[i][0], passwords[i[1]]];
                    }
                    await res.redirect(`http://localhost:3000/change/${req.session.this_user}/p`);
                } else {

                    passwordSrting = cognitive.generatePassword();
                    passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();

                    data = await pool.query(`SELECT username, userID FROM credentials WHERE userID = ${users}`);
                    dataUsers = data[0][0];
                    await pool.query(`UPDATE credentials                     
                    SET password = '${passwordHash}' WHERE userID = ${users}`)
                    app.locals.registeredUsers = [[dataUsers.username, passwordSrting, passwordHash]]
                    await res.redirect(`http://localhost:3000/change/${req.session.this_user}/p`);
                }
            } else {
                res.redirect(`http://localhost:3001/exit`);
            }
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    successfulchange: function (res, registeredUsers) {
        data = []
        for (let i = 0; i < registeredUsers.length; i++) {
            data[i] = {
                username: registeredUsers[i][0],
                password: registeredUsers[i][1]
            }

        }
        res.json(data)

    },
    changeUserData: function (req, res, app, pool) {
        const config = {
            host: 'localhost',
            user: 'postgraduate_study',
            database: 'postgraduate_study',
            password: 'Qis-WKe-5si-J7E',
        };
        if (req.body) {
            const { index, type } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                switch (type) {
                    case '1': executeTransaction1();
                        break;
                    case '2': executeTransaction2();
                        break;
                    case '3': executeTransaction3();
                        break;
                    case '4': executeTransaction4();
                        break;
                    default: break;
                }
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }

        async function executeTransaction1() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { lastname, firstname, patronymic, user, role } = req.body;
                if (patronymic) {
                    await connection.query(`UPDATE users SET lastname = '${lastname}', firstname = '${firstname}', patronymic = '${patronymic}', role = ${role} WHERE userID = ${user}`)
                    const login = cognitive.transliterate(lastname + "_" + firstname + "_" + patronymic + (role == '1' ? "_stud" : (role == '2' ? "_sciens" : (role == '3' ? "_agent" : "_admin"))));
                    const passwordSrting = cognitive.generatePassword();
                    const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                    await connection.query(`UPDATE credentials SET username = '${login}', password ='${passwordHash}' WHERE userID = ${user}`)

                    app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                    await res.redirect(`http://localhost:3000/change/${req.session.this_user}/p`);
                    await connection.commit();
                    console.log('Transaction Completed Successfully.');
                } else {
                    await connection.query(`UPDATE users SET lastname = '${lastname}', firstname = '${firstname}', patronymic = NULL WHERE userID = ${user}`)
                    const login = cognitive.transliterate(lastname + "_" + firstname + (role == '1' ? "_stud" : (role == '2' ? "_sciens" : (role == '3' ? "_agent" : "_admin"))));
                    const passwordSrting = cognitive.generatePassword();
                    const passwordHash = (await cognitive.getSHA256Hash(passwordSrting)).toString();
                    await connection.query(`UPDATE credentials SET username = '${login}', password ='${passwordHash}' WHERE userID = ${user}`)

                    app.locals.registeredUsers = [[login, passwordSrting, passwordHash]];
                    await res.redirect(`http://localhost:3000/change/${req.session.this_user}/p`);
                    await connection.commit();
                    console.log('Transaction Completed Successfully.');
                }
            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }
        }
        async function executeTransaction2() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { user, yearofadmission, scientificSupervisorID, specialtyID, departmentID } = req.body;
                const [result1] = await connection.query(`SELECT * FROM graduatestudents WHERE userID = ${user}`);
                if (result1.length > 0) {
                    await connection.query(`UPDATE graduatestudents SET scientificSupervisorID = ${scientificSupervisorID}, department = ${departmentID}, specialty = ${specialtyID}, yearofadmission = ${yearofadmission} WHERE userID = ${user}`)
                } else await connection.query(`INSERT INTO graduatestudents (userID, scientificSupervisorID, department, specialty, yearofadmission)
                                                                    VALUES (${user}, ${scientificSupervisorID}, ${departmentID}, ${specialtyID}, ${yearofadmission})`)
                await res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                await connection.commit();
                console.log('Transaction Completed Successfully.');
            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }
        }
        async function executeTransaction3() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { user, facultyID, departmentID } = req.body;
                const [result1] = await connection.query(`SELECT * FROM affiliation WHERE userID = ${user}`);
                if (result1.length > 0) {
                    await connection.query(`UPDATE affiliation SET faculty = ${facultyID}, department = ${departmentID} WHERE userID = ${user}`)
                } else await connection.query(`INSERT INTO affiliation (userID, department, faculty) 
                                        VALUES  (${user},${departmentID == 'NULL' || departmentID == 'none' ? 'NULL' : departmentID},${facultyID == 'NULL' || facultyID == 'none' ? 'NULL' : facultyID})`)

                await res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                await connection.commit();
                console.log('Transaction Completed Successfully.');
            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }
        }
        async function executeTransaction4() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { user } = req.body;
                await connection.query(`DELETE FROM users WHERE users.userID = ${user}`)
                await connection.commit();
                console.log('Transaction Completed Successfully.');
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Delete`);

            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }
        }
    },
    newCourseWithOutAssessments: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            const check = cognitive.checkUser(+index, req, res, pool)
            if (check) {
                const { name, teacherID, note } = req.body;
                pool.execute(`INSERT INTO educationalcourse (courseID, name, teacherID,	note)
                            VALUES (NULL, '${name}', ${!teacherID? 'NULL': teacherID}, '${note}')`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    })
            } else {
                res.redirect(`http://localhost:3001/exit`);
            }
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    newCourseWithAssessments: function (req, res, pool) {
        const config = {
            host: 'localhost',
            user: 'postgraduate_study',
            database: 'postgraduate_study',
            password: 'Qis-WKe-5si-J7E',
        };
        if (req.body) {
            const { index } = req.params;
            const check = cognitive.checkUser(+index, req, res, pool)
            if (check) {
                executeTransaction()
            } else {
                res.redirect(`http://localhost:3001/exit`);
            }
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
        async function executeTransaction() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { name, teacherID, note } = req.body;
                const [result2] = await connection.query(`INSERT INTO educationalcourse (courseID, name, teacherID,	note)
                            VALUES (NULL, '${name}', ${!teacherID? 'NULL': teacherID}, '${note}')`)
                const courseID = result2.insertId;
                const keys = Object.keys(req.body);
                const length = keys.length;
                let usersArr = [];
                if (length > 3) {
                    for (let i = 1; i < (length / 3); i++) {
                        usersArr[i - 1] = {
                            date: req.body[keys[i * 3]],
                            userID: req.body[keys[i * 3 + 1]],
                            assessment: req.body[keys[i * 3 + 2]]
                        }
                    }
                    let sql = `INSERT INTO assessments (courseID, userID, assessment, date) VALUES `
                    usersArr.map(async function (u) {
                        const keysU = Object.keys(u);
                        await connection.query(sql + `(${courseID}, ${u[keysU[1]]}, ${u[keysU[2]]}, '${u[keysU[0]]}')`);
                    })
                }

                await res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);

                await connection.commit();
                console.log('Transaction Completed Successfully.');
            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }
        }

    },
    courseAssessments: function (req, res, pool) {
        const config = {
            host: 'localhost',
            user: 'postgraduate_study',
            database: 'postgraduate_study',
            password: 'Qis-WKe-5si-J7E',
        };
        if (req.body) {
            const { index } = req.params;
            const check = cognitive.checkUser(+index, req, res, pool)
            if (check) {
                executeTransaction()
            } else {
                res.redirect(`http://localhost:3001/exit`);
            }
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
        async function executeTransaction() {
            const connection = await mysql2.createConnection(config).promise();;
            await connection.beginTransaction();
            try {
                const { courseID } = req.body;
                const keys = Object.keys(req.body);
                const length = keys.length;
                let usersArr = [];
                if (length > 1) {
                    for (let i = 0; i < ((length - 1) / 3); i++) {
                        usersArr[i] = {
                            date: req.body[keys[i * 3 + 1]],
                            userID: req.body[keys[i * 3 + 2]],
                            assessment: req.body[keys[i * 3 + 3]]
                        }
                    }
                    let sql = `INSERT INTO assessments (courseID, userID, assessment, date) VALUES `
                    usersArr.map(async function (u) {
                        const keysU = Object.keys(u);
                        await connection.query(sql + `(${courseID}, ${u[keysU[1]]}, ${u[keysU[2]]}, '${u[keysU[0]]}')`);
                    })
                }

                await res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);

                await connection.commit();
                console.log('Transaction Completed Successfully.');
            } catch (err) {
                await connection.rollback();
                console.error('Transaction Failed:', err);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`)
            } finally {
                await connection.end();
            }
        }
    },
    editcourse: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { courseID, name, teacherID, note } = req.body;
                pool.execute(`UPDATE educationalcourse SET name = '${name}', teacherID = ${teacherID}, note = '${note}' WHERE educationalcourse.courseID = ${courseID}`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    deletecourse: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { courseID } = req.body;
                pool.execute(`DELETE FROM educationalcourse WHERE educationalcourse.courseID = ${courseID}`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Delete`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    editassessment: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { courseID, user, date, assessment } = req.body;
                pool.execute(`UPDATE assessments SET date = '${date}', assessment = ${assessment} WHERE assessments.courseID = ${courseID} AND assessments.userID =${user}`)
                    .then(result => {
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Well`);
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                    });
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    },
    deleteassessment: function (req, res, pool) {
        if (req.body) {
            const { index } = req.params;
            if (cognitive.checkUser(+index, req, res, pool)) {
                const { courseID, users } = req.body;
                if (users instanceof Array) {
                    pool.execute(`DELETE FROM assessments WHERE assessments.courseID = ${courseID} AND assessments.userID IN(${users.join(',')})`)
                        .then(result => {
                            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Delete`);
                        })
                        .catch(function (err) {
                            console.log(err.message);
                            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                        });
                } else {
                    pool.execute(`DELETE FROM assessments WHERE assessments.courseID = ${courseID} AND assessments.userID = ${users}`)
                        .then(result => {
                            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Delete`);
                        })
                        .catch(function (err) {
                            console.log(err.message);
                            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                        });
                }
            } else res.redirect(`http://localhost:3001/exit`)
        } else {
            res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
        }
    }
}

