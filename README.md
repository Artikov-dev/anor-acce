# Anor Accelerator

Bu loyiha avtomobillarni ijaraga berish (Car Rental) xizmatiga mo'ljallangan platforma bo'lib, zamonaviy web texnologiyalar asosida qurilgan.

## Ishlatilgan Texnologiyalar (Stack)

Ushbu loyihada quyidagi texnologiyalar va kutubxonalar ishlatilgan:

### Asosiy Texnologiyalar

- **[React 19](https://react.dev/)**: Foydalanuvchi interfeysini (UI) qurish uchun asosiy kutubxona.
- **[TypeScript](https://www.typescriptlang.org/)**: JavaScript'ga statik tiplar qo'shuvchi dasturlash tili.
- **[Vite 8](https://vitejs.dev/)**: Tezkor frontend build-tool (Loyihani tezroq ishga tushirish va yig'ish uchun).
- **[React Router 7](https://reactrouter.com/)**: Sahifalar orasida o'tish (routing) uchun.

### UI / Komponentlar va Dizayn

- **[Mantine UI (v9)](https://mantine.dev/)**: Tayyor, responsiv va chiroyli React komponentlar to'plami. Loyihada shuningdek `@mantine/hooks`, `@mantine/form`, `@mantine/notifications`, `@mantine/modals`, `@mantine/dates` kengaytmalari ishlatilgan.
- **[Tabler Icons React](https://tabler-icons.io/)**: Loyihaga mos va zamonaviy ikonka to'plami.
- **[Remix Icon React](https://remixicon.com/)**: Qoshimcha ikonka to'plami.

### Holat (State) va Ma'lumotlarni Boshqarish

- **[TanStack React Query](https://tanstack.com/query/latest)**: API bilan ishlash, server state'ni boshqarish va caching uchun.
- **[DayJS](https://day.js.org/)**: Sana va vaqtlarni qulay formatlash va boshqarish uchun engil kutubxona.

### Kod Sifati va Tooling

- **ESLint & Prettier**: Kod standartini saqlash, xatoliklarni erta aniqlash va formatlash.
- **Husky & Lint-Staged**: Git commit qilishdan oldin kodni avtomatik tekshirish va formatlash uchun pre-commit hooklar.
- **PostCSS**: CSS bilan ishlash, Mantine o'zgaruvchilarini to'g'ri integratsiya qilish uchun.

## Qanday ishga tushiriladi?

1. Loyihani yuklab oling yoki clone qiling.
2. Kerakli paketlarni o'rnating:
   ```bash
   npm install
   ```
3. Loyihani dev rejimida ishga tushiring:

   ```bash
   npm run dev
   ```

   Loyiha standart bo'yicha `http://localhost:5173` manzilida ochiladi.

4. Loyihani ishlab chiqarish (production) uchun yig'ish:
   ```bash
   npm run build
   ```

## Loyiha Tuzilmasi (Folder Structure)

Asosiy kodlar `src/` papkasida joylashgan:

- `api/` - Backend API bilan ishlash uchun so'rovlar
- `assets/` - Rasmlar va statik fayllar
- `components/` - Qayta ishlatiluvchi UI komponentlar
- `hooks/` - Maxsus React hooklari (Custom Hooks)
- `pages/` - Asosiy sahifalar (Pages)
- `routes/` - Router sozlamalari
- `types/` - TypeScript interfeys va tiplari
