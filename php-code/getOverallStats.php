<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = 'admin123';
    $dbname = 'NBA';
    if(isset($_GET['Search'])){
      $Search = $_GET['Search'];
    }
    if(isset($_GET['Order'])){
      $Order = $_GET['Order'];
    }

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if($conn -> connect_errno) {
        echo 'Could not connect: ' . $conn -> connect_errno;
        exit();
     }
     
     $sql = 'select p.Fname, p.Lname, p.Team, fg_percentage, three_pt_percentage, ft_percentage,
     plus_minus_avg from overall_preformance op, player p
     where op.SSN = p.SSN';

     if(isset($Search)) {
      $sql .= ' and (p.Fname like \'%'.$Search.'%\' or p.Lname like \'%'.$Search.'%\' or p.Team  like \'%'.$Search.'%\')';
     }
     if(isset($Order)) {
      if($Order == 1) {
        $sql .= ' order by ft_percentage desc';
      } 
      if($Order == 2) {
        $sql .= ' order by fg_percentage desc';
      }
      if($Order == 3) {
        $sql .= ' order by three_pt_percentage desc';
      }
      if($Order == 4) {
        $sql .= ' order by (fg_percentage / average_minutes ) desc';
      }
      if($Order == 5) {
        $sql .= ' order by (plus_minus_avg / p.Height) desc';
      }
      if($Order == 6) {
        $sql .= ' order by (p.Height/p.Weight) desc';
      }
     }

     $result = $conn->query($sql);

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