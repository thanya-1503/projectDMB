module.exports = function(sequelize, DataTypes) {
    return sequelize.define('dmb', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        descr: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        
        }
    }, {
        sequelize,
        tableName: 'dmb',
        schema: 'public',
        timestamps: false
    });
};