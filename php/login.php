<?php
session_start(); // ← En üste ekleyin

$dogruEmail = "b241210005@sakarya.edu.tr";
$dogruSifre = "b241210005";

if($_SERVER["REQUEST_METHOD"] == "POST"){
  $email = $_POST["email"] ?? "";
  $password = $_POST["password"] ?? "";

  if(empty($email) || empty($password)){
    $hata = "Boş alan bırakmayın!";
  }
  else if($email == $dogruEmail && $password == $dogruSifre){
    $ogrNo = explode("@", $email)[0];
    
    $_SESSION["user"] = $ogrNo; 
    
    header("Location: success.php"); 
    exit();   
  }
  else{
    header("Location: login.php?error=1");
    exit();
  }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giriş Yap</title>
    <link rel="stylesheet" href="/css/login.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>
<body>
    
 <div class="d-flex justify-content-center align-items-center px-4 " style="min-height: 70vh;">
  <div class="col-12 col-sm-8 col-md-6 col-xl-5 p-4 login-card text-center">

    <h2 class="fw-bold mb-1">Web Projesi</h2>   
    <p class="text-muted mb-4">Giriş Yap</p>

      <?php if(isset($_GET['error'])): ?>
        <div class="alert alert-danger">
          Hatalı giriş!
        </div>
      <?php endif; ?>
      
    <form id="loginForm" method="POST" action="login.php">

      <div class="mb-3 text-start">
        <label for="email" class="form-label">Kullanıcı Adı</label>
        <input type="text" id="email" name="email" class="form-control" required>
      </div>

      <div class="mb-3 text-start">
        <label for="password" class="form-label">Şifre</label>
        <input type="password" id="password" name="password" class="form-control" required>
      </div>

      <button type="submit" class="btn btn-dark w-100">Giriş Yap</button>

    </form>

 </div>
</div>


<script>
    document.getElementById("loginForm").addEventListener("submit", function(e){

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if(email === "" || password === ""){
    alert("Tüm alanları doldurun");
    e.preventDefault();
    }

    else if(!emailPattern.test(email)){
    alert("Geçerli bir mail girin");
     e.preventDefault();
    }

    });
</script>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" 
    integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" 
    crossorigin="anonymous"></script>
</body>
</html>