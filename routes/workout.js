const express = require('express')
const workoutController = require('../controllers/workout')
const router = express.Router()
const { verify } = require("../auth");

// "addWorkout": "/addWorkout",
// "getMyWorkouts":"/getMyWorkouts",
// "updateWorkout":"/updateWorkout",
// "deleteWorkout":"/deleteWorkout",
// "completeWorkoutStatus":"/completeWorkoutStatus"

router.post('/addWorkout', verify, workoutController.workoutAdd)
router.get('/getMyWorkouts', verify, workoutController.getMyWorkouts)
router.patch('/updateWorkout/:id', verify, workoutController.updateWorkout)
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout)
router.patch('/completeWorkoutStatus/:id', verify, workoutController.completeWorkoutStatus)


module.exports = router;