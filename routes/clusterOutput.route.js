import express from "express"
import controller from "../controllers/clusterOutput.controller.js"

const router = express.Router();

// /character?id
router.get("/character", (req, res) => {
  try{
    controller.ReadCharacterId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /thread?id
router.get("/thread", (req, res) => {
  try{
    controller.ReadThreadId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /message?id
router.get("/message", (req, res) => {
  try{
    controller.ReadMessageId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapter?id
router.get("/chapter", (req, res) => {
  try{
    controller.ReadChapterId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapterGroup?id
router.get("/chapterGroup", (req, res) => {
  try{
    controller.ReadChapterGroupId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /campaign?id
router.get("/campaign", (req, res) => {
  try{
    controller.ReadCampaignId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

export default router;