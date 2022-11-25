/* eslint-disable react/prop-types */
import React, { useCallback, useRef, useState } from 'react'
import { Drawer, Button, Input } from 'rsuite'

export default function EditTeam ({ editData, setEditData, sendEditData }) {
  const [trophyCount, setTrophyCount] = useState(parseInt(editData.No_trophy) || 0)
  const coachRef = useRef()

  const incrementTrophy = useCallback((num) => {
    setTrophyCount((prev) => (prev + num < 0) ? 0 : prev + num)
  }, [setTrophyCount])

  const setStates = useCallback(() => {
    setTrophyCount(parseInt(editData.No_trophy))
  }, [setTrophyCount])

  const sendPayload = () => {
    const payload = {
      Coach_name: (coachRef.current.value) ? coachRef.current.value : editData.Coach_name,
      No_trophy: trophyCount,
      Name: editData.Name
    }
    sendEditData(payload)
  }

  return (
    <Drawer open={!!editData} onOpen={() => setStates} backdrop autoFocus size='xs' onClose={() => setEditData('')} placement="right">
        <Drawer.Header>
            <Drawer.Title>{`Edit Team: ${editData.Name}`}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
            {/* Edit NoTrophy */}
            <span>Edit number of trophies:</span>
            <Button onClick={() => incrementTrophy(-1)}>-</Button>
            <span>{trophyCount}</span>
            <Button onClick={() => incrementTrophy(+1)}>+</Button>

            <br />

            {/* Coach names */}
            <span>Edit coach name:</span>
            <Input placeholder={editData.Coach_name} ref={coachRef} />

            <br />

            {/* Submit */}
            <Button onClick={() => sendPayload()} appearance='primary' color='green'
            >Submit</Button>
        </Drawer.Body>
    </Drawer>
  )
}
