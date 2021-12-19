export var sequelizeConfigProps = {
    host: "localhost",
    dialect: "mariadb",
    dialectOptions: {
        options: {
            enableArithAbort: true,
            trustedConnection: true,
        },
    },
};
