import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Image from './imagemodel';
import Video from './videomodel';
import User from './usermodel';
import Like from './likemodel';
import Comment from './commentmodel';

class News extends Model {
  static findById(news_id: string) {
    throw new Error('Method not implemented.');
  }
  public id!: number;
  public title!: string;
  public description!: string;
  public newsDate!: Date;
  Image: any;
  Video: any;
  likes: any;
 

}

News.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    newsDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'news',
  }
);


News.belongsTo(User, { foreignKey: 'userId' });
News.hasMany(Like, { as: 'likes', foreignKey: 'newsId' });
News.hasMany(Comment, { as: 'comments', foreignKey: 'newsId' });
News.hasMany(Image, { foreignKey: 'newsId', as: 'images' });
News.hasMany(Video, { foreignKey: 'newsId', as: 'videos' });

export default News;
