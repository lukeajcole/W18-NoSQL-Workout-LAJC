const router = require("express").Router();
const Workout = require("../models/workout.js");

//Get all of the Workouts
router.get("/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Update a workout with the new exercises
router.put("/workouts/:id", async (req, res) => {
  const {body} = req
  console.log("body")
  console.log(body)
  const exercises = Workout.find(
    {
      _id: req.params.id
    }
  )
  Workout.update(
    {
      _id: req.params.id
    },
    {
      $set: {
        body 
      }
    },

    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

//Make a new workout
router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//get workouts in range
router.get("/workouts/range", (req, res) => {
  const sevenDay =  new Date(new Date().setDate(new Date().getDate() - 7))
  Workout.find({day: {$gte: sevenDay}})
  .sort({ date: -1 })
  .then(dbworkout => {
    res.json(dbworkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});




module.exports = router;
