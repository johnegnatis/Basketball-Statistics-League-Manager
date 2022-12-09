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
        $stmt = $conn->prepare('select Fname, Lname, Height, Weight, Dateofbirth, No_trophy, Coach_name,
        average_minutes, fg_total, fg_percentage, three_pt_total, three_pt_percentage, ft_total, ft_percentage, p.SSN, plus_minus_avg, FLOOR(DATEDIFF(CURDATE(), p.Dateofbirth) / 365.25) as \'age\'
        from player p, team t, overall_preformance o
        where p.Team = t.Name and t.Name = ? and p.SSN = o.SSN');
        $stmt->bind_param("s", $Name);
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