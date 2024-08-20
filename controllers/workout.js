
const Workout = require("../models/Workout");
const auth = require('../auth')
const { errorHandler } = auth;

// "addWorkout": "/addWorkout",
// "getMyWorkouts":"/getMyWorkouts",
// "updateWorkout":"/updateWorkout",
// "deleteWorkout":"/deleteWorkout",
// "completeWorkoutStatus":"/completeWorkoutStatus"

module.exports.workoutAdd = (req, res) => {
    const userId = req.user.id;
    const { name, duration } = req.body;

    if (!name || !duration) {
        return res.status(400).json({ error: 'Name and duration are required fields' });
    }

    const newWorkout = new Workout({
        userId,
        name,
        duration,
    });

    newWorkout.save()
        .then(workout => res.status(201).json(workout))
        .catch(err => errorHandler(res, err)); 
};

module.exports.getMyWorkouts = (req, res) => {
    const userId = req.user.id;
  
    return Workout.find({ userId })
      .then(workout => {
        if (!workout) {
          return res.status(404).json({ message: 'No Workout found' });
        }
          return res.status(200).json( {workouts : workout} );
      })
      .catch(err => errorHandler(res, err));
  };


  module.exports.updateWorkout = (req, res) => {
    const userId = req.user.id; 
    const workoutId = req.params.id; 
    console.log('Param ID:', workoutId)
    const { name, duration } = req.body;

    // Find the workout by ID and ensure it belongs to the authenticated user
    Workout.findOneAndUpdate(
        { _id: workoutId, userId: userId }, // Ensure workout belongs to the user
        { $set: { name, duration } },
        { new: true, runValidators: true } // Return the updated document and run validators
    )
    .then(workout => {
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found or you do not have permission to update this workout' });
        }
        return res.status(200).json({ message: 'Workout updated successfully', updatedWorkout : workout });
    })
    .catch(err => errorHandler(res, err));
};

module.exports.deleteWorkout = (req, res) => {
    const userId = req.user.id;
    const workoutId = req.params.id;

    Workout.findOneAndDelete({ _id: workoutId, userId: userId })
        .then(workout => {
            if (!workout) {
                return res.status(404).json({ error: 'Workout not found or you do not have permission to delete this workout' });
            }
            return res.status(200).json({ message: 'Workout deleted successfully' });
        })
        .catch(err => errorHandler(res, err));
};

module.exports.completeWorkoutStatus = (req, res) => {
    const userId = req.user.id;
    const workoutId = req.params.id; 

    Workout.findOneAndUpdate(
        { _id: workoutId, userId: userId },
        { $set: { status: 'completed' } },
        { new: true, runValidators: true }
    )
    .then(workout => {
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found or you do not have permission to update this workout' });
        }
        return res.status(200).json({ message: 'Workout status updated successfully', updatedWorkout : workout });
    })
    .catch(err => errorHandler(res, err));
};


