module.exports = function(sequelize, DataTypes) {
    return sequelize.define('employeeAsset', {
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
        employeeId: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'employeeId'
        },
        assetId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'assetId'
        },
        receivedDt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        returnDt: {
            type: DataTypes.DATE,
            allowNull: true,      
        },
        status: {
            type: DataTypes.STRING(16),
            allowNull: true,
        },

    }, {
        sequelize,
        tableName: 'employeeAsset',
        schema: 'public',
        timestamps: false
    });
};