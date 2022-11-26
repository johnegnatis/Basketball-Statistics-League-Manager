/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react'
import jQuery from 'jquery'
import { getQuery } from '../../appConstants'
import { Table } from './Table'

const DisplayTeam = ({ teamName }) => {
  // gets data to display in tables
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const fetchData = useCallback(() => {
    setLoading(true)
    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: getQuery.getTeamAndPlayers(teamName),
      success: (data) => {
        setLoading(false)
        setData(data)
        setError(false)
      },
      error: (error) => {
        setLoading(false)
        setError(error)
        setData('')
      }
    })
  }, [setLoading, setError, setData])

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{`error ${error}`}</div>
  return (
    <Table data={data} />
  )
}
export default DisplayTeam
