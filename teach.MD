# Prettier, ESLint va Husky — Ular nima va qanday ishlatiladi?

Ushbu qisqacha qollanmada loyihamizdagi kod sifatini ta'minlovchi uchta asosiy vosita bilan qanday ishlash tushuntirilgan.

---

## 1. Prettier (Kod Formatlovchi)

**Prettier bu nima?**  
Kodni avtomatik ravishda bir xil o'lchamga va chiroyli dizaynga keltiruvchi vosita. Masalan: probellar, bitta qatorning uzunligi, yakkalik (`' '`) yoki ikkilik (`" "`) qo'shtirnoqlarni bir xil ko'rinishga keltiradi.

**Qanday ishlatiladi?**

- **Qo'lda ishlatish:** Terminalda `npm run format` deb yozsangiz, u butun loyihadagi fayllarni o'qib, chiroyli qilib joyiga qo'yib chiqadi.
- **VS Code da avtomatik ishlatish:** Eng yaxshi yo'li - VS Code ga _Prettier_ kengaytmasini (extension) o'rnatish va sozlamalardan "Format on Save" (Saqlanganda formatlash) tugmasini yoqib qo'yish. Shunda `Ctrl + S` bosganingizda kod o'z-o'zidan taxlanib qoladi.

---

## 2. ESLint (Xatolarni ushlovchi - Linter)

**ESLint bu nima?**  
Yozgan kodingizdagi ehtimoliy xatolarni, yomon amaliyotlarni yoki ishlatilmagan o'zgaruvchilarni topib, ularni oldini olishga yordam beruvchi dastur.

**Qanday ishlatiladi?**

- **Qo'lda ishlatish:** Terminalda `npm run lint` deb yozsangiz, ESLint barcha fayllarni tekshirib, xatolarni topadi va qo'ldan kelgancha avtomatik ravishda ularni to'g'rilaydi.
- **VS Code da avtomatik ishlatish:** _ESLint_ extension'i orqali xatolarni dastur yozish jarayonidayoq tagiga qizil chiziq tortish orqali ko'rib turishingiz mumkin.

---

## 3. Husky va Lint-staged (Soqchilar)

**Bular nima?**
- **Husky:** Git'ning ichki jarayonlariga aralashadigan dastur. Asosan "git commit" qilishdan biroz oldin biz xohlagan buyruqlarni ishga tushirib berish uchun javobgar bo'ladi (Bunga Git Hooks deyiladi).
- **Lint-staged:** ESLint va Prettier'ni **faqatgina hozir siz o'zgartirgan fayllardagina** ishga tushirib beruvchi aqlli vosita. (Har safar butun proyektni tekshirib o'tirmaslik uchun, bu juda tez ishlaydi).

**Husky qanday ishlaydi va uni qanday ishlataman?**

Husky orqa fonda avtomatlashgan soqchi (qorovul) kabi ishlaydi. Uning ishlash jarayonini to'liq tushunish uchun quyidagi misolni ko'rib chiqamiz:

1. **Siz kod yozdingiz:** Aytaylik, qaysidir faylda kod yozdingiz. Lekin shoshilganingizdan qatorlarni noto'g'ri joylashtirdingiz (format buzildi) yoki ishlatilmaydigan o'zgaruvchi (`const a = 10;`) qoldirib ketdingiz.
2. **Commit qilishga urindingiz:** Terminalda `git add .` va `git commit -m "yangi o'zgarishlar"` buyrug'ini berdingiz (yoki VS Code ning source control oynasi orqali commit qildingiz).
3. **Husky uyg'onadi:** Commit saqlanishidan millisoniyalar oldin Husky darhol jarayonni to'xtatib turadi.
4. **Lint-staged ishga tushadi:** Husky avtomatik ravishda `.husky/pre-commit` ichida yozilgan buyruqni (`npx lint-staged`) o'qiydi va lint-staged ishga tushadi. 
5. **Prettier formatlaydi:** Lint-staged avvalo siz o'zgartirgan koddagi probellar, qo'shtirnoqlarni to'g'irlab taxlab chiqadi.
6. **ESLint tekshiradi:** Keyin esa ESLint xatolarni qidiradi.
7. **Natija:** 
   - **Muvaffaqiyat:** Agar kodingiz toza bo'lsa yoki ESLint o'zi xatolarni to'g'irlay olsa, kod muvaffaqiyatli saqlanadi. Commit o'tadi! 🎉
   - **Xatolik (Error):** Agar boyagidek ishlatilmagan o'zgaruvchi topsa yoki jiddiy xato (Syntax Error) bo'lsa, terminalda qizil yozuvda xatolik nimaligi ko'rsatiladi va **commit bekor qilinadi**. Ya'ni xatoli kodingiz GitHub'ga ketishidan saqlab qolinadi! ⛔

**Muhim qo'shimcha (Bypass - Aylanib o'tish):**
Ba'zida shunday holatlar bo'ladiki, kodingizda xato bo'lsa ham tezda commit qilib Github'ga saqlashingiz juda zarur bo'lib qoladi (masalan, ishingiz yarimta qolgan va boshqa kompyuterda davom ettirmoqchisiz). 
Bunday paytda Husky tekshiruvini aylanib o'tish uchun commit buyrug'iga `--no-verify` so'zini qo'shib qo'yasiz:
```bash
git commit -m "chala kod" --no-verify
```
Ushbu buyruqni berganingizda Husky tekshiruv o'tkazmaydi va commit majburiy tarzda saqlanadi. Ammo buni doimiy ishlatish **tavsiya etilmaydi!**

> **Xulosa:** Husky va Lint-staged xuddi filtr vazifasini o'taydi. Jamoada ishlayotganda hammani bir xil tartibda, xatolarsiz va toza kod yozishga majbur qiladi.

---

## 4. O'zingiz qanday qilib qo'lda tekshirib ko'rishingiz mumkin? (Amaliyot)

Husky rostdan ham ishlayotganini o'z ko'zingiz bilan ko'rmoqchi bo'lsangiz, hoziroq quyidagi amallarni bajaring:

**1-qadam (Xato qilish):** 
Loyihadagi ixtiyoriy bitta faylga (masalan `src/App.tsx`) kirib, eng tepasiga kerak bo'lmagan qandaydir kod yozib qo'ying, masalan:
```typescript
const sinovUchun = 123; // Hech qayerda ishlatilmagan o'zgaruvchi
```

**2-qadam (Commit qilishga urinish):** 
Terminalni oching va shu o'zgarishni Github'ga saqlashga (commit qilishga) harakat qiling:
```bash
git add .
git commit -m "Husky ishlashini tekshiryapman"
```

**3-qadam (Natijani ko'rish):**
Shu zahoti terminalda Husky va Lint-staged ishga tushib, fayllarni tekshirishni boshlaydi. Birozdan so'ng terminalda **qizil yozuvda xatolik** chiqadi va commit bekor qilinadi. ESLint sizga aynan qaysi faylda `sinovUchun` degan o'zgaruvchi ishlatilmasdan yotganini aytib beradi. Kod git'ga saqlanmadi! ⛔

**4-qadam (Xatoni to'g'rilab saqlash):**
Endi `src/App.tsx` ga qaytib, boyagi yozgan noto'g'ri kodni o'chirib tashlang.
Keyin terminalda yana qaytadan tepadagi buyruqlarni bering:
```bash
git add .
git commit -m "Husky ishlashini tekshiryapman"
```
Bu safar kod toza bo'lgani uchun, Husky tekshiruvdan o'tkazadi va kodingiz muvaffaqiyatli saqlanadi (commit bo'ladi)! 🎉
