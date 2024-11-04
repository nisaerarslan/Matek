let notlar = [];

function notEkle() {
    const inputNot = document.getElementById('not').value;
    if (inputNot >= 1 && inputNot <= 5) {
        notlar.push(parseFloat(inputNot));
        document.getElementById('notlar').innerHTML += inputNot + " ";
        const toplam = notlar.reduce((acc, curr) => acc + curr, 0);
        const ortalama = (toplam / notlar.length).toFixed(2);
        document.getElementById('ortalama').innerHTML = "Sınıf Ortalaması: " + ortalama;
    } else {
        alert("Lütfen 1 ile 5 arasında bir not giriniz.");
    }
}