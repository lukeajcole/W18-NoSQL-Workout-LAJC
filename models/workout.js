const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerSchema =  new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for the workout"
  },
  type: {
    type: String,
    trim: true,
    required: "Enter a workout type"
  },
  weight: {
    type: Number,
    trim: true,
  },
  sets: {
    type: Number,
    trim: true,
  },
  reps: {
    type: Number,
    trim: true,
  },
  duration: {
    type: Number,
    trim: true,
  }

})
const workoutSchema = new Schema({
  exercises: [exerSchema],
  day: {
    type: Date,
    default: Date.now
  }
  ,
  totalDuration: {
    type: Number, 
    required: true,
    default: function(){
      return this.exercises.reduce((a,b) => a + (b['duration']),0)
    }
}});


const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
