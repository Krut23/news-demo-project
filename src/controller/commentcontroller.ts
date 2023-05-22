import { Request, Response } from 'express';
import Comment from '../model/commentmodel';
import News from '../model/newsmodel';
import User from '../model/usermodel';


export const commentNews = async (req: Request, res: Response) => {
  try {
    const { newsId } = req.params; 
    const { id: userId } = req.user; 
    const { comment } = req.body; 

    // Create a  comment 
    const newComment = await Comment.create({ newsId, userId, comment });
    return res.status(201).json({ message:"comment to news", comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const  getCommentsNews = async (req: Request, res: Response)=> {
  try {
    const { newsId } = req.params;
      const news = await News.findByPk(newsId);
      if (!news) {
        return res.status(404).json({ message: 'News item not found' });
      }
      const comments = await Comment.findAll({ where: { newsId } });

    return res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  }


export default { commentNews, getCommentsNews };
