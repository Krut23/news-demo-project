import { Request, Response } from 'express';
import Like from '../model/likemodel';

export const likenews = async (req: Request, res: Response) => {
  try {
    const { newsId } = req.params;
    const { id: userId } = req.user;

    // Check already liked 
    const existingLike = await Like.findOne({ where: { newsId, userId } });
    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this news item.' });
    }

    // Create a new like
    const like = await Like.create({ newsId, userId });
    return res.status(201).json({ message:"Like to news", like });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default likenews;
