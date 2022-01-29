module.exports = function(sequelize, DataTypes) {
    return sequelize.define('model', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        modelType: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'modelType'
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
    }, {
        sequelize,
        tableName: 'model',
        schema: 'public',
        timestamps: false
    });
};