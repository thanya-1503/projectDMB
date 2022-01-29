module.exports = function(sequelize, DataTypes) {
    return sequelize.define('historyasset', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
          
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
           
        },

        updateBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
           
        },
        employeeCode: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'employeeCode'
        },
        assetCode: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'assetCode'
        },
    }, {
        sequelize,
        tableName: 'historyasset',
        schema: 'public',
        timestamps: false
    });
};