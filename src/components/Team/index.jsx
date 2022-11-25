import React, { useState, useEffect, useCallback } from 'react'

import jQuery from 'jquery'
import { Table } from './Table'
import EditTeam from './EditTeam'
import { getQuery } from '../../appConstants'

export default function Team () {
  const [teamData, setTeamData] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // to edit
  const [editData, setEditData] = useState('')

  useEffect(() => {
    setLoading(true)
    const req = jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: getQuery.getTeams(),
      success: (data) => {
        setLoading(false)
        setTeamData(data)
        setError(false)
      },
      error: (error) => {
        setLoading(false)
        setError(error)
        setTeamData('')
      }
    })

    return () => {
      req.abort()
      setTeamData('')
    }
  }, [])

  const setTeamName = (name) => {
    const editTuple = teamData.find((row) => row.Name === name)
    if (editTuple) {
      setEditData(editTuple)
    } else {
      console.error('typeNotFound Team/index.jsx')
    }
  }
  if (loading) return <h1>Loading...</h1>
  if (error || !teamData || teamData.length <= 0) return <h1>{error || 'no data'}</h1>

  const sendEditData = useCallback((payload) => {
    setLoading(true)
    setEditData('')
    const query = getQuery.editTeam(payload.Name, payload.No_trophy, payload.Coach_name)
    jQuery.ajax({
      type: 'GET',
      dataType: 'json',
      url: query,
      success: (data) => {
        console.log('success')
      },
      error: () => {
        console.error('fail')
      }
    })
  }, [])

  return (
      <>
        <Table data={teamData} editTeamName={setTeamName}/>
        <EditTeam setEditData={setEditData} editData={editData} sendEditData={sendEditData} />
      </>
  )
}
