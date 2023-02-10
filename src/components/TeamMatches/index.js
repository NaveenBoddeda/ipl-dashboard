// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamDetails: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamDetails()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    this.setState({
      teamDetails: updatedData,
      isLoading: false,
    })
  }

  render() {
    const {teamDetails, isLoading} = this.state

    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamDetails

    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
          </div>
        ) : (
          <div className="team-matches-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner-image"
            />

            <LatestMatch
              latestMatchDetails={latestMatchDetails}
              key={latestMatchDetails.id}
            />
            <ul className="match-card-container">
              {recentMatches.map(eachMatch => (
                <MatchCard matchCardDetails={eachMatch} key={eachMatch.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default TeamMatches
