const asyncHandler=require('express-async-handler')


//@desc Get Goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req,res)=> {
    res.status(200).json({message:'Get Goals'});
})



//@desc set Goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req,res)=> {
    if (!req.body.text){
        res.status(400)
        throw new Error('please add a text field') 
    }
    //console.log(req.body.text)
    res.status(200).json({msg:"set goal"});
})



//@desc update Goals
//@route PUT /api/goals
//@access Private
const updateGoal = asyncHandler(async (req,res)=> {
    res.json({msg:"the updated goal has an id of ",id:req.params.id});
})


//@desc delete a Goal
//@route DELETE /api/goals
//@access Private
const deleteGoal = asyncHandler(async (req,res)=> {
    res.status(200).json({message:'the deleted goal has an id of ',id:req.params.id});
})

module.exports={
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}