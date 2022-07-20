const express = require('express');
const router = express.Router();
const {getGoals,
setGoal,
updateGoal,
deleteGoal} = require("../controller/goalController.js")


const { protect }=require('../middleware/authMiddleware'); 


//with the authentification protection
router.route('/').get(protect,getGoals).post(protect,setGoal);
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal);

//without the authentification protection 
/*router.route('/').get(getGoals).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);*/

/*router.get('/',getGoals);
router.post('/', setGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);*/

module.exports=router;