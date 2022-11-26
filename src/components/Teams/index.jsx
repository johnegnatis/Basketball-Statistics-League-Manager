import React, { useState, useEffect, useCallback } from 'react'
import jQuery from 'jquery'
import { Table } from './Table'
import EditTeam from './EditTeam'
import { getQuery, getMessage } from '../../appConstants'
import { useToaster } from 'rsuite'

export default function Team () {
  // gets data to display in tables
  const [teamData, setTeamData] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const fetchData = useCallback(() => {
    setLoading(true)
    jQuery.ajax({
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
  }, [setLoading, setError, setTeamData])

  useEffect(() => {
    fetchData()
  }, [])

  // varibles for editing table
  const [editData, setEditData] = useState('')
  const [editLoading, setEditLoading] = useState(false)

  // sets team name to edit
  const setTeamName = (name) => {
    const editTuple = teamData.find((row) => row.Name === name)
    if (editTuple) {
      setEditData(editTuple)
    } else {
      console.error('typeNotFound Team/index.jsx')
    }
  }

  // edit data using api call
  const toaster = useToaster()
  const sendEditData = (payload) => {
    setEditLoading(true)
    const query = getQuery.editTeam(payload.Name, payload.No_trophy, payload.Coach_name)
    jQuery.ajax({
      url: query,
      success: (msg) => {
        if (msg === '2') {
          toaster.push(getMessage.warning('Nothing was updated'))
        } else if (msg === '-1') {
          toaster.push(getMessage.error('Update failed'))
        } else {
          setEditData('')
          toaster.push(getMessage.success('Update successful'))
          fetchData()
        }
      },
      error: () => {
        toaster.push(getMessage.error('Update failed'))
      }
    })
    setEditLoading(false)
  }

  if (loading) return <h1>Loading...</h1>
  if (error || !teamData || teamData.length <= 0) return <h1>{error || 'no data'}</h1>
  return (
      <>
        <Table data={teamData} editTeamName={setTeamName}/>
        <EditTeam loading={editLoading} setEditData={setEditData} editData={editData} sendEditData={sendEditData} />
      </>
  )
}
