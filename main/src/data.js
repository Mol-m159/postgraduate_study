module.exports = {
    faculties: function (req, res, pool) {
        pool.execute(`SELECT * FROM faculties`)
            .then(result => {
                faculties = result[0]
                res.send(faculties)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    departments: function (req, res, pool) {
        pool.execute(`SELECT * FROM departments`)
            .then(result => {
                departments = result[0]
                res.send(departments)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    specialties: function (req, res, pool) {
        pool.execute(`SELECT * FROM specialties`)
            .then(result => {
                specialties = result[0]
                res.send(specialties)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    scientificSupervisors: function (req, res, pool) {
        pool.execute(`SELECT users.userID, users.firstname, users.patronymic, users.lastname, affiliation.faculty, affiliation.department FROM users 
                        LEFT JOIN  affiliation ON affiliation.userID = users.userID
                        WHERE users.role = 2 OR users.role = 3`)
            .then(result => {
                users = result[0]
                res.send(users)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    graduateStudents: function (req, res, pool) {
        pool.execute(`SELECT users.userID, users.firstname, users.patronymic, users.lastname, 
                            graduatestudents.scientificSupervisorID, 
                            graduatestudents.department, 
                            graduatestudents.specialty, 
                            graduatestudents.yearofadmission
                        FROM users LEFT JOIN  graduatestudents ON graduatestudents.userID = users.userID
                        WHERE users.role = 1`)
            .then(result => {
                users = result[0]
                res.send(users)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    users: function (req, res, pool) {
        pool.execute(`SELECT * FROM users`)
            .then(result => {
                users = result[0]
                res.send(users)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    educationalcourses: function (req, res, pool) {
        pool.execute(`SELECT * FROM educationalcourse`)
            .then(result => {
                educationalcourse = result[0]
                res.send(educationalcourse)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    assessments: function (req, res, pool) {
        pool.execute(`SELECT * FROM assessments`)
            .then(result => {
                assessments = result[0]
                res.send(assessments)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    assessmentsForRole1: function (req, res, pool) {
        const { user } = req.params;
        pool.execute(`SELECT assessments.userID, educationalcourse.name, assessments.assessment, assessments.date 
                    FROM assessments LEFT JOIN educationalcourse ON educationalcourse.courseID = assessments.courseID
                    WHERE assessments.userID = ${user}`)
            .then(result => {
                assessments = result[0]
                res.send(assessments)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    assessmentsForRole2: function (req, res, pool) {
        const { user } = req.params;
        pool.execute(`SELECT users.userID, users.firstname, users.patronymic, users.lastname, 
                            educationalcourse.courseID, educationalcourse.name, assessments.assessment, assessments.date, graduatestudents.yearofadmission 
                    FROM assessments LEFT JOIN educationalcourse ON educationalcourse.courseID = assessments.courseID
                    LEFT JOIN users ON users.userID = assessments.userID
                    LEFT JOIN graduatestudents ON users.userID = graduatestudents.userID
                    WHERE graduatestudents.scientificSupervisorID = ${user}
                    ORDER by educationalcourse.courseID`)
            .then(result => {
                assessments = result[0]
                res.send(assessments)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    assessmentsForRole3: function (req, res, pool) {
        const { user } = req.params;
        pool.execute(`SELECT faculty, department FROM affiliation  WHERE userID = ${user}`)
            .then(result => {
                data = result[0]
                if (data[0].department === null) {
                    pool.execute(`SELECT departments.faculty, graduatestudents.department, graduatestudents.scientificSupervisorID, users.userID, users.firstname, users.patronymic, users.lastname, 
                            educationalcourse.courseID, educationalcourse.name, assessments.assessment, assessments.date, graduatestudents.yearofadmission 
                    FROM assessments LEFT JOIN educationalcourse ON educationalcourse.courseID = assessments.courseID
                    LEFT JOIN users ON users.userID = assessments.userID
                    LEFT JOIN graduatestudents ON users.userID = graduatestudents.userID
                    LEFT JOIN departments ON departments.departmentID = graduatestudents.department
                    WHERE departments.faculty = ${data[0].faculty}`)
                        .then(result => {
                            assessments = result[0]
                            res.send(assessments)
                        })
                } else {
                    pool.execute(`SELECT departments.faculty, graduatestudents.department, graduatestudents.scientificSupervisorID, users.userID, users.firstname, users.patronymic, users.lastname, 
                            educationalcourse.courseID, educationalcourse.name, assessments.assessment, assessments.date, graduatestudents.yearofadmission 
                    FROM assessments LEFT JOIN educationalcourse ON educationalcourse.courseID = assessments.courseID
                    LEFT JOIN users ON users.userID = assessments.userID
                    LEFT JOIN graduatestudents ON users.userID = graduatestudents.userID
                    LEFT JOIN departments ON departments.departmentID = graduatestudents.department
                    WHERE graduatestudents.department = ${data[0].department}`)
                        .then(result => {
                            assessments = result[0]
                            res.send(assessments)
                        })
                }
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
    assessmentsForRole4: function (req, res, pool) {
        pool.execute(`SELECT faculties.name AS facultyName, departments.faculty, graduatestudents.department, departments.name AS departmentName, graduatestudents.scientificSupervisorID, users.userID, users.firstname, users.patronymic, users.lastname, 
                            educationalcourse.courseID, educationalcourse.name, assessments.assessment, assessments.date, graduatestudents.yearofadmission 
                    FROM assessments LEFT JOIN educationalcourse ON educationalcourse.courseID = assessments.courseID
                    LEFT JOIN users ON users.userID = assessments.userID
                    LEFT JOIN graduatestudents ON users.userID = graduatestudents.userID
                    LEFT JOIN departments ON departments.departmentID = graduatestudents.department
                    LEFT JOIN faculties ON departments.faculty = faculties.facultyID`)
            .then(result => {
                assessments = result[0]
                res.send(assessments)
            })
            .catch(function (err) {
                console.log(err.message);
                res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Error`);
            });
    },
}

