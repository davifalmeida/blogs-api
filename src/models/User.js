module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING
    },
     {
        tableName: 'users',
        timestamps: false,
        underscored: true,
     });
    User.associate = function(models) {
      User.hasMany(models.BlogPost, { as: 'blogPost', foreignKey: 'user_id' })
    };
    return User;
    };