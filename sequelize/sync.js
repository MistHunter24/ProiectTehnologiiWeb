import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

//DB connection with sequelize
var sequelizeConnection = new Sequelize(
    "proiect_tw",
    "root",
    "QAZxsw!234",
    sequelizeConfigProps
);
//Defining tables
export const Notes = sequelizeConnection.define("Notes", {
    noteId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    courseCode: {
        type: Sequelize.INTEGER,
    },
    title: {
        type: Sequelize.STRING,
    },
    body: {
        type: Sequelize.STRING(5000),
    },
});

export const Courses = sequelizeConnection.define("Courses", {
    courseId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
    },
})

Notes.hasMany(Courses, {
    foreignKey: "noteId",
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
    foreignKeyConstraint: true,
});
//Courses.belongsToMany(Notes, { through: 'courseCode' });

sequelizeOperationsAPI.init(sequelizeConnection);

export { sequelizeConnection };
