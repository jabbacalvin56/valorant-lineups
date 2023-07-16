const mongoose = require("mongoose");
const Lineup = require("../../models/lineup");
const Agent = require("../../models/agent");

module.exports = {
  show,
  showAbilities
};

async function show(req, res) {
  try {
    const lineups = await Lineup.find({ map: req.params.mapId, agent: req.params.agentId });
    res.json(lineups);
  } catch (err) {
    console.log(err);
    res.status(500).json('som ting wong');
  }
}

async function showAbilities(req, res) {
  try {
    const agentAbilities = await Agent.aggregate([
      {
        "$unwind": "$abilities"
      },
      {
        "$match": {
          "_id": new mongoose.Types.ObjectId(`${req.params.agentId}`)
        }
      },
      {
        "$project": {
          "_id": "$abilities._id",
          "name": "$abilities.name",
          "icon": "$abilities.icon"
        }
      }
    ]);
    res.json(agentAbilities);
  } catch (err) {
    console.log(err);
    res.status(500).json('som ting wong');
  }
}