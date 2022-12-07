/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getQuery, orderingMapping, getMessage } from '../../appUtils'
import jQuery from 'jquery'
import { toaster, Input, Dropdown, Button, Loader } from 'rsuite'
import { MyTable } from './Table'
import { useNavigate } from 'react-router-dom'

export default function StatsComponent () {
  const navigate = useNavigate()

  // gets data to display in tables
  const [statsData, setStatsData] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // search
  const [search, setSearch] = useState('')
  const handleSearchChange = useCallback((value, e) => {
    e.preventDefault()
    setSearch(value)
  }, [setSearch])

  // ordering
  const [ordering, setOrdering] = useState('')
  const handleOrderingChange = useCallback((value) => {
    setOrdering(value)
  }, [setOrdering])

  const fetchData = useCallback(() => {
    setLoading(true)
    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: getQuery.getOverallStats(search, ordering),
      success: (data) => {
        setError(false)
        setLoading(false)
        if (data === 2) {
          toaster.push(getMessage.error('Search resulted in no data, please broaden your search'))
          setSearch('')
        } else {
          setStatsData(data)
          if (search || ordering) toaster.push(getMessage.success('Success'))
        }
      },
      error: (error) => {
        setLoading(false)
        setError(error)
        setStatsData('')
      }
    })
  }, [setLoading, setError, setStatsData, search, ordering])

  useEffect(() => {
    fetchData()
  }, [])

  const table = useMemo(() => <MyTable data={statsData}
    navigate={navigate} />, [loading, statsData, navigate])

  if (error) return <h1>{'error' || 'no data'}</h1>
  if (loading) {
    return <Loader vertical
      size="lg"
      center
      content="loading" />
  }
  return (
    <>
      <h1>Overall Statistics</h1>
      <div className="overall-header">
        <div>
          <Input placeholder="Search"
            onChange={(value, e) => { handleSearchChange(value, e) }}
            value={search}
          />
        </div>
        <div>
        </div>
        <div>
          <Dropdown title="Order By"
            activeKey={ordering}
            onSelect={(value, e) => { handleOrderingChange(value) }}>
            {orderingMapping.map((item, index) =>
              <Dropdown.Item key={index}
                eventKey={index}>{item}</Dropdown.Item>
            )}
          </Dropdown>
        </div>
        <div>
          <Button
            color="violet"
            onClick={ () => { fetchData() } }>Query</Button>
        </div>
      </div>
      {table}
    </>
  )
}
