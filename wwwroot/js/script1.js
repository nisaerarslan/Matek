document.addEventListener('DOMContentLoaded', function () {
    // JavaScript kodları buraya gelecek
    console.log('Sayfa yüklendi!');
});

document.addEventListener('DOMContentLoaded', function () {
    // Giriş butonuna basıldığında yeni sayfa açma işlemi
    document.getElementById('loginButton').addEventListener('click', function () {
        // Yeni sayfa açma kodu
        window.location.href = 'yeni_sayfa.html';
    });
});