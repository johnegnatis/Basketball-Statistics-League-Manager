<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = 'admin123';
    $dbname = 'NBA';

    $Name = $_GET['Name'];
    $Start_date = $_GET['Start_date'];
    $End_date = $_GET['End_date'];

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if($conn -> connect_errno) {
        echo 'Could not connect: ' . $conn -> connect_errno;
        exit();
     }
     
     if( isset($Name) && isset($Start_date) && isset($End_date) ) {
        $stmt = $conn->prepare('select Home_team, Away_team, Home_team_points, Away_team_points,
        Game_date
        from game g
        where (g.Home_team = ? or Away_team = ?)
        and Game_date >= ? and Game_date <= ?
        order by Game_date desc');
        $stmt->bind_param("ssss", $Name, $Name, $Start_date, $End_date);
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