document.getElementById('viewPdfBtn').addEventListener('click', function() {
    var fileInput = document.getElementById('pdfInput');
    var file = fileInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var pdfWindow = window.open('');
        pdfWindow.document.write('<embed width="100%" height="100%" src="' + e.target.result + '" type="application/pdf">');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Lütfen bir PDF dosyası seçin.');
    }
  });
  function goToLink() {
    window.location.href = "https://ogmmateryal.eba.gov.tr/";
  }