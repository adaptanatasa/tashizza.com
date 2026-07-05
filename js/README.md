# TASHIZZA – JavaScript

Ovaj direktorijum sadrži JavaScript kod koji se koristi na sajtu TASHIZZA.

Organizacija nije napravljena po bibliotekama ili knjigama, već po funkcionalnim celinama kako bi isti kod mogao da se koristi na više mesta.

---

# Struktura

```
js/
├── gallery/
├── navigation/
├── ui/
└── README.md
```

---

# gallery/

Sadrži JavaScript za različite vrste galerija.

Primeri:

```
gallery/
├── og-gallery.js
├── image-gallery.js      (planirano)
├── pdf-gallery.js        (planirano)
└── video-gallery.js      (planirano)
```

---

## og-gallery.js

Univerzalna galerija Open Graph (OG) ilustracija.

Ovaj JavaScript ne sadrži informacije o konkretnoj knjizi.

Svaka knjiga definiše sopstvenu konfiguraciju kroz objekat:

```javascript
window.ogGalleryConfig = {
    folder: "...",
    images: [
        ...
    ]
};
```

Tek nakon toga učitava se:

```html
<script src="../../js/gallery/og-gallery.js"></script>
```

Na taj način isti JavaScript može da koristi neograničen broj knjiga i biblioteka.

---

## Primer

```html
<script>
window.ogGalleryConfig = {

    folder:
        "../../img/biblioteke/caskanje/ljubavno-pismo-ucenju/og/",

    images: [
        "og-01.png",
        "og-02.png",
        "og-03.png"
    ]

};
</script>

<script src="../../js/gallery/og-gallery.js"></script>
```

---

# navigation/

Rezervisano za JavaScript koji upravlja navigacijom.

Planirani primeri:

- prelazak između poglavlja
- navigacija između knjiga
- navigacija između biblioteka
- pretraga sadržaja

---

# ui/

Rezervisano za JavaScript korisničkog interfejsa.

Planirani primeri:

- modali
- animacije
- dugmad
- teme
- pomoćni vizuelni elementi

---

# Pravila

## 1.

JavaScript treba da bude univerzalan.

Ne praviti poseban JS za svaku knjigu ako ista funkcionalnost već postoji.

---

## 2.

Specifični podaci pripadaju HTML stranici.

Na primer:

- lista slika
- putanja do foldera
- konfiguracija galerije

ne nalaze se u JavaScript fajlu već u:

```javascript
window.ogGalleryConfig
```

---

## 3.

JavaScript treba da rešava samo logiku.

HTML određuje sadržaj.

CSS određuje izgled.

JavaScript određuje ponašanje.

---

## 4.

Svaki novi JavaScript fajl treba smestiti u odgovarajući poddirektorijum prema funkciji, a README ažurirati njegovim opisom.

---

# Filozofija projekta

Cilj TASHIZZA projekta nije samo funkcionalan sajt već i primer uredno organizovanog izvornog koda koji može poslužiti kao obrazovni materijal početnicima.

Struktura projekta treba da bude jasna, pregledna, lako proširiva i jednostavna za održavanje tokom dugog niza godina.
