import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

router.get("/", usersController.getUsers);

router.post("/", usersController.createUser);

router.post("/:uid/courses/:cid", usersController.registerUserToCourse);

router.delete("/:id", usersController.deleteUser);

router.put("/:id", usersController.updateUser);

export default router;
