import React from "react";
import { useState, useEffect } from 'react';
import jQuery from "jquery";
import { Table } from "./Table";

export default function Team() {

    const [teamData, setTeamData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
      let req = jQuery.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'http://localhost/nba/getTeams.php',
        success: (data) => { 
            setLoading(false);
            setTeamData(data);
            setError(false);
        },
        error: (error) => {
            setLoading(false);
            setError(error);
            setTeamData('');
        }
      });

      return () => {
        req.abort();
        setTeamData('');
      }
    }, []);
  
    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>
    if (teamData && teamData.length > 0) return <Table data={teamData} />
}