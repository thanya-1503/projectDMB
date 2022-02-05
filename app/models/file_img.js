module.exports = function(sequelize, DataTypes) {
    return sequelize.define('file_img', {
        file_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: 'file_id'
        },
        userAccount_id: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        file_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        file_path: {
            type: DataTypes.STRING(100),
            allowNull: true,
      
        },
        file_type: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        file_size: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'file_img',
        schema: 'public',
        timestamps: false
    });
};