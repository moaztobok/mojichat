import { Router } from "express";
import { createUser } from "../controllers/userController";

const router = Router()

router.get('/', (req, res) => {
    res.send('Hello from user route!')
})
router.put('/', (req, res) => {
    res.send('Hello from user route!')
})
router.post('/create', createUser)

export default router