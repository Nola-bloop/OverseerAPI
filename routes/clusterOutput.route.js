import express from "express"
import controller from "../controllers/clusterOutput.controller.js"

const router = express.Router();

// /character/:id
router.get("/character/:id", (req, res) => {
  try{
    controller.ReadCharacterId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /thread/:id
router.get("/thread/:id", (req, res) => {
  try{
    controller.ReadThreadId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /message/:id
router.get("/message/:id", (req, res) => {
  try{
    controller.ReadMessageId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapter/:id
router.get("/chapter/:id", (req, res) => {
  try{
    controller.ReadChapterId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapterGroup/:id
router.get("/chapterGroup/:id", (req, res) => {
  try{
    controller.ReadChapterGroupId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /campaign/id/:id
router.get("/campaign/id/:id", (req, res) => {
  try{
    controller.ReadCampaignId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /campaign/guild/:dc_guild_id
router.get("/campaign/guild/:dc_guild_id", (req, res) => {
  try{
    controller.ReadCampaignId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

export default router;