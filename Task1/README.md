# Task 1: DATA REPORT

Ứng dụng **Data Report** cho phép người dùng import dữ liệu từ file Excel (`.xlsx`), sau đó hiển thị báo cáo trực quan với các thẻ (Card) về **doanh thu** và **số lượng giao dịch**. Ngoài ra, ứng dụng có thể lọc dữ liệu theo **khoảng ngày** để phân tích.

---

## Công nghệ & Thư viện sử dụng

-   [**React**] – xây dựng giao diện người dùng.
-   [**TailwindCSS**]– thiết kế giao diện nhanh, tiện lợi với utility-first CSS.
-   [**Shadcn/UI**] – bộ UI component hiện đại, có thể tùy biến.
-   [**Heroicons**] – thư viện icon tối ưu cho React.
-   [**Zustand**] – quản lý state đơn giản, hiệu quả.
-   [**SheetJS (xlsx)**] – xử lý file Excel (.xlsx).
-   [**dayjs**] – thao tác với ngày tháng, so sánh khoảng thời gian.

---

## Cách chạy ứng dụng

cd Task1
npm install
npm run dev

## Cấu trúc dự án

Task1/
│── node_modules/ # Thư viện cài đặt qua npm/yarn
│── public/ # File tĩnh (favicon, ảnh, …)
│
│── src/
│ │── App.tsx # Thành phần chính, render giao diện tổng thể
│ │── index.css # File CSS gốc, import TailwindCSS
│ │── main.tsx # Điểm khởi chạy ứng dụng React
│ │── vite-env.d.ts # Khai báo type cho Vite
│
│ ├── components/
│ │ └── ui/ # Các component UI được tái sử dụng
│ │ ├── badge.tsx # Hiển thị nhãn nhỏ
│ │ ├── button.tsx # Nút bấm tuỳ chỉnh
│ │ ├── card.tsx # Thẻ (Card) chứa nội dung
│ │ ├── DateRangeFilter.tsx # Bộ lọc theo khoảng ngày
│ │ ├── Header.tsx # Header chính của ứng dụng
│ │ ├── input.tsx # Input cơ bản
│ │ ├── label.tsx # Nhãn cho input
│ │ ├── ReportFileUploader.tsx # Upload file Excel (.xlsx)
│ │ ├── RevenueCard.tsx # Hiển thị tổng doanh thu
│ │ ├── TransactionCountCard.tsx # Hiển thị số lượng giao dịch
│
│ ├── lib/
│ │ └── utils.ts # Hàm tiện ích cn để merge className
│ │ # → Kết hợp clsx + tailwind-merge
│
│ ├── stores/ # State management với Zustand
│ │ ├── useFileStore.ts # Lưu thông tin file import
│ │ ├── useInvoiceFilter.ts # Lưu trạng thái filter dữ liệu hoá đơn
│ │ ├── useInvoiceStore.ts # Lưu danh sách hoá đơn, dữ liệu báo cáo
│
│── .gitignore # Bỏ qua file/thư mục khi push Git
│── components.json # Config cho Shadcn UI
│── eslint.config.js # Cấu hình ESLint
│── index.html # HTML template gốc
│── package.json  
│── package-lock.json  
│── README.md # Tài liệu dự án
│── tsconfig.json # Cấu hình TypeScript
│── tsconfig.app.json  
│── tsconfig.node.json  
│── vite.config.ts # Cấu hình Vite
