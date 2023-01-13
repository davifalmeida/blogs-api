module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
        categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreignKey: true },
    },
    {
        tableName: 'posts_categories',
        timestamps: false,
        underscored: true,
       });

    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, { as: 'categories', through: 'posts_categories', foreignKey: 'postId', otherKey: 'categoryId' });
        models.Category.belongsToMany(models.BlogPost, { as: 'blogPosts', through: 'posts_categories', foreignKey: 'categoryId', otherKey: 'postId' });
    };

    return PostCategory;
    }