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
     
     if( isset($Name) && isset($No_trophy) && isset($Coach_name)) {
        $stmt = $conn->prepare('Update team set No_trophy = ?, Coach_name = ? where Name = ?');
        $stmt->bind_param("iss", $No_trophy, $Coach_name, $Name);
        $stmt->execute();
        if ($stmt->affected_rows < 1) {
            echo 2;
        }
     } else {
        echo -1;
     }

     $conn->close();
?>