// Check the source code for the questions
const kelimeList = [
    {
      kelime: "ALAN",
      ipucu: "Bir yüzey parçasının ölçüsüdür.",
    },
    
    {
      kelime: "AÇI",
      ipucu: "Başlangıç noktaları aynı olan iki ışının birleşim kümesidir.",
    },
    
    {
      kelime: "ASAL SAYI",
      ipucu: "Bir sayma sayısı asal çarpanlarının çarpımı şeklinde yazmadır",
    },
    {
      kelime: "AYRIT",
      ipucu: "Bir cismin iki yüzeyinin arakesitidir.",
    },
    {
      kelime: "BOYUT",
      ipucu: "Uzunluk, genişlik ve yükseklikten her biridir.",
    },
    {
      kelime: "BÖLEN",
      ipucu: "Bir bölme işleminde bölünenin kaç eşit parçaya ayrıldığını gösteren sayıdır.",
    },
    {
      kelime: "BÖLÜM",
      ipucu: "Bölme işleminde bölünen içinde bölenin kaç defa olduğunu gösteren sayıdır.",
    },
    
    {
      kelime: "BÖLÜNEN",
      ipucu: "Bölme işleminde eşit kısımlara ayrılmak istenen sayıdır.",
    },
    {
      kelime: "CİSİM",
      ipucu: " Bir küme ve bu küme üzerinde tanımlanmış iki işlemin belli şartları taşımasıdır.",
    },
    {
      kelime: "ÇAP",
      ipucu: "Çemberin merkezinden geçen kiriştir.",
    },
    {
      kelime: "ÇARPAN",
      ipucu: "Bir çarpma işlemindeki sayılardan her biridir.",
    },
    {
      kelime: "ÇARPIM",
      ipucu: "Çarpma işleminin sonucudur.",
    },
    {
      kelime: "ÇEMBER",
      ipucu: "Düzlemde sabit bir noktadan aynı uzaklıkta bulunan noktaların kümesidir.",
    },
    
  
    {
      kelime: "ÇIKAN",
      ipucu: "Çıkarma işleminde, eksilenden ne kadar eksiltileceğini gösteren sayıdır.",
    },
    {
      kelme: "ÇİFT SAYI",
      ipucu: "2 ile tam bölünebilen sayıdır.",
    },
    
    {
      kelime: "DAR AÇI",
      ipucu: "Ölçüsü 90° den küçük olan dar açıdır.",
    },
    {
      kelime: "EKSİLEN",
      ipucu: "Çıkarma işleminde azaltılması istenen sayıdır.",
    },
    {
      kelime: "EBOB",
      ipucu: "İki veya daha çok sayma sayısını ortak olarak bölen sayma sayılarının en büyüğüdür.",
    },
   
    {
      kelime: "EKOK",
      ipucu: "İki veya daha çok sayma sayılarının ortak katlarının en küçüğü olan sayıdır….",
    },
    {
      kelime: "FAİZ",
      ipucu: "Bankaya yatırılan paranın belirli bir süre sonunda getirdiği kazançtır.",
    },
    {
      kelime: "FARK",
      ipucu: "Çıkarma işleminin sonucudur.",
    },
    {
      kelime: "GENİŞLİK",
      ipucu: "Dikdörtgen veya dikdörtgenler prizmasında boyutlardan biridir.",
    },
  
    {
      kelime: "HACİM",
      ipucu: "Kapalı uzay parçasının ölçüsüdür… Bir uzay parçasında birim hacimin kaç defa olduğunu gösteren sayıdır.",
    },
    
    {
      kelime: "KALAN",
      ipucu: "Bölme işleminde bölünenden artan veya çıkarma işlemindeki farktır.",
    },
    {
      kelime: "KARE",
      ipucu: "Bütün kenarları eş ve karşılıklı açıları dik olan dörtgendir.",
    },
    {
      kelime: "KESİR",
      ipucu: "Bütünün eş parçalarından bir veya birkaçını gösteren sayıdır.",
    },
  
    {
      kelime: "KONİ",
      ipucu: "Tabanı dairesel ya da elips biçiminde olan ve yukarı doğru gitgide daralarak sivrilen cisimdir.",
    },
    {
      kelime: "KÜP",
      ipucu: "Altı yüzü de karesel bölge olan prizmadır.",
    },
    
    {
      kelime: "KÜRE",
      ipucu: "Uzayda, sabit bir noktaya eşit uzaklıkta bulunan noktaların kümesidir.",
    },
    {
      kelime: "ORANTI",
      ipucu: "İki oranın eşitliğidir.",
    },
    {
      kelime: "ORAN",
      ipucu: "Aynı ölçü birimi ile ölçülebilen çoklukların veya iki kümenin elemanlarının bölüm yoluyla karşılaştırılmasıdır.",
    },
  
    {
      kelime: "ORTAK BÖLEN",
      ipucu: "Birden fazla sayma sayısını kalansız olarak bölen sayma sayısıdır.",
    },
    {
      kelime: "ORTAK KAT",
      ipucu: "Birden fazla sayma sayısının katı olan sayma sayısıdır.",
    },
    {
      kelime: "PARELELKENAR",
      ipucu: " Karşılıklı kenarları paralel olan dörtgendir.",
    },
    {
      kelime: "RAKAM",
      ipucu: "Sayıları yazmak için kullanılan işaretlerdir.",
    },
    {
      kelime: "TAM AÇI",
      ipucu: "Ölçüsü 360° olan açıdır.",
    },
    {
      kelime: "TEK SAYI",
      ipucu: "Çift olmayan tamsayıdır.",
    },
    {
      kelime: "YAMUK",
      ipucu: "Yalnız iki kenarı paralel dörtgendir.",
    },
    
    {
      kelime: "YARI ÇAP ",
      ipucu: "Çemberin merkezini herhangi bir noktasına birleştiren doğru parçasıdır.",
    },
    {
      kelime: "YAY",
      ipucu: "Çember üzerinde farklı iki nokta ile sınırlı çember parçasıdır.",
    },
  
    {
      kelime: "UZAY",
      ipucu: "Bütün varlıkların içinde bulunduğu sonsuz sayıda noktaların oluşturduğu kümedir.",
    },
    
  ];
  