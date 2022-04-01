module.exports = function(sequelize, DataTypes) {
    return sequelize.define('likeUser', {
        id_likeuser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: 'id_likeuser'
        },
        user1: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        user2: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id_chat: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updateBy: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'updateBy'
        },
        chat_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'likeUser',
        schema: 'public',
        timestamps: false
    });
};
