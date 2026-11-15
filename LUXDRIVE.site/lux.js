// Naviqasiyanı seçirik
var nav = document.querySelector(".up");

// Səhifə scroll olunanda işləyir
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});


// "Rental terms" düyməsinə klikləyəndə yeni səhifə açmadan göstərir
var termsLink = document.querySelector(".terms-link");
var termsModal = document.getElementById("termsModal");
var termsFrame = document.getElementById("termsFrame");
var termsClose = document.getElementById("termsClose");

if (termsLink && termsModal) {
    termsLink.addEventListener("click", function (e) {
        e.preventDefault();
        termsFrame.src = "./RentalTerms.html";
        termsModal.classList.add("open");
    });
}

if (termsClose) {
    termsClose.addEventListener("click", function () {
        termsModal.classList.remove("open");
        termsFrame.src = "";
    });
}

// Rental Terms səhifəsindəki 3 tab arasında keçid
var tabButtons = document.querySelectorAll(".tab-btn");
var pageTitle = document.getElementById("pageTitle");
var breadcrumbTitle = document.getElementById("breadcrumbTitle");

tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");

        tabButtons.forEach(function (b) { b.classList.remove("active"); });
        document.querySelectorAll(".tab-pane").forEach(function (p) { p.classList.remove("active"); });

        btn.classList.add("active");
        document.getElementById(target).classList.add("active");

        // Yuxarıdakı başlıq basılan düymənin adı ilə dəyişir
        if (pageTitle) {
            pageTitle.textContent = btn.textContent;
        }
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = btn.textContent;
        }
    });
});
// Siçanı basıb sola çəkəndə loqoların sürətini artırır
var brandsTrack = document.querySelector(".brands-track");
var isDragging = false;
var dragStartX = 0;

if (brandsTrack) {
    brandsTrack.addEventListener("mousedown", function (e) {
        isDragging = true;
        dragStartX = e.clientX;
    });

    window.addEventListener("mousemove", function (e) {
        if (!isDragging) return;

        var diff = e.clientX - dragStartX;

        if (diff < 0) {
            brandsTrack.classList.add("fast");
        } else {
            brandsTrack.classList.remove("fast");
        }
    });

    window.addEventListener("mouseup", function () {
        isDragging = false;
        brandsTrack.classList.remove("fast");
    });
}





var sualBloklari = document.querySelectorAll(".sual-blok");

sualBloklari.forEach(function (blok) {
    var sualHissesi = blok.querySelector(".question");

    sualHissesi.addEventListener("click", function () {
        blok.classList.toggle("acik");
    });
});




// LEASING KALKULYATORU

// 1) "New Car" / "Car from Catalog" düymələri
var calcTabs = document.querySelectorAll(".calc-tab");
calcTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        calcTabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");

        // "Car from Catalog" seçiləndə aşağıdakı kataloqa yavaş-yavaş sürüşür
        if (tab.getAttribute("data-tab") === "catalog") {
            var katalog = document.querySelector(".leasing-catalog-section");
            katalog.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// 2) Lease term (12/24/36/48) düymələri
var termBtns = document.querySelectorAll(".term-btn");
termBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        termBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        hesabla();
    });
});

// 3) Sürgü (range) ilə ədəd qutusunu bir-birinə bağlayırıq
function slideriBagla(sliderId, valueId) {
    var slider = document.getElementById(sliderId);
    var value = document.getElementById(valueId);

    if (!slider || !value) return;

    slider.addEventListener("input", function () {
        value.value = slider.value;
        hesabla();
    });

    value.addEventListener("input", function () {
        slider.value = value.value;
        hesabla();
    });
}

slideriBagla("priceSlider", "priceValue");
slideriBagla("initialSlider", "initialValue");
slideriBagla("residualSlider", "residualValue");

// 4) Aylıq ödənişi hesablayır
function hesabla() {
    var price = Number(document.getElementById("priceValue").value) || 0;
    var initial = Number(document.getElementById("initialValue").value) || 0;
    var residual = Number(document.getElementById("residualValue").value) || 0;

    var activeTerm = document.querySelector(".term-btn.active");
    var months = activeTerm ? Number(activeTerm.getAttribute("data-term")) : 12;

    var qalan = price - initial - residual;
    if (qalan < 0) qalan = 0;

    var aylik = Math.round(qalan / months);

    document.getElementById("monthlyOut").textContent = aylik + " €";
}