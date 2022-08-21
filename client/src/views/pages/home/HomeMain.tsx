import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../control/hooks'
import { getCouncilsAsync } from '../../../features/councils/councilsAPI'
import { councilsSelect } from '../../../features/councils/councilsSlice'
import CouncilCard from './CouncilCard'

const HomeMain = () => {
  const dispatch = useAppDispatch();
  const councils = useAppSelector(councilsSelect);

useEffect(()=>{
  dispatch(getCouncilsAsync())
},[dispatch])

  return (
    <div className='page'>
      {councils.map(council=><CouncilCard key={council._id} council={council} />)}
    </div>
  )
}

export default HomeMain