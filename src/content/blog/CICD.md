---
title: "CI/CD: Cara Bikin Proyek Lo Auto-Jalan Sendiri (Biar Ga Kebanyakan Rebahan)"
description: "Continuous Integration (CI) dan Continuous Deployment/Delivery (CD). Kedengeran keren, ya? Tapi intinya, CI/CD itu kayak punya asisten yang bantuin kita biar nggak repot nge-deploy atau nge-build project tiap saat."
pubDate: "Nov 15 2024"
heroImage: "/images/cicd.jpg"
---

## Apa Itu CI/CD?

Oke, CI/CD itu sebenarnya singkatan dari Continuous Integration (CI) dan Continuous Deployment/Delivery (CD). Kedengeran keren ya? Tapi intinya, CI/CD itu kayak punya asisten yang bantuin kita biar nggak repot nge-deploy atau nge-build project tiap saat. Lo jadi nggak perlu tiap kali ada update harus manual nge-push, nge-deploy, atau ngebuild lagi. Biar ga pusing, gampangnya kayak gini:

- **CI (Continuous Integration)**: Kalau developer dalam satu tim pada bikin fitur baru, CI bakal ngecek kode itu sebelum di-merge. Dia pastiin semua oke, ngelakuin tes, biar nggak rusak.
- **CD (Continuous Deployment/Delivery)**: Setelah kodenya fix dan oke, CD bakal otomatis nge-deploy ke server atau ke production. Kalau pake Continuous Deployment, tiap kode yang udah masuk langsung live, tapi kalau Delivery, deploynya bisa diatur, manual atau otomatis sesuai keinginan.

## Kenapa Harus Pakai CI/CD? Emang Penting?

Bro, kalau lo developer yang sering update code atau kerja di tim yang jumlah dev-nya kayak angkatan perang, CI/CD tuh penting banget. Soalnya:

- **Auto-Update Tanpa Drama**: Bayangin lagi ngerjain project, ada bug yang muncul tiap kali update. Rata-rata developer langsung kena serangan jantung kecil pas tahu deploy-an error. Nah, CI/CD itu bantu ngecek otomatis kodenya sebelum di-push ke server. Jadi, pas deploy, tinggal duduk santai, minum kopi, beresin yang lain.

- **Kerja Tim Jadi Lebih Mulus**: Tiap developer punya style coding masing-masing, dan kadang suka bikin tim jadi clash. CI/CD bantu merge semua kode dalam satu tempat tanpa harus ‘duel’ sama temen developer lain. Ibaratnya, CI/CD jadi penengah yang adil di antara semua developer.

- **Hemat Waktu, Kode Langsung Terbang ke Server**: Siapa sih yang mau kerjaan manual terus? Pake CI/CD, kode yang udah aman langsung terbang ke server tanpa banyak basa-basi. Pas tidur, kode kita bisa tetep hidup. Gokil gak sih?

## Setup CI/CD yang Simple Tapi Manjur

Oke, gue bakal bahas step-by-step untuk setup CI/CD, biar gampang diterapin dan lo nggak pusing. Gue contohin pake GitHub Actions deh, karena simpel dan banyak yang pake.
Lo cuma perlu buat file yaml di repo lo, tepatnya di folder `.github/workflows`. Misalnya lo kasih nama file `ci.yaml`. File ini bakal jadi instruksi buat GitHub apa aja yang harus dicek, dan kapan nge-deploy.
Di file yaml tadi, lo masukin instruksi CI. Biasanya lo bisa tambahin langkah kayak lint, test, dan build biar ketahuan errornya dari awal. Contoh konfigurasi sederhananya kayak gini:

```yaml title="ci.yaml"
name: Continous Integration

on:
  pull_request:
    branches:
      - master

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    # Lo bahkan bisa tambahin service lain yang lo butuhin, misalnya database, redis atau apapun
    services:
      postgres:
        image: postgres
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: secret
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: npm install migrate and test
        run: |
          npm install
          npm run migrate up
          npm run test
        env:
        # nah disini, lo bahkan bisa tambahin env lain
          FOO: bar
          BAR: foo
```

Abis tesnya jalan dan sukses, tambahin instruksi buat deploy otomatis. Kalau lo pake platform kayak `Heroku`, `Vercel`, atau `Netlify`, biasanya ada Action-nya tinggal pake aja. tapi disini gua bakal contohin pake `VPS` sams `SSH`, lets goo! nah, masih di folder yang sama, lo bisa bikin file baru dengan nama `cd.yaml`
```yaml title="cd.yaml"
name: Continous Deployment

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: SSH and deploy app
        uses: appleboy/ssh-action@master
        with:
        # Note: secrets bisa kalian konfigurasi di setting repo, biar gak dimaling orang lain
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          password: ${{ secrets.SSH_PASSWORD }}
          port: ${{ secrets.SSH_PORT }}
          script: |
            cd /www/wwwroot/myapp
            git pull origin master
            npm install
            npm run migrate up
            pm2 restart myapp
```
That's it, Save kedua file `yaml` tadi, commit, dan push ke repo lo. Dari situ, GitHub bakal otomatis baca file yaml dan ngerjain tugas CI/CD. EZPZ rek!!!!

## CI/CD Tools yang lain, lain lagi dan lain lain

Selain GitHub Actions, masih banyak tools buat CI/CD. Ini ada beberapa yang ngehits:
- **Jenkins**: Udah legend banget di dunia CI/CD, open-source, dan powerful.
- **GitLab CI/CD**: Biasanya buat yang main di GitLab.
- **CircleCI**: Simpel, dan cocok buat yang suka integrasi sama cloud service.
- **Travis CI**: Punya community besar, cocok buat project open-source.

## Kesimpulan: CI/CD Biar Lo Ga Capek Nge-Deploy Manual Mulu

Dengan CI/CD, lo nggak perlu ribet buat testing dan deploy manual tiap ada update. Kalau ada yang error, sistemnya bakal langsung notif lo, jadi lo bisa fix tanpa delay panjang. Hasilnya? Tim lo bakal lebih produktif, lo punya waktu lebih buat hal-hal penting (kayak tidur dan ngopi, misalnya), dan project lo selalu siap buat diakses user.