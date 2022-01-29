module.exports = function(sequelize, DataTypes) {
    return sequelize.define('employee', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        employeeCode: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'employeeCode'
        },
        prefix: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'prefix'
        },
        firstname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'firstname'
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'lastname'
        },
        nickname: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'nickname'
        },
        workStart: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'workStart'
        },
        workEnd: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'workEnd'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createDt'
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'createBy'
        },
       
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updateDt'
        },

        updateBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'updateBy'
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'type'
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'position'
        },
        site: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'site'
        },
    }, {
        sequelize,
        tableName: 'employee',
        schema: 'public',
        timestamps: false
    });
};