import seq from "sequelize";
import { Courses, Notes } from "./sync.js";

//Sequelize initialization
async function sequelizeAuth(sequelizeConnection) {
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize has succesfully connected to the database");
    } catch (err) {
        console.error(`There was an error connecting to the database: ${err}`);
    }
}

async function sequelizeSync(sequelizeConnection) {
    try {
        await sequelizeConnection.sync({ force: true, alter: true });
        console.log("Sync complete!");
    } catch (err) {
        console.error(`Sync failed: ${err}`);
    }
}

async function initSequelize(sequelizeConnection) {
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
    await testDatabasePopulation();
}
//Test Data 
async function testDatabasePopulation() {
    await Notes.create({
        courseCode: 27,
        title: "Seminar 1",
        body: "test",
    });
    await Notes.create({
        courseCode: 27,
        title: "Seminar 2",
        body: "test2",
    });
    await Courses.create({
        name: "Tehnologii Web",
        noteId: 1,
    });
    await Courses.create({
        name: "Tehnologii Web",
        noteId: 2,
    });
};

//Notes
async function getNotes() {
    try {
        return await Notes.findAll();
    }
    catch (err) {
        console.error(err);
    }
};

async function getNoteById(noteId) {
    return await Notes.findAll({ where: { noteId: noteId } })
}

async function createNotes(note) {
    try {
        await Notes.create({
            courseCode: note.courseCode,
            title: note.title,
            body: note.body,
        });
    }
    catch (err) {
        throw err;
    }
}

async function deleteNotes(noteId) {
    try {
        const record = await Notes.findByPk(noteId);
        if (record) await record.destroy();
    }
    catch (err) {
        throw err;
    }
}

async function updateNotes(noteId, note) {
    try {
        const record = await Notes.findByPk(noteId);
        if (record) {
            await record.update({
                courseCode: note.courseCode,
                title: note.title,
                body: note.body,
            });
        }
    }
    catch (err) {
        throw err;
    }
};

async function getNotesByNoteId(courseId) {
    try {
        return await Notes.findAll({
            include: [{
                model: Courses,
                where: { courseId: courseId },
            }]
        })
    }
    catch (err) {
        console.error(`Error while retireving ${courseId}`);

    }
}
//Courses
async function getCourses() {
    try {
        return await Courses.findAll();
    }
    catch (err) {
        console.error(err);
    }
};

async function getCoursesById(courseId) {
    return await Courses.findAll({ where: { courseId: courseId } })
}

async function createCourses(course) {
    try {
        await Courses.create({
            courseId: course.courseCode,
            courseCode: course.title,
        });
    }
    catch (err) {
        throw err;
    }
}

async function deleteCourses(courseId) {
    try {
        const record = await Courses.findByPk(courseId);
        if (record) await record.destroy();
    }
    catch (err) {
        throw err;
    }
}

async function updateCourses(courseId, course) {
    try {
        const record = await Courses.findByPk(courseId);
        if (record) {
            await record.update({
                name: course.name,
            });
        }
    }
    catch (err) {
        throw err;
    }
};

export var sequelizeOperationsAPI = {
    init: initSequelize,
    getNotes: getNotes,
    getNoteById: getNoteById,
    createNotes: createNotes,
    deleteNotes: deleteNotes,
    updateNotes: updateNotes,
    getNotesByNoteId: getNotesByNoteId,
    getCourses: getCourses,
    createCourses: createCourses,
    getCoursesById: getCoursesById,
    updateCourses: updateCourses,
    deleteCourses: deleteCourses,
};
