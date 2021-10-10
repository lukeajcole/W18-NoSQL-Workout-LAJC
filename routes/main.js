const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/", (req, res) => {
  res.sendFile("/index.html")
});

router.get("/stats", (req, res) => {
  res.sendFile("/stats.html")
});

router.put("/api/workout/exercise", ({ body }, res) => {
  Workout.update(body)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workout", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
