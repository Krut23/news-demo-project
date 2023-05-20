import express from 'express';
import { register,login} from './controller/authcontroller';
import { createUser, editUser ,editUserProfile} from './controller/usercontoller';
import  { createNews,updateNews,getNews,deleteNews}  from './controller/newscontroller';
import likenews from './controller/likecontroller';
import { commentNews, getCommentsNews } from './controller/commentcontroller';
import upload from './controller/multer';
import { authenticateUser, checkAdminRole,checkEditorRole,checkVisitorRole} from './midleware/auth';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Auth 
app.post('/register',register);
app.post('/login', login);

// User 
app.post('/users', authenticateUser, checkAdminRole, createUser);
app.put('/users/:userId', authenticateUser, checkAdminRole, editUser);
app.put('/users/profile', authenticateUser,checkAdminRole,checkEditorRole,checkVisitorRole, editUserProfile);

// News 
app.post('/news', authenticateUser,upload.fields([{ name: 'images' }, { name: 'videos'}]), createNews);
app.get('/news',authenticateUser, getNews);
app.put('/news/:id', authenticateUser, checkEditorRole, upload.fields([{ name: 'images' }, { name: 'videos'}]), updateNews);
app.delete('/news/:id', authenticateUser, checkEditorRole, deleteNews);

// Like 
app.post('/news/like/:newsId',authenticateUser, likenews);

// Comment 
app.post('/news/:newsId/comment', authenticateUser,checkVisitorRole, commentNews);
app.get('/news/:newsId/comments',authenticateUser, getCommentsNews);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
