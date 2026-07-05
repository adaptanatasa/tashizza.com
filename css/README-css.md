# TASHIZZA – CSS arhitektura

Ovaj dokument opisuje organizaciju CSS fajlova na sajtu **TASHIZZA**.

Cilj arhitekture je da omogući jednostavno održavanje i proširivanje sajta na stotine HTML stranica bez dupliranja koda i bez haosa u stilovima.

---

# Glavni CSS fajl

Sve HTML stranice pozivaju samo jedan fajl.

Za stranice u root direktorijumu:

```html
<link rel="stylesheet" href="css/style.css">
```

Za stranice u podfolderima:

```html
<link rel="stylesheet" href="../../css/style.css">
```

`style.css` je jedini CSS fajl koji HTML stranice direktno učitavaju.

---

# style.css

`style.css` služi isključivo kao glavni ulazni fajl.

Njegova jedina uloga je da učita ostale CSS module pomoću `@import`.

Ne dodavati stilove direktno u `style.css`.

---

# Struktura

```text
css/
│
├── style.css
├── README-css.md
│
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── background.css
│
├── components/
│   ├── navigation.css
│   ├── footer.css
│   ├── banners.css
│   ├── buttons.css
│   ├── images.css
│   ├── lists.css
│   ├── preview.css
│   └── og-gallery.css
│
└── models/
    ├── osnovna-index.css
    ├── naslovna-sadrzaj-knjige.css
    └── tekst-price-lekcije.css
```

---

# Folder `base`

Sadrži osnovne stilove koji važe za ceo sajt.

| Fajl | Namena |
|------|---------|
| `reset.css` | osnovno ponašanje HTML elemenata |
| `typography.css` | fontovi, naslovi, paragrafi, tekst |
| `background.css` | osnovna TASHIZZA pozadina i mapa znanja |

---

# Folder `components`

Sadrži delove interfejsa koji se ponavljaju na različitim stranicama.

| Fajl | Namena |
|------|---------|
| `navigation.css` | navigacija i dropdown meniji |
| `footer.css` | footer |
| `banners.css` | naslovni baneri |
| `buttons.css` | dugmad |
| `images.css` | slike u tekstovima |
| `lists.css` | posebni stilovi lista |
| `preview.css` | preview kartice i slike |
| `og-gallery.css` | Open Graph galerija |

---

# Folder `models`

Sadrži stilove koji zavise od tipa stranice.

## 1. Početna strana

```text
osnovna-index.css
```

Koristi se za:

- `index.html`

---

## 2. Stranice sadržaja

```text
naslovna-sadrzaj-knjige.css
```

Koristi se za:

- naslovne strane knjiga
- naslovne strane tutorijala
- naslovne strane praktikuma
- biblioteke

---

## 3. Stranice sa tekstom

```text
tekst-price-lekcije.css
```

Koristi se za:

- poglavlja knjiga
- lekcije
- tutorijale
- priče
- članke
- tekstove

---

# Dodavanje nove HTML stranice

Prvo odrediti kom modelu pripada.

| Tip strane | CSS model |
|------------|-----------|
| Početna strana | `osnovna-index.css` |
| Naslovna strana knjige ili tutorijala | `naslovna-sadrzaj-knjige.css` |
| Pojedinačna priča, lekcija ili tekst | `tekst-price-lekcije.css` |

---

# Dodavanje novog CSS fajla

Ako stil važi za ceo sajt:

```text
base/
```

Ako predstavlja komponentu koja se ponavlja:

```text
components/
```

Ako važi samo za određeni model stranice:

```text
models/
```

Nakon dodavanja novog CSS fajla potrebno ga je uključiti u `style.css` pomoću `@import`.

---

# Putanje do slika

Putanja se uvek računa u odnosu na CSS fajl u kome se nalazi.

Na primer, iz fajla:

```text
css/models/osnovna-index.css
```

slike iz foldera:

```text
img/ui/
```

pozivaju se ovako:

```css
background-image: url("../../img/ui/paint-blue.png");
```

---

# Pravila održavanja

- HTML stranice učitavaju isključivo `style.css`.
- Ne koristiti ugrađeni (`inline`) CSS.
- Ne dodavati stilove direktno u HTML osim kada je to zaista neophodno.
- Ne pisati CSS direktno u `style.css`.
- Novi stilovi dodaju se u odgovarajući modul.
- Voditi računa da se isti stil ne piše na više mesta.

---

# Cilj arhitekture

Ovakva organizacija omogućava da TASHIZZA raste na veliki broj HTML stranica uz jednostavno održavanje, pregledan kod i jasnu podelu odgovornosti između osnovnih stilova, komponenti i modela stranica.
