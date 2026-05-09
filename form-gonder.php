<?php

$username    = $_POST['username'] ?? '';
$email       = $_POST['email'] ?? '';
$phone       = $_POST['phone'] ?? '';
$information = $_POST['information'] ?? '';
$date        = $_POST['date'] ?? '';
$content     = $_POST['content'] ?? '';
$message     = $_POST['message'] ?? '';
$gender      = $_POST['gender'] ?? '';
$contact     = $_POST['contact'] ?? '';

$interestNames = ['web','cyber','ai','mobile','game','data','backend','ui-ux','blockchain'];
$selectedInterests = [];
foreach ($interestNames as $name) {
    if (isset($_POST[$name])) {
        $selectedInterests[] = $_POST[$name];
    }
}
$interests = implode(', ', $selectedInterests);

?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Form Sonucu</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
    <h2>Gönderilen Form Bilgileri</h2>
    <hr>
    <table class="table table-bordered">
        <tr><th>Ad Soyad</th><td><?= htmlspecialchars($username) ?></td></tr>
        <tr><th>E-posta</th><td><?= htmlspecialchars($email) ?></td></tr>
        <tr><th>Telefon</th><td><?= htmlspecialchars($phone) ?></td></tr>
        <tr><th>Konu</th><td><?= htmlspecialchars($information) ?></td></tr>
        <tr><th>Tarih</th><td><?= htmlspecialchars($date) ?></td></tr>
        <tr><th>Konu İçeriği</th><td><?= htmlspecialchars($content) ?></td></tr>
        <tr><th>Mesaj</th><td><?= htmlspecialchars($message) ?></td></tr>
        <tr><th>Cinsiyet</th><td><?= htmlspecialchars($gender) ?></td></tr>
        <tr><th>İletişim Türü</th><td><?= htmlspecialchars($contact) ?></td></tr>
        <tr><th>İlgi Alanları</th><td><?= htmlspecialchars($interests) ?></td></tr>
    </table>
    <a href="iletisim.html" class="btn btn-dark mt-3">Geri Dön</a>
</div>
</body>
</html>