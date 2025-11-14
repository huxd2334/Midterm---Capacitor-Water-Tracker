# Water Tracker (Capacitor + React, JS/JSX)
## Thông tin sinh viên
- Họ tên: Lê Cẩm Bình
- MSSV: 22IT.EB007
- Lớp: 22KIT
- Học phần: Phát triển ứng dụng di động đa nền tảng (2)
- Course: Mobile Cross-Platform Development (2)


## Mô tả
- Ứng dụng theo dõi nước uống nhỏ gọn (JS/JSX) với 2 màn hình:

    - Màn hình chính: hiển thị tổng ml đã uống trong ngày, nút +100 / +200 / +300. Khi bấm, giá trị lưu vào Capacitor Storage và (tuỳ chọn) rung nhẹ bằng Haptics.

    - Màn hình lịch sử: danh sách thời gian + lượng nước đã thêm trong ngày.
## Cấu trúc thư mục
```
water-tracker/
├─ package.json
├─ capacitor.config.ts
├─ README.md
├─ public/
│  └─ index.html
└─ src/
├─ main.jsx
├─ App.jsx
├─ storage.js
├─ components/
│  └─ History.jsx
├─ styles.css
└─ utils.js
```
## Yêu cầu
- Node.js 16+ (khuyến nghị 18+)
- npm
- Capacitor CLI (tuỳ chọn để chạy trên device/emulator): `npm install -g @capacitor/cli`

## Cài đặt
1. Clone hoặc copy project.
2. `npm install`

## Build cho Capacitor (Android / iOS)
1. `npm run build`
2. `npx cap add android` hoặc `npx cap add ios`
3. `npx cap sync`
4. `npx cap open android` hoặc `npx cap open ios` để mở Android Studio / Xcode
5. Build / Run trên emulator hoặc thiết bị thật

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
