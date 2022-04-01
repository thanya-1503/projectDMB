const bcrypt = require('bcryptjs');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('historyUser', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'username'
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'password'
        },
        createBy: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'createBy'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'createDt'
        },
        updateBy: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'updateBy'
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updateDt'
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: 'status'
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        prefix: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        school: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        weight: {
            type: DataTypes.DECIMAL,
            allowNull: true,  
        },
        age: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        height: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        office: {
            type: DataTypes.STRING,
            allowNull: true,  
        },  
        province: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        line: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        ig: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,  
        },
    }, {
        sequelize,
        tableName: 'historyUser',
        schema: 'public',
        timestamps: false,
        instanceMethods: {
            generateHash(pwd) {
                return bcrypt.hash(pwd, bcrypt.genSaltSync(8));
            },
            validPassword(pwdOld, pwdNew) {
                return bcrypt.compare(pwdOld, pwdNew);
            }
        },
    });
};