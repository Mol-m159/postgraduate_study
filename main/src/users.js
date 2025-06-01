var cognitive = require('./cognitive');

module.exports = {
    entransecheck: async function (req, res, pool) {
        if (req.body) {
            const { username, password } = req.body;
            const passwordHash = (await cognitive.getSHA256Hash(password)).toString();

            pool.execute(`SELECT * FROM  credentials WHERE username = '${username}' AND password = '${passwordHash}'`)
                .then(data => {
                    const users = data[0];
                    if (users == [] || users[0] == undefined) {
                        console.log('none');
                        res.redirect(`http://localhost:3000/`);
                    } else {
                        if (users[0].username == username) {
                            console.log('user ent: ' + users[0].username);
                            req.session.this_user = users[0].userID;
                            req.session.save();
                            res.redirect(`http://localhost:3000/personal/` + req.session.this_user);
                        } else {
                            console.log('none');
                            res.redirect(`http://localhost:3000/`);
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err.message);
                    res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                });
        }
    },
    personal: function (req, res, pool) {
        const { index } = req.params;
        if (req.session.this_user == null) {
            user = { role: 0 }
            res.json(user)
        } else if (req.session.this_user == +index) {
            pool.execute(`SELECT * FROM  users WHERE userID = ${req.session.this_user}`)
                .then(result => {
                    const users = result[0];
                    if (users == []) {
                        res.redirect(`http://localhost:3000/`);
                    } else {
                        if (users[0].userID == index) {
                            if (users[0].blocking == 0) {
                                user = {
                                    id: req.session.this_user,
                                    firstname: users[0].firstname,
                                    patronymic: users[0].patronymic,
                                    lastname: users[0].lastname,
                                    role: users[0].role,
                                    blocking: false
                                }
                            } else user = {
                                id: req.session.this_user,
                                firstname: users[0].firstname,
                                patronymic: users[0].patronymic,
                                lastname: users[0].lastname,
                                role: users[0].role,
                                blocking: true
                            }
                            if (user.role == 4) {
                                user['post'] = 'Администратор';
                                res.json(user)
                            }
                            if (user.role == 3) {
                                user['post'] = 'Представитель подразделения';
                                pool.execute(`SELECT affiliation.userID, faculties.name AS faculty, departments.name AS department
                                            FROM affiliation, faculties, departments 
                                            WHERE affiliation.faculty = faculties.facultyID AND affiliation.department = departments.departmentID AND affiliation.userID = ${req.session.this_user}`)
                                    .then(result => {
                                        data = result[0]
                                        user['department'] = (data[0] ?  data[0].department: "Нет данных" );
                                        user['faculty'] = (data[0] ?  data[0].faculty: "Нет данных" );
                                        res.json(user)
                                    })
                            }
                            if (user.role == 2) {
                                user['post'] = 'Научный руководитель';
                                pool.execute(`SELECT affiliation.userID, faculties.name AS faculty, departments.name AS department
                                            FROM affiliation, faculties, departments 
                                            WHERE affiliation.faculty = faculties.facultyID AND affiliation.department = departments.departmentID AND affiliation.userID = ${req.session.this_user}`)
                                    .then(result => {
                                        data = result[0]
                                        user['department'] = (data[0] ?  data[0].department: "Нет данных" );
                                        user['faculty'] = (data[0] ?  data[0].faculty: "Нет данных" );
                                        res.json(user)
                                    })

                            }
                            if (user.role == 1) {
                                user['post'] = 'Обучающийся';
                                pool.execute(`SELECT faculties.name AS faculty, departments.name AS department, specialties.name AS specialty, users.firstname, users.patronymic, users.lastname, graduatestudents.yearofadmission 
                                    FROM graduatestudents, faculties, departments, specialties, users 
                                    WHERE graduatestudents.department = departments.departmentID AND departments.faculty = faculties.facultyID 
                                    AND graduatestudents.specialty = specialties.specialtyID AND graduatestudents.scientificSupervisorID = users.userID AND graduatestudents.userID = ${req.session.this_user}`)
                                    .then(result => {
                                        data = result[0]
                                        user['department'] = data[0].department;
                                        user['faculty'] = data[0].faculty;
                                        user['specialty'] = data[0].specialty;
                                        user['yearofadmission'] = data[0].yearofadmission;
                                        user['scientificSupervisor'] = data[0].lastname + " " + data[0].firstname + " " + (data[0].patronymic == null ? "" : data[0].patronymic);
                                        res.json(user)
                                    })
                                
                            }
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err.message);
                    res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                });
        } else {
            req.session.this_user = null;
            req.session.save();
            res.redirect('http://localhost:3000/');
        }

    },

    user: function (req, res, pool) {
        const { index } = req.params;
        let user
        if (req.session.this_user == null) {
            user = { role: 0 }
            res.json(user)
        } else if (req.session.this_user == +index) {
            pool.execute(`SELECT * FROM  users WHERE userID = ${req.session.this_user}`)
                .then(result => {
                    const users = result[0];
                    if (users == []) {
                        res.redirect(`http://localhost:3000/`);
                    } else {
                        if (users[0].userID == index) {
                            if (users[0].blocking == 0) {
                                user = {
                                    id: req.session.this_user,
                                    firstname: users[0].firstname,
                                    patronymic: users[0].patronymic,
                                    lastname: users[0].lastname,
                                    role: users[0].role,
                                    blocking: false
                                }

                            } else user = {
                                id: req.session.this_user,
                                firstname: users[0].firstname,
                                patronymic: users[0].patronymic,
                                lastname: users[0].lastname,
                                role: users[0].role,
                                blocking: true
                            }
                            res.json(user)
                        } else {
                            req.session.this_user = null;
                            req.session.save();
                            res.redirect(`http://localhost:3000/`);
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err.message);
                    res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
                });
        } else {
            req.session.this_user = null;
            req.session.save();
            res.redirect('http://localhost:3000/');
        }
    },
    exit: function (req, res) {
        console.log('exit: ' + req.session.this_user + ' -> ');
        req.session.this_user = null;
        req.session.save();
        console.log('exit: ' + req.session.this_user);
        res.redirect(`http://localhost:3000/`);
    }
} 