module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost',{
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
      },
      {
        tableName: 'blog_posts',
        timestamps: true,
        createdAt: 'published',
        updatedAt: 'updated',
        underscored: true,
      }
    );
  
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };
  
    return BlogPost;
  };