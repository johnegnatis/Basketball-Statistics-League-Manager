/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import jQuery from 'jquery'
import { getQuery, formatDate, getMessage, toPercent } from '../../appUtils'
import { DateRangePicker, toaster, Loader } from 'rsuite'
import { MyTable } from './Table'
import Player from '../../images/player.svg'

const DisplayPlayer = ({ player }) => {
  // gets data to display in tables
  const [playerStats, setPlayerStats] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [date, setDate] = useState(null)

  const getPlayerStatsURL = () => {
    if (date) return getQuery.getPlayerStats(player.SSN, date[0], date[1])
    return getQuery.getPlayerStats(player.SSN)
  }
  const fetchGameData = useCallback(() => {
    setLoading(true)
    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: getPlayerStatsURL(),
      success: (data) => {
        if (data === 2) {
          setPlayerStats('')
          toaster.push(getMessage.warning('No data found for this date range, showing all games'))
          setDate('')
        } else {
          setPlayerStats(data)
        }
        setError(false)
        setLoading(false)
      },
      error: (error) => {
        setLoading(false)
        setError(error)
        setPlayerStats('')
      }
    })
  }, [setLoading, setError, setPlayerStats, date, setDate])

  useEffect(() => {
    fetchGameData()
  }, [])

  useEffect(() => {
    fetchGameData()
  }, [date])

  const setDates = useCallback((value) => {
    if (!value) {
      setDate(null)
    } else {
      setDate([formatDate(value[0]), formatDate(value[1])])
    }
  }, [setDate])

  const table = useMemo(() => <MyTable data={playerStats}/>, [playerStats])

  if (error) return <div>error</div>
  return (
    <div className="individual-team player">
      <DateRangePicker placeholder='Select date range'
        ranges={[]}
        onChange={(value) => setDates(value)}
        placement='autoVerticalStart'
      />
      {(loading)
        ? (<Loader vertical
          size="lg"
          center
          content="loading" />)
        : (
          <>
            <div className='column8-2'>
              <div>
                <div className='highlights'>
                  <img src={Player}
                    alt="player"
                    width='100'/>
                  <h2>Profile</h2>
                  <p>{`Team: ${playerStats[0].team}`}</p>
                  <p>{`Age: ${player.age}/yo`}</p>
                  <p>{`Height ${player.Height} cm`}</p>
                  <p>{`Weight: ${player.Weight} kg`}</p>
                  <p>{`FG: ${toPercent(player.fg_percentage)}`}</p>
                  <p>{`Three PT: ${toPercent(player.three_pt_percentage)}`}</p>
                  <p>{`FT: ${toPercent(player.ft_percentage)}`}</p>
                </div>
              </div>
              <div className=''>
                <h3>Games Played:</h3>
                {table}
              </div>
            </div>
          </>
        )}
    </div>
  )
}
export default DisplayPlayer
