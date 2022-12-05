import React, { useState, useEffect, useCallback } from 'react'
import { getQuery } from '../../appUtils'
import jQuery from 'jquery'
import { Loader } from 'rsuite'
import { MyTable } from './Table'

export default function StatsComponent () {
  // gets data to display in tables
  const [statsData, setStatsData] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const fetchData = useCallback(() => {
    setLoading(true)
    console.log(getQuery.getOverallStats())
    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: getQuery.getOverallStats(),
      success: (data) => {
        setLoading(false)
        setStatsData(data)
        setError(false)
      },
      error: (error) => {
        setLoading(false)
        setError(error)
        setStatsData('')
      }
    })
  }, [setLoading, setError, setStatsData])

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <Loader vertical
      size="lg"
      center
      content="loading" />
  }
  if (error || !statsData || statsData.length <= 0) return <h1>{'error' || 'no data'}</h1>
  return (
    <MyTable data={statsData} />
  )
}
