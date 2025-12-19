# Selenis Derm — Site Static

Site simplu pentru o clinică dermatologică, realizat în HTML, CSS și JavaScript, fără framework-uri.

## Caracteristici
- Pagini/secțiuni: hero, beneficii, servicii, echipa, testimoniale, programări, contact
- Navigație responsivă (meniul se pliază pe mobil)
- Formular de programare cu validare minimă pe client
- Stilizare curată, fără dependențe externe

## Structură
- `index.html` — conținutul principal al site-ului
- `styles.css` — stiluri responsiv și paletă de culori
- `script.js` — meniul mobil, scroll lin, validarea formularului
- `404.html` — pagină 404 simplă (utilă pentru GitHub Pages)
- `.github/workflows/pages.yml` — workflow GitHub Actions pentru publicare pe Pages
- `.gitignore` — fișiere inutile pentru repo

## Cum rulezi local
- Varianta rapidă: deschide `index.html` în browser.
- În VS Code: instalează extensia "Live Server" și pornește pe `index.html`.

## Publicare pe GitHub Pages (recomandat)
### Varianta cu GitHub Actions (automat)
1. Creează un repository pe GitHub și setează branch-ul implicit `main`.
2. Fă push cu fișierele din proiect.
3. Workflow-ul din `.github/workflows/pages.yml` va încărca artifact-ul și va publica automat.
4. Verifică pagina publicată în tab-ul "Actions" sau în "Settings → Pages".

URL-ul final:
- Repo de tip user/org (ex. `username.github.io`): site-ul se publică la `https://username.github.io/`.
- Repo de tip proiect (ex. `selenis.derm`): `https://username.github.io/selenis.derm/`.

### Varianta din Settings (manual)
1. Mergi la "Settings → Pages".
2. La "Build and deployment", selectează "Source: GitHub Actions".
3. Confirmă și așteaptă rularea workflow-ului.

## Personalizare
- Actualizează textele (nume medici, program, adresă) direct în `index.html`.
- Culorile se pot ajusta în `styles.css` (variabile CSS).
- Logica de trimitere reală a formularului (spre un backend) nu este inclusă.

## Licență
Proiect simplu de prezentare. Folosește-l liber în scop intern/comercial.
