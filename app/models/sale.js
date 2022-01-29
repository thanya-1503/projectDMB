module.exports = function(sequelize, DataTypes) {
    return sequelize.define('sale', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: '_id'
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'state'
        },
        createDt: {
            type: DataTypes.DATE,
            allowNull: true,
       
        },
        createBy: {
            type: DataTypes.STRING(100),
            allowNull: true,
           
        },
        updateBy: {
            type: DataTypes.STRING(100),
            allowNull: true,
            
        },
        updateDt: {
            type: DataTypes.DATE,
            allowNull: true,
            
        },
        assetCode: {
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
        remark: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        salePrice: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        salePricevat: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        salePricetotal: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        saleAt: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'sale',
        schema: 'public',
        timestamps: false
    });
};