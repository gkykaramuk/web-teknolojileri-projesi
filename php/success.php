<?php
session_start(); 


if(!isset($_SESSION["user"])){
  header("Location: login.php");
  exit();
}

$user = $_SESSION["user"];
?>

<!DOCTYPE html>
<html>
<head>
  <title>Başarılı</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="d-flex justify-content-center align-items-center" style="min-height:100vh;">
  <h2>Hoşgeldiniz <?php echo htmlspecialchars($user); ?></h2>
</div>

</body>
</html>