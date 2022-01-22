import seq from "sequelize";
import { Courses, Notes } from "./sync.js";

async function execAsyncRequest(asyncRequest) {
    try {
        return await asyncRequest();
    } catch (err) {
        throw err;
    }
}

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
    await Courses.create({
        name: "Mock pentru frontend 1",
        noteId: 2,
    });
    await Courses.create({
        name: "Mock pentru frontend 2",
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
    await execAsyncRequest(async function createNotes() {
        await Notes.create({
            courseCode: note.courseCode,
            title: note.title,
            body: note.body,
        });
    });

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

async function getNotesByCourseId(courseId) {
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
    await execAsyncRequest(async function createCourses() {
        await Courses.create({
            courseId: course.courseId,
            name: course.name,
            noteId: noteId
        });
    });
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

//select all entries - for frontend purposes

async function getAllNotesForCourses() {
    try {
        return await Notes.findAll({
            include: [{
                model: Courses,
                required: true
            }]
        })
    }
    catch (err) {
        console.error(`Error while retireving info`);

    }
}

async function deleteAllNotesForCourses(notesId) {
    try {
        const record = await Notes.findByPk(notesId);
        if (record) await record.destroy();
    }
    catch (err) {
        throw err;
    }
}

async function createNotesWithCourses(note) {
    await execAsyncRequest(async function createNotesWithCourses() {
        var result = await Notes.create({
            courseCode: note.courseCode,
            title: note.title,
            body: note.body,
        });
        var { Courses: courses } = note;
        courses.forEach((course) => {
            Courses.create({
                courseId: course.courseId,
                name: course.name,
                noteId: result.noteId,
            });
        });
    });
}



export var sequelizeOperationsAPI = {
    init: initSequelize,
    getNotes: getNotes,
    getNoteById: getNoteById,
    createNotes: createNotes,
    deleteNotes: deleteNotes,
    updateNotes: updateNotes,
    getNotesByCourseId: getNotesByCourseId,
    getCourses: getCourses,
    createCourses: createCourses,
    getCoursesById: getCoursesById,
    updateCourses: updateCourses,
    deleteCourses: deleteCourses,
    getAllNotesForCourses: getAllNotesForCourses,
    deleteAllNotesForCourses: deleteAllNotesForCourses,
    createNotesWithCourses: createNotesWithCourses,
};
