import React from 'react';
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/spinner'
import GoalItem from '../components/GoalItem'
import {getGoals,reset} from '../features/goals/goalSlice'

function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.auth)
  const {goals, isLoading,isError,message}=useSelector((state)=>state.goal)
  useEffect(()=>{
    if(isError){
      console.log("it's an error")
    }
    if(!user){
    navigate('/login')}
    if (user){dispatch(getGoals())}
    //dispatch(getGoals())
    return(()=>{
      dispatch(reset())
    })
  },[user,dispatch,navigate,isError])

  if(isLoading){
    return(<Spinner />)
  }
  //const user='wael';
  return (
    <section className='heading'>
      <h1>welcome {user && user.name}</h1>
      <p>Goals Dashboard </p>
      <GoalForm />
      <section className="content">
        {goals.length >0 ? (
          <div className="goals">
            {
             goals.map((goal)=>(<GoalItem key={goal._id} goal={goal} />))
            }
          </div>
        ) : (<h3>you have not set any goals</h3>)}
      </section>
      </section>
  )

  /*return(
     
    



    <>
    <h1>hello this is the real Dashboard page </h1>
    </>
  )*/
}

export default Dashboard

