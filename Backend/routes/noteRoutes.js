import express from "express";
import { createNote , getNotes , updateNote , deleteNote } from "../controllers/notecontroller.js";
import  {protect}  from "../middlewares/auth.js";

const nrouter = express.Router();

nrouter.post("/", protect , createNote);
nrouter.get("/", protect, getNotes);
nrouter.put("/:id" , protect , updateNote)
nrouter.delete("/:id" , protect , deleteNote)


export default nrouter;