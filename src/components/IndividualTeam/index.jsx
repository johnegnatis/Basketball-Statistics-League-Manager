/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react'
import jQuery from 'jquery'
import { getQuery, formatDate, getMessage } from '../../appUtils'
import { PlayerTable } from './PlayerTable'
import { GameTable } from './GameTable'
import { DateRangePicker, toaster, Loader } from 'rsuite'
import { useNavigate } from 'react-router-dom'

const DisplayTeam = ({ teamName }) => {
  const navigate = useNavigate()
  // gets data to display in tables
  const [playerData, setPlayerData] = useState('')
  const [gameData, setGameData] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [date, setDate] = useState(null)

  const fetchPlayerData = useCallback(() => {
    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: getQuery.getPlayers(teamName),
      success: (data) => {
        setPlayerData(data)
        setError(false)
        setLoading(false)
      },
      error: (error) => {
        setLoading(false)
        setError(error)
        setPlayerData('')
      }
    })
  }, [setLoading, setError, setPlayerData])

  const getGameStatsURL = () => {
    if (date) return getQuery.getTeamStats(teamName, date[0], date[1])
    return getQuery.getTeamStats(teamName)
  }

  const fetchGameData = useCallback(() => {
    setLoading(true)
    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: getGameStatsURL(),
      success: (data) => {
        if (data === 2) {
          setGameData('')
          toaster.push(getMessage.warning('No data found for this date range, showing all games'))
          setDate('')
        } else {
          setGameData(data)
        }
        setError(false)
        setLoading(false)
      },
      error: (error) => {
        setLoading(false)
        setError(error)
        setGameData('')
      }
    })
  }, [setLoading, setError, setGameData, date, setDate])

  useEffect(() => {
    fetchGameData()
    fetchPlayerData()
  }, [])

  useEffect(() => {
    fetchGameData()
    fetchPlayerData()
  }, [date])

  const setDates = useCallback((value) => {
    if (!value) {
      setDate(null)
    } else {
      setDate([formatDate(value[0]), formatDate(value[1])])
    }
  }, [setDate])

  const gameTable = (loading || !gameData || gameData.length <= 0)
    ? ''
    : <GameTable data={gameData}/>
  const playerTable = (loading || !playerData || playerData.length <= 0)
    ? ''
    : <PlayerTable data={playerData}
      navigate={navigate}/>
  const coachName = (loading || !playerData || playerData.length <= 0) ? '' : playerData[0].Coach_name
  const noTrophy = (loading || !playerData || playerData.length <= 0) ? '' : playerData[0].No_trophy
  let numWins = 0
  let numLoss = 0
  gameData && gameData.forEach((game) => {
    if (game.points_for > game.points_against) {
      numWins++
    } else numLoss++
  })

  if (error) return <div>error</div>
  return (
    <div className="individual-team">
      <DateRangePicker placeholder='Select date range'
        ranges={[]}
        onChange={(value) => setDates(value)}
        placement='autoVerticalStart'
      />
      {(loading || !gameData || gameData.length <= 0 || !playerData || playerData.length <= 0)
        ? (<Loader vertical
          size="lg"
          center
          content="loading" />)
        : (
          <>
            <div className='team-data'>
              <h3>{`Coach: ${coachName}`}</h3>
              <h3>{`Number of trophies: ${noTrophy}`}</h3>
              <h3>{`Win-loss: ${numWins}-${numLoss}`}</h3>
            </div>
            <div className='table-column-2'>
              {gameTable}
              {playerTable}
            </div>
          </>
        )}
    </div>
  )
}
export default DisplayTeam
