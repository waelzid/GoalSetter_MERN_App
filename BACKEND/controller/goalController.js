const asyncHandler=require('express-async-handler')


const goal =require('../model/goalmodel')

//@desc Get Goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req,res)=> {

    const goals = await goal.find()
    res.status(200).json({goals});
})



//@desc set Goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req,res)=> {
    if (!req.body.text){
        res.status(400)
        throw new Error('please add a text field') 
    }
    const Goal = await goal.create({
        text:req.body.text,
    })
    //console.log(req.body.text)
    res.status(200).json({Goal});
})



//@desc update Goals
//@route PUT /api/goals
//@access Private
const updateGoal = asyncHandler(async (req,res)=> {
    let updatedGoal =await goal.findById(req.params.id)
    if (!updatedGoal){
        res.status(400)
        throw new Error('Goal not found'); 
    }
     updatedGoal = await goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatedGoal);
})


//@desc delete a Goal
//@route DELETE /api/goals
//@access Private
const deleteGoal = asyncHandler(async (req,res)=> {
    let deletedGoal =await goal.findById(req.params.id)
    if (!deletedGoal){
        res.status(400)
        throw new Error('Goal not found'); 
    }
    await goal.remove(deletedGoal);

    res.status(200).json({message:'the deleted goal has an id of ',deletedgoal:deletedGoal});
})

module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}