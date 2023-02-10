import {Component} from 'react'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    iplTeamList: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getIplTeamList()
  }

  getIplTeamList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const teamList = data.teams
    const updatedData = teamList.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({iplTeamList: updatedData, isLoading: false})
  }

  render() {
    const {iplTeamList, isLoading} = this.state

    return (
      <div className="dashboard-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1>IPL Dashboard</h1>
        </div>
        <ul className="ipl-team-list-container">
          .
          {isLoading ? (
            <div testid="loader">Loading....</div>
          ) : (
            iplTeamList.map(eachItem => (
              <TeamCard teamDetails={eachItem} key={eachItem.id} />
            ))
          )}
        </ul>
      </div>
    )
  }
}
export default Home
