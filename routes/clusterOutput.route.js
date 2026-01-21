import express from "express"
import controller from "../controllers/clusterOutput.controller.js"

const router = express.Router();

// /character/:id
router.get("/character/id/:id", async (req, res) => {
  try{
    await controller.ReadCharacterId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /character/pair/:campaignId/:name
router.get("/character/pair/:campaignId/:name", async (req, res) => {
  try{
    await controller.ReadCharacterFromCampaignAndName(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /thread/id/id
router.post("/thread/id/:id", async (req, res) => {
  try{
    await controller.ReadThreadId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /thread/pair/
router.get("/thread/pair/", async (req, res) => {
  try{
    await controller.ReadThreadFromDiscordId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /message/:id
router.get("/message/id/:id", async (req, res) => {
  try{
    await controller.ReadMessageId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /message/latest/:chapterId
router.get("/message/latest/:chapterId", async (req, res) => {
  try{
    await controller.ReadLatestMessagesFromChapter(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapter/:id
router.get("/chapter/:id", async (req, res) => {
  try{
    await controller.ReadChapterId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapter/all/:campaignId
router.get("/chapter/all/:campaignId", async (req, res) => {
  try{
    await controller.ReadAllChaptersFromCampaign(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapterGroup/:id
router.get("/chapterGroup/:id", async (req, res) => {
  try{
    await controller.ReadChapterGroupId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /campaign/id/:id
router.get("/campaign/id/:id", async (req, res) => {
  try{
    await controller.ReadCampaignId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /campaign/guild/:dc_guild_id
router.get("/campaign/guild/:dc_guild_id", async (req, res) => {
  try{
    await controller.ReadCampaignGuild(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapter/campchanid/:campaignId/:dc_channel_id
router.get("/chapter/campchanid/:campaignId/:dc_channel_id", async (req, res) => {
  try{
    await controller.ReadChapterByCampaignAndDiscordId(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /chapterGroup/pair/:campaignId/:name
router.get("/chapterGroup/pair/:campaignId/:name", async (req, res) => {
  try{
    await controller.ReadChapterGroupByPair(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

// /campaign/all
router.get("/campaign/all", async (req, res) => {
  try{
    await controller.ReadAllCampaigns(req).then((j) =>{
      res.json(j)
    })
  }catch(e){
    res.json({error:e.toString})
  }
});

export default router;