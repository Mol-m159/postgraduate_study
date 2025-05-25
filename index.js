const express = require('express')
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
const cors = require('cors');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const PORT = process.env.PORT || 3001
const app = express()

var editdata = require('./src/editdata');
var data = require('./src/data');
var cognitive = require('./src/cognitive');
var users = require('./src/users');
var fromFile = require('./src/fromFile');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'postgraduate_study',
    database: 'postgraduate_study',
    password: 'Qis-WKe-5si-J7E',
}).promise();

app.listen(PORT, () => {
    console.log(`Server starting on ${PORT}`)
})

const options = {
    host: 'localhost',
    user: 'postgraduate_study',
    database: 'postgraduate_study',
    password: 'Qis-WKe-5si-J7E',
};

const sessionStore = new MySQLStore(options);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: Math.random().toString(36).slice(2),
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.post('/entranse/check', async function (req, res) { users.entransecheck(req, res, pool) });
app.get('/user/:index', async function (req, res) { users.user(req, res, pool) });
app.get('/personal/:index', function (req, res) { users.personal(req, res, pool) });
app.get('/exit', function (req, res) { users.exit(req, res) });

app.get('/faculties', function (req, res) { data.faculties(req, res, pool) });
app.get('/departments', function (req, res) { data.departments(req, res, pool) });
app.get('/specialties', function (req, res) { data.specialties(req, res, pool) });
app.get('/users', function (req, res) { data.users(req, res, pool) });
app.get('/scientificSupervisors', function (req, res) { data.scientificSupervisors(req, res, pool) });
app.get('/graduateStudents', function (req, res) { data.graduateStudents(req, res, pool) });
app.get('/educationalcourses', function (req, res) { data.educationalcourses(req, res, pool) });
app.get('/assessments', function (req, res) { data.assessments(req, res, pool) });

app.post('/:index/editdata/newdepartment/', function (req, res) { editdata.newdepartment(req, res, pool) });
app.post('/:index/editdata/editdepartment', function (req, res) { editdata.editdepartment(req, res, pool) });
app.post('/:index/editdata/deletedepartment', function (req, res) { editdata.deletedepartment(req, res, pool) });
app.post('/:index/editdata/newfaculty', function (req, res) { editdata.newfaculty(req, res, pool) });
app.post('/:index/editdata/editfaculty', function (req, res) { editdata.editfaculty(req, res, pool) });
app.post('/:index/editdata/deletefaculty', function (req, res) { editdata.deletefaculty(req, res, pool) });
app.post('/:index/editdata/newspecialty', function (req, res) { editdata.newspecialty(req, res, pool) });
app.post('/:index/editdata/editspecialty', function (req, res) { editdata.editspecialty(req, res, pool) });
app.post('/:index/editdata/deletespecialty', function (req, res) { editdata.deletespecialty(req, res, pool) });
app.post('/:index/editdata/blocking', function (req, res) { editdata.blocking(req, res, pool) });
app.post('/:index/editdata/changepassword', async function (req, res) { editdata.changepassword(req, res, app, pool) });
app.post('/:index/editdata/deletecourse', function (req, res) { editdata.deletecourse(req, res, pool) });
app.post('/:index/editdata/editcourse', function (req, res) { editdata.editcourse(req, res, pool) });
app.post('/:index/editdata/deleteassessment', function (req, res) { editdata.deleteassessment(req, res, pool) });
app.post('/:index/editdata/editassessment', function (req, res) { editdata.editassessment(req, res, pool) });
app.post('/:index/RegistrationForm/:role', function (req, res) { editdata.registration(req, res, app, pool) })
app.post('/:index/RegistrationFile', function (req, res) { fromFile.registration(req, res, app, pool) })
app.post('/:index/editdata/changeUserData/:type', async function (req, res) { editdata.changeUserData(req, res, app, pool) });
app.post('/:index/editdata/newcourse/:type', function (req, res) {
    switch (req.params.type) {
        case "1":
            editdata.newCourseWithOutAssessments(req, res, pool);
            break;
        case "2":
            editdata.newCourseWithAssessments(req, res, pool)
            break;
        case "3":
            editdata.courseAssessments(req, res, pool)
            break;
        default: res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
    }
});

app.get('/assessmentsInfo/:type/:user', function (req, res) {
    switch (req.params.type) {
        case "1":
            data.assessmentsForRole1(req, res, pool);
            break;
        case "2":
            data.assessmentsForRole2(req, res, pool)
            break;
        case "3":
            data.assessmentsForRole3(req, res, pool)
            break;
        case "4":
            data.assessmentsForRole4(req, res, pool)
            break;
        default: res.redirect(`http://localhost:3000/callback/${req.session.this_user}/Nodata`);
    }

});
app.get('/successfulRegistration/:index/one', function (req, res) { editdata.successfulRegistrationOne(req, res, pool, app.locals.registeredUsers) });
app.get('/successfulRegistration/:index/file', function (req, res) {
    const registeredUsers = app.locals.registeredUsers
    let data = []
    for (let i = 0; i < registeredUsers.length; i++) {
        data[i] = {
            username: registeredUsers[i][0],
            password: registeredUsers[i][1]
        }
    }
    res.json(data)
});
app.get('/changepassword/:index', function (req, res) { editdata.successfulchange(res, app.locals.registeredUsers) });



app.get('/subjects/:role/:index', (req, res) => {
    const { role, index } = req.params;
    if (cognitive.checkUser(+index, req, res)) {
        let data

        switch (+role) {
            case 1:
                data = subjects_data.students
                res.json(data);
                break
            case 2:
                data = subjects_data
                res.json(data);
                break
            case 3:
                data = subjects_data
                res.json(data);
                break
            case 4:
                data = subjects_data
                res.json(data);
                break
            default:
                res.json({ user: 'none', role: 0 });
                break
        }

    }
})
const subjects_data = {
    subjects: ["1", "2", "3", "4", "5", "6"],
    students: [
        u1 = {
            name: "student1",
            sciS: "ss1",
            subjs: [
                {
                    nameS: "Дисциплина 1",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 2",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 3",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 4",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 5",
                    estim: "5",
                    data: "12.12.2021"
                }
            ]
        },
        u2 = {
            name: "student2",
            sciS: "ss2",
            subjs: [
                {
                    nameS: "Дисциплина 1",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 2",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 3",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 4",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 5",
                    estim: "5",
                    data: "12.12.2021"
                }
            ]
        },
        u3 = {
            name: "student3",
            sciS: "ss3",
            subjs: [
                {
                    nameS: "Дисциплина 1",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 2",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 3",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 4",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 5",
                    estim: "5",
                    data: "12.12.2021"
                }
            ]
        },
        u4 = {
            name: "student4",
            sciS: "ss4",
            subjs: [
                {
                    nameS: "Дисциплина 1",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 2",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 3",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 4",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 5",
                    estim: "5",
                    data: "12.12.2021"
                }
            ]
        },
        u5 = {
            name: "student5",
            sciS: "ss5",
            subjs: [
                {
                    nameS: "Дисциплина 1",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 2",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 3",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 4",
                    estim: "5",
                    data: "12.12.2021"
                },
                {
                    nameS: "Дисциплина 5",
                    estim: "5",
                    data: "12.12.2021"
                }
            ]
        }],
    depts: ["21", "22", "23", "24", "25", "26"],
    scienSupervisor: ["31", "32", "33", "34", "35", "36"]
}