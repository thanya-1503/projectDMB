module.exports = function(sequelize, DataTypes) {
    return sequelize.define('position', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        lovType: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'lovType'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: false,
       
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
           
        },
        updateBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
            
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: false,
            
        },
    }, {
        sequelize,
        tableName: 'position',
        schema: 'public',
        timestamps: false
    });
};