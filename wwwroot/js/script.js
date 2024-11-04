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

function goToLoginPage() {
    window.location.href = 'Giriş.html'; // Yönlendirilecek sayfanın adını buraya ekleyin
}
function goToIlkSayfaPage() {
    window.location.href = 'İlkSayfa.html'; // Yönlendirilecek sayfanın adını buraya ekleyin
}

function goToPage(sectionId) {
    const section = document.querySelector(sectionId);-
    window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
    });

    // Remove active class from all buttons
    document.querySelectorAll('.button').forEach(button => {
        button.classList.remove('active');
    });

    // Add active class to the clicked button
    document.querySelector(`.button[style*="${sectionId}"]`).classList.add('active');
}
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar button');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function setActiveLink() {
        sections.forEach((section, index) => {
            if (isInViewport(section)) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[index].classList.add('active');
            }
        });
    }

    document.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Initial check on page load
});
