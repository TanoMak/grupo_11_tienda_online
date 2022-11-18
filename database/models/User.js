module.exports = (sequelize, dataTypes) => {

    let alias = 'user';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        address: {
            type: dataTypes.STRING
        },
        profile_photo: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.STRING
        },
    
    };
    
    let config = {
        timestamps: false,
        tableName: 'user'
    };

    
    const User = sequelize.define(alias, cols, config);

/*     User.associate = function(models){
        User.hasMany(models.ProductCart, {
            as: "ProductCarts",
            foreignKey: "user_id",            
        });
    }
 */

    return User;
};