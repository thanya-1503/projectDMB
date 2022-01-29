module.exports = function(sequelize, DataTypes) {
    return sequelize.define('status', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        StatusName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'StatusName'
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
        tableName: 'status',
        schema: 'public',
        timestamps: false
    });
};