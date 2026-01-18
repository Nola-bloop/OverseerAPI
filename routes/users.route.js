import express from "express"
import controller from "../controllers/users.controller.js"

const router = express.Router();

// ?discordId&discordUsername&passwordClear
router.post("", (req, res) => {
  try{
    controller.Create(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /id/:id
router.get("/id/:id", (req, res) => {
  try{
    controller.ReadId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /CheckCreds?discordId&passwordClear
router.get("/CheckCreds", (req, res) => {
  try{
    controller.ReadId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /:discordId
router.get("/:discordId", (req, res) => {
  try{
    controller.ReadDiscordId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

export default router;