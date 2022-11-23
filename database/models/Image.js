module.exports = (sequelize, dataTypes) => {

    let alias = 'Image';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING
        }
    };
    
    let config = {
        timestamps: true,
        tableName: 'images',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid : true
    };

    
    const Image = sequelize.define(alias, cols, config);

    Image.associate = (models) => {
        Image.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        });
    };
    return Image;
};