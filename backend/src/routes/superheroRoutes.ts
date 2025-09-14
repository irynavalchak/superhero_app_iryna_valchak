import express from "express"

import { upload } from "#middlewares/uploads.js";


import {
  getSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero
} from "../controllers/superheroController.js";


const router = express.Router();

router.get("/", getSuperheroes);
router.get("/:id", getSuperheroById);
// router.post("/", createSuperhero);
router.post("/", upload.array("images", 10), createSuperhero);

router.put("/:id", upload.array("images", 10), updateSuperhero);
router.delete("/:id", deleteSuperhero);





export default router;
