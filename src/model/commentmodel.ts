import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';


class Comment extends Model {
  public id!: number;
  public newsId!: number;
  public userId!: number;
  public comment!: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    newsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);


export default Comment;
