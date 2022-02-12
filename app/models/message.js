module.exports = function(sequelize, DataTypes) {
    return sequelize.define('message', {
        id_message: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: 'id_message'
        },
        id_chat: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id_receivet: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id_sender: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        message: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        time: {
            type: DataTypes.DATE,
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
        },
    }, {
        sequelize,
        tableName: 'message',
        schema: 'public',
        timestamps: false
    });
};
