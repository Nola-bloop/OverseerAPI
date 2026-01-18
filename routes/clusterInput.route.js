import express from "express"
import controller from "../controllers/clusterInput.controller.js"

const router = express.Router();

// /campaign?name
router.get("/campaign", (req, res) => {
  try{
    controller.InsertCampaign(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapterGroup?name&campaign
router.get("/chapterGroup", (req, res) => {
  try{
    controller.InsertChapterGroup(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapter?name&isCanon&dcChannelId&campaign&chapterGroup
router.get("/chapter", (req, res) => {
  try{
    controller.InsertChapter(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /message(have message in body)
router.get("/message", (req, res) => {
  try{
    controller.InsertMessage(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /thread?name&dc_thread_id
router.get("/thread", (req, res) => {
  try{
    controller.InsertCampaign(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});