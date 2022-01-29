module.exports = function(sequelize, DataTypes) {
    return sequelize.define('config', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        configType: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'configType'
        },
        configCode: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'configCode'
        },
        value01: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'value01'
        },
        value02: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'value02'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'createDt'
        },
        createBy: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'createBy'
        },
       
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updateDt'
        },

        updateBy: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'updateBy'
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'status'
        }
    }, {
        sequelize,
        tableName: 'config',
        schema: 'public',
        timestamps: false
    });
};