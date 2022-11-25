<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = 'admin123';
    $dbname = 'NBA';

    $Name = $_GET['Name'];
    $No_trophy = $_GET['No_trophy'];
    $Coach_name = $_GET['Coach_name'];

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if($conn -> connect_errno) {
        echo 'Could not connect: ' . $conn -> connect_errno;
        exit();
     }
     
     $sql = 'Update team set No_trophy = ?, Coach_name = ? where Name = ?';
     $result = $conn->prepared_query($sql, [$No_trophy, $Coach_name, $Name]);

     $emparray = array();
     while($row =mysqli_fetch_assoc($result))
     {
         $emparray[] = $row;
     }

     if ($result->num_rows > 0) {
        header('Content-Type: application/json');
        echo json_encode($emparray);
      } else {
        echo "0 results or error";
      }
      $conn->close();
?>