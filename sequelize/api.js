import "./sync.js";
import { router } from "../server-init.js";
import { sequelizeOperationsAPI } from "./operations-api.js";
import { request, response } from "express";
import { Courses, Notes, sequelizeConnection } from "./sync.js";

//Notes rutes
router
    .route("/notes")
    .post(async function createNotes(request, response) {
        try {
            const newNote = new Notes(request.body);
            if (newNote) {
                if (request.body.courseCode == null || request.body.title == null || request.body.name === "" || request.body.title === "") {
                    return response.status(400).json("CourseCode and Title cannot be null or empty!");
                }
                else if (request.body.body.length > 5000) {
                    return response.status(400).json("You have more than 5000 charactes!");
                }
                else {
                    await newNote.save()
                    response.status(200).json("Entry successfully created!");
                }
            }
        } catch (err) {
            console.error(`Error while calling api ${err}`);
        }
    })
router
    .route("/notes")
    .get(async function getNotes(_, response) {
        var result = await sequelizeOperationsAPI.getNotes();
        response.status(200).json(result);
    });

router
    .route("/notes/:noteId")
    .delete(async function deleteNotes({ params: { noteId } }, response) {
        try {
            await sequelizeOperationsAPI.deleteNotes(+noteId);
            response.status(200).json("Success");
        } catch (err) {
            console.error(`Error while calling api: ${err}`)
        }
    });

router
    .route("/notes/:noteId")
    .put(async function updateNotes({ params: { noteId }, body }, response) {
        try {
            if (body.courseCode == null || body.title == null || body.name === "" || body.title === "") {
                return response.status(400).json("CourseCode and Title cannot be null or empty!");
            }
            else if (body.body.length > 5000) {
                return response.status(400).json("You have more than 5000 charactes!");
            }
            else {
                await sequelizeOperationsAPI.updateNotes(+noteId, body)
                response.status(200).json("Notes successfully updated!");
            }
        }
        catch (err) {
            console.error(`Error while calling api: ${err}`);
        }
    });
router
    .route("/notes/:noteId")
    .get(async function getNoteById({ params: { noteId }, body }, response) {
        try {
            var result = await sequelizeOperationsAPI.getNoteById(+noteId);
            if (Object.entries(result).length === 0) {
                return response.status(400).json("The entry does not exist yet");
            }
            else {

                return response.status(200).json(result);
            }
        } catch (err) {
            console.error(`Error while calling api: ${err}`)
        }
    });

router
    .route("/notesByCourseCode/:courseId")
    .get(async function getNotesByNoteId({ params: { courseId } }, response) {
        const result = await sequelizeOperationsAPI.getNotesByNoteId(+courseId);
        if (Object.entries(result).length === 0) {
            return response.status(400).json("The entry does not exist yet");
        }

        response.status(200).json(result)
    });

// Course routes
router
    .route("/courses")
    .post(async function createCourses(request, response) {
        try {
            const newCourse = new Courses(request.body);
            if (newCourse) {
                if (request.body.name == null || request.body.name === "") {
                    return response.status(400).json("CourseName cannot be null or empty");
                }
                else if (request.body.name.length > 20) {
                    return response.status(400).json("Course name cannot be longer than 20 charactes");
                }
                else {
                    await newCourse.save()
                    response.status(200).json("Course saved successfully!");
                }
            }
        } catch (err) {
            console.error(`Error while calling api ${err}`);
        }
    })
router
    .route("/courses")
    .get(async function getCourses(_, response) {
        var result = await sequelizeOperationsAPI.getCourses();
        response.status(200).json(result);
    });

router
    .route("/courses/:courseId")
    .delete(async function deleteCourses({ params: { courseId } }, response) {
        try {
            await sequelizeOperationsAPI.deleteCourses(+courseId);
            response.status(200).json("Success");
        } catch (err) {
            console.error(`Error while calling api: ${err}`)
        }
    });

router
    .route("/courses/:courseId")
    .put(async function updateCourses({ params: { courseId }, body }, response) {
        try {
            if (body.name == null) {
                return response.status(400).json("CourseName cannot be null or empty");
            }
            else if ((body.name).length > 20) {
                return response.status(400).json("Course name cannot be longer than 20 charactes");
            }
            else {
                await sequelizeOperationsAPI.updateCourses(+courseId, body)
                response.status(200).json("Course successfully up!");
            }
        }
        catch (err) {
            console.error(`Error while calling api: ${err}`);
        }
    });

router
    .route("/courses/:courseId")
    .get(async function getCoursesById({ params: { courseId }, body }, response) {
        try {
            var result = await sequelizeOperationsAPI.getCoursesById(+courseId);
            if (Object.entries(result).length === 0) {
                return response.status(400).json("The entry does not exist yet");
            }
            else {
                return response.status(200).json(result);
            }
        } catch (err) {
            console.error(`Error while calling api: ${err}`)
        }
    });