import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class Video extends Model {
  static find(arg0: { newsId: any; }) {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public url!: string;
  public newsId!: number;
}

Video.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    newsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'videos',
  }
);

export default Video;
