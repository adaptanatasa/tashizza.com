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
│   ├── og-gallery.css
│   └── code.css
│
├── vendor/
│   └── prism-theme.css
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
| `code.css` | kratki kod u tekstu i okviri blokova koda |

---

# Folder `vendor`

Sadrži CSS pravila spoljnih biblioteka.

| Fajl | Namena |
|------|---------|
| `prism-theme.css` | boje za isticanje programske sintakse pomoću Prism.js |

Prismova tema se u `style.css` učitava pre `components/code.css`, kako bi naš CSS imao poslednju reč o okviru, pozadini, fontu i razmacima:

```css
@import url("vendor/prism-theme.css");
@import url("components/code.css");
```

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

# Prism.js – isticanje sintakse u tutorijalima

Prism.js boji delove programskog koda prema jeziku: ključne reči, funkcije, promenljive, stringove, brojeve, komentare, operatore, HTML oznake i atribute.

Prismovi fajlovi na sajtu nalaze se na sledećim mestima:

```text
css/vendor/prism-theme.css
css/components/code.css
js/syntax/prism.js
```

Njihove uloge su odvojene:

| Fajl | Uloga |
|------|-------|
| `prism.js` | prepoznaje jezik i označava delove sintakse |
| `prism-theme.css` | određuje boje sintakse |
| `code.css` | uređuje pozadinu, okvir, font i razmake kodova |

## Poziv Prism skripte

Na svakoj HTML stranici koja prikazuje programski kod, neposredno pre završne oznake `</body>`, dodati:

```html
<script src="/js/syntax/prism.js"></script>
</body>
```

Pošto se TASHIZZA objavljuje na sopstvenom domenu `www.tashizza.com`, putanja koja počinje znakom `/` uvek vodi od korena sajta. Isti poziv zato radi u svim tutorijalima bez obzira na dubinu njihovog podfoldera.

Prism nije potrebno pozivati na stranicama koje nemaju blokove programskog koda.

## Kratak kod unutar rečenice

Za komandu, naziv fajla, polja, funkcije ili vrednosti unutar običnog teksta koristi se samo element `<code>`:

```html
<p>Pokrenite komandu <code>sudo apt update</code>.</p>
```

Kratkom kodu se ne dodaje klasa `language-*`.

## Višeredni blok programskog koda

Kompletan primer koda piše se unutar `<pre><code>` i obavezno mu se dodaje klasa jezika:

```html
<pre><code class="language-python">def pozdrav(ime):
    print(f"Zdravo, {ime}!")</code></pre>
```

Opšti obrazac je:

```html
<pre><code class="language-NAZIV-JEZIKA">kod</code></pre>
```

## Spisak Prism klasa

| Vrsta koda | Klasa u elementu `<code>` |
|------------|----------------------------|
| Bash i komande Linux terminala | `language-bash` |
| Python | `language-python` |
| SQL | `language-sql` |
| PHP | `language-php` |
| YAML | `language-yaml` |
| JSON | `language-json` |
| HTML i XML | `language-markup` |
| CSS | `language-css` |
| JavaScript | `language-javascript` |
| PowerShell | `language-powershell` |
| Java | `language-java` |
| C | `language-c` |
| C++ | `language-cpp` |
| Dockerfile | `language-docker` |
| Običan tekst ili izlaz komande | `language-none` |

## Primeri najčešćih jezika

### Bash

```html
<pre><code class="language-bash">sudo apt update
sudo apt upgrade</code></pre>
```

### Python

```html
<pre><code class="language-python">def saberi(a, b):
    return a + b</code></pre>
```

### SQL

```html
<pre><code class="language-sql">SELECT ime, prezime
FROM korisnici
WHERE aktivan = TRUE;</code></pre>
```

### YAML

```html
<pre><code class="language-yaml">apiVersion: v1
kind: Pod
metadata:
  name: primer</code></pre>
```

### HTML

HTML oznake unutar bloka koda moraju biti zapisane kao `&lt;` i `&gt;`, kako ih pregledač ne bi protumačio kao stvarne elemente stranice:

```html
<pre><code class="language-markup">&lt;article class="lekcija"&gt;
  &lt;h2&gt;Naslov lekcije&lt;/h2&gt;
&lt;/article&gt;</code></pre>
```

### Izlaz komande i običan tekst

Kada sadržaj predstavlja rezultat izvršene komande, a ne naredbu koju treba pokrenuti, koristi se `language-none`:

```html
<pre><code class="language-none">NAME       STATUS
worker-01  Ready
worker-02  Ready</code></pre>
```

## Važna pravila

- `<code>` koristiti za kratke tehničke izraze unutar rečenice.
- `<pre><code>` koristiti za višeredne blokove.
- Svakom bloku dodati odgovarajuću klasu `language-*`.
- Komande koje korisnik treba da unese označiti kao `language-bash` ili `language-powershell`.
- Rezultate komandi označiti kao `language-none`.
- Sačuvati originalna uvlačenja, naročito u YAML-u i Pythonu, jer ona mogu imati funkcionalno značenje.
- U HTML primerima zameniti znakove `<` i `>` zapisima `&lt;` i `&gt;`.
- Ne koristiti element `<code>` za ukrasne razdelnike kao što je znak `|`.

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
