import React from "react"
import { Link } from "react-router-dom"
import SuvreyList from "./surveys/SurveyList"

const Dashboard = () => {
  return (
    <div>
      <div>
        <SuvreyList />
      </div>
      <div>
        <Link to='/surveys/new'>Add</Link>
      </div>
    </div>
  )
}

export default Dashboard
