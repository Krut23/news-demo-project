import { Model, DataTypes } from 'sequelize';
import sequelize  from '../database';
import User from './usermodel';
import News from './newsmodel';

class Like extends Model {
  public id!: number;
  public userId!: number;
  public newsId!: number;
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    newsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: News,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Like',
  },
);

Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Like.belongsTo(News, { foreignKey: 'newsId', as: 'news' });

export default Like;
