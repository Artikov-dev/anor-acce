# Anor Accelerator

Bu loyiha avtomobillarni ijaraga berish (Car Rental) xizmatiga mo'ljallangan zamonaviy web platforma bo'lib, eng so'nggi React va TypeScript texnologiyalari asosida yaratilgan.

---

## 🚀 Ishlatilgan Texnologiyalar (Stack)

### 🔹 Asosiy Texnologiyalar

- **[React 19](https://react.dev/)**: Foydalanuvchi interfeysini (UI) qurish uchun asosiy kutubxona.
- **[TypeScript 6](https://www.typescriptlang.org/)**: Statik tiplar bilan xavfsiz kod yozish uchun.
- **[Vite 8](https://vitejs.dev/)**: Ultra-tezkor build-tool va dasturlash serveri.
- **[React Router 7](https://reactrouter.com/)**: Sahifalar o'rtasida navigatsiya (routing) uchun.

### 🔹 UI va Dizayn

- **[Mantine UI (v9)](https://mantine.dev/)**: Tayyor, zamonaviy va responsive komponentlar to'plami (`@mantine/core`, `@mantine/hooks`, `@mantine/form`, `@mantine/notifications`, `@mantine/modals`, `@mantine/dates`).
- **[Tabler Icons](https://tabler-icons.io/)** va **[Remix Icons](https://remixicon.com/)**: Zamonaviy ikonkalardan foydalanish uchun.

### 🔹 Holat va API boshqaruvi (State & API)

- **[Zustand 5](https://zustand-demo.pmnd.rs/)**: Global holatni (Auth status, user profil, token) yengil va qulay boshqarish uchun.
- **[TanStack React Query (v5)](https://tanstack.com/query/latest)**: Server ma'lumotlarini keshlashtirish, so'rovlarni boshqarish va avtomatik yangilash uchun.
- **[Axios](https://axios-http.com/)**: Backend REST API bilan ishlash va so'rovlar (interceptor) xavfsizligini ta'minlash uchun.
- **[DayJS](https://day.js.org/)**: Sana va vaqtlarni formatlash uchun.

### 🔹 Kod Sifati va Avtomatlashtirish (Tooling)

- **ESLint & Prettier**: Kod standartini saqlash va formatlash.
- **Husky & Lint-Staged**: Git commit va push qilishdan oldin kodni avtomatik tekshirish.

---

## 💻 Loyihani Ishga Tushirish Yo'riqnomasi

Loyihani o'z kompyuteringizda ishga tushirish uchun quyidagi bosqichlarni bajaring:

### 1. Repository-ni yuklab oling (Clone)

```bash
git clone https://github.com/Artikov-dev/anor-acce.git
cd anor-accelerator
```

### 2. Bog'liqliklarni o'rnating (Install Dependencies)

```bash
npm install
```

### 3. Loyihani Dev rejimida ishga tushiring (Run Local Server)

```bash
npm run dev
```

So'ng brauzeringizda **`http://localhost:5173`** manziliga kiring.

---

## 🛠️ Mavjud Buyruqlar (Scripts)

| Buyruq            | Tavsifi                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------- |
| `npm run dev`     | Loyihani lokal ravishda ishga tushirish (Vite Dev Server)                               |
| `npm run build`   | TypeScript tekshiruvi va production uchun tayyor kodingizni yig'ish (`dist/` papkasiga) |
| `npm run preview` | Yig'ilgan production versiyani mahalliy test qilib ko'rish                              |
| `npm run lint`    | ESLint orqali koddagi xatoliklarni aniqlash va avtomatik tuzatish                       |
| `npm run format`  | Prettier yordamida loyihadagi barcha kodlarni avtomatik formatlash                      |

---

## 📁 Loyiha Tuzilmasi (Folder Structure)

```text
anor-accelerator/
├── src/
│   ├── api/            # Backend API bilan aloqa qiluvchi so'rovlar (Axios instansiyasi, auth, products)
│   ├── assets/         # Statik fayllar (rasmlar, ikonka va b.)
│   ├── components/     # Qayta ishlatiladigan UI komponentlar (Layout, Header, ProductCard va b.)
│   ├── data/           # Mahalliy statik ma'lumotlar
│   ├── hooks/          # Maxsus React hooklari (useAuthQueries, useProducts va b.)
│   ├── pages/          # Sahifa komponentlari (Home, Catalog, Login, Register, Product va b.)
│   ├── routes/         # Sahifalar yo'nalishlari (React Router sozlamalari)
│   ├── store/          # Zustand global store'lari (useAuthStore.ts)
│   ├── types/          # TypeScript interfeyslari va tiplari
│   ├── App.tsx         # Asosiy App komponenti
│   └── main.tsx        # Dasturga kirish nuqtasi (Providers: Mantine, QueryClient, Router)
├── public/             # Public resurslar
├── index.html          # HTML andozasi
└── package.json        # Paketlar va buyruqlar royxati
```
