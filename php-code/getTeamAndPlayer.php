<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = 'admin123';
    $dbname = 'NBA';

    $Name = $_GET['Name'];

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if($conn -> connect_errno) {
        echo 'Could not connect: ' . $conn -> connect_errno;
        exit();
     }
     
     if( isset($Name) ) {
        $stmt = $conn->prepare('select Fname, Lname, Height, Weight, Dateofbirth, No_trophy, Coach_name
        from player p, team t
        where p.Team = t.Name and t.Name = ?');
        $stmt->bind_param("s", $Name);
        $stmt->execute();
     } else {
        echo -1;
     }

     $emparray = array();
     while($row =mysqli_fetch_assoc($result))
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