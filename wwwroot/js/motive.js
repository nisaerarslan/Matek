const quotes = [{
    quote:' "Kazanma isteği ve başarıya ulaşma arzusu birleşirse kişisel mükemmelliğin kapısını açar." ' ,
    writer:'-Konfüçyüs'
}, {
    quote:' "Hiçbir şeyden vazgeçme, çünkü sadece kaybedenler vazgeçer." ' ,
    writer:'-Abraham Lincoln'
},{
    quote:' "Başarıya çıkan asansör bozuk. Bekleyerek zaman kaybetmeyin, adım adım merdivenleri çıkmaya başlayın." ' ,
    writer:'-Joe Girard'
},{
    quote:' "Fırsatlar durup dururken karşınıza çıkmaz, onları siz yaratırsınız." ' ,
    writer:'-Chris Grosser'
},{
    quote:' "Şansa çok inanırım ve ne kadar çok çalıştıysam ona o kadar çok sahip oldum." ' ,
    writer:'-Thomas Jefferson'
}, ]

let btn = document.querySelector("#Qbtn");
let quote = document.querySelector(".quote");
let writer = document.querySelector(".writer");

btn.addEventListener("click", function(){
    let random = Math.floor(Math.random() * quotes.length);
    quote.innerHTML = quotes[random].quote;
    writer.innerHTML= quotes[random].writer;
}) 