import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

class Image extends Model {
  public id!: number;
  public url!: string;
  public newsId!: number;
}

Image.init(
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
    tableName: 'images',
  }
);

export default Image;
