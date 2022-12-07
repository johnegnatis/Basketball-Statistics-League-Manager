<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = 'admin123';
    $dbname = 'NBA';

    $SSN = $_GET['SSN'];
    $Start_date = $_GET['Start_date'];
    $End_date = $_GET['End_date'];

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if($conn -> connect_errno) {
        echo 'Could not connect: ' . $conn -> connect_errno;
        exit();
     }
     
     if( isset($SSN) && isset($Start_date) && isset($End_date) ) {
        $stmt = $conn->prepare(
         'select \'home\' as \'type\', pgs.Away_team as \'opponent\', pgs.Home_team as \'team\', 
            IF(g.Home_team_points >= g.Away_team_points, \'Win\', \'Loss\') as \'result\',
            pgs.Game_date, pgs.Minutes, pgs.fg_made, pgs.fg_attempt, pgs.three_pt_attempt, pgs.three_pt_made,
            pgs.ft_attempt, pgs.ft_made, pgs.plus_minus 
         from player_game_statistics pgs, player p, game g 
         where pgs.SSN = p.SSN and p.SSN = ? and (p.Team = pgs.Home_team)
            and (g.Home_team, g.Away_team, g.Game_date) = (pgs.Home_team, pgs.Away_team, pgs.Game_date)
            and pgs.Game_date >= ? and pgs.Game_date <= ?
         union
         select \'away\' as \'type\', pgs.Home_team as \'opponent\', pgs.Away_team as \'team\',
            IF(g.Home_team_points < g.Away_team_points, \'Win\', \'Loss\') as \'result\',
            pgs.Game_date, pgs.Minutes, pgs.fg_made, pgs.fg_attempt, pgs.three_pt_attempt, pgs.three_pt_made,
            pgs.ft_attempt, pgs.ft_made, pgs.plus_minus 
         from player_game_statistics pgs, player p, game g 
         where pgs.SSN = p.SSN and p.SSN = ? and (p.Team = pgs.Away_team)
            and (g.Home_team, g.Away_team, g.Game_date) = (pgs.Home_team, pgs.Away_team, pgs.Game_date)
            and pgs.Game_date >= ? and pgs.Game_date <= ?
         order by Game_date'
      );
        $stmt->bind_param("ssssss", $SSN, $Start_date, $End_date, $SSN, $Start_date, $End_date);
        $stmt->execute();
        $result = $stmt->get_result();
     } else {
        echo -1;
     }

     $emparray = array();
     while($row=$result->fetch_array(MYSQLI_ASSOC))
     {
         $emparray[] = $row;
     }

     if ($result->num_rows > 0) {
        header('Content-Type: application/json');
        echo json_encode($emparray);
      } else {
        echo 2;
      }
      $conn->close();
?>