# 📌 Task 2: FORM

Ứng dụng **Form Validation** được xây dựng bằng React + TypeScript, sử dụng **Zod** để kiểm tra dữ liệu đầu vào.  
Người dùng có thể nhập dữ liệu vào form, hệ thống sẽ validate và hiển thị lỗi trực quan nếu dữ liệu không hợp lệ.

---

## Công nghệ & Thư viện sử dụng

-   [**React**] – xây dựng giao diện người dùng.
-   [**TypeScript**] – giúp code an toàn và dễ bảo trì hơn.
-   [**TailwindCSS**] – hỗ trợ thiết kế giao diện nhanh gọn.
-   [**Shadcn/UI**] – bộ UI component hiện đại.
-   [**Zod**] – thư viện schema validation mạnh mẽ cho TypeScript.

---

## Cách chạy ứng dụng

-   cd Task2
-   npm install
-   npm run dev

## Cấu trúc dự án

Task2/
│── node_modules/  
│── public/  
│
│── src/
│ │── App.tsx # Thành phần chính, render form và logic validation
│ │── index.css # File CSS gốc, import TailwindCSS
│ │── main.tsx # Điểm khởi chạy ứng dụng React
│ │── vite-env.d.ts # Khai báo type cho Vite
│
│ ├── components/
│ │ └── ui/ # Các component UI tái sử dụng
│ │ ├── button.tsx # Nút bấm
│ │ ├── input.tsx # Input field (có validate lỗi)
│ │ ├── label.tsx # Nhãn cho input
│ │ ├── select.tsx # Dropdown (select option)
│
│ ├── lib/
│ │ └── utils.ts # Hàm tiện ích `cn` để merge className (clsx + tailwind-merge)
│
│── .gitignore  
│── components.json  
│── eslint.config.js  
│── index.html # HTML template gốc
│── package.json  
│── package-lock.json  
│── README.md # Tài liệu dự án
│── tsconfig.json # Cấu hình TypeScript
│── tsconfig.app.json  
│── tsconfig.node.json  
│── vite.config.ts # Cấu hình Vite
