
import { Router } from "express";
import { addProduct } from "../controllers/product-controllers";
import { authenticateJWT } from "../middlewares/auth-middlewares";

const router = Router();

//router.get('/', )
router.post('/add', authenticateJWT, addProduct );
//router.delete('/:id', );
//router.put('/:id',);


export default router;