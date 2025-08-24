# Task 4: DATA STRUCTURE & ALGORITHM

## Giới thiệu

-   Bài toán yêu cầu xử lý nhiều truy vấn (**query**) trên một mảng số nguyên.
-   Có 2 loại truy vấn chính:
    -   **Type 1:** Tính tổng các phần tử trong đoạn `[l, r]`.
    -   **Type 2:** Tính tổng xen kẽ trong đoạn `[l, r]` (chẵn cộng, lẻ trừ).

## Cách thực hiện

-   Sử dụng **Prefix Sum** để tối ưu việc tính toán:
    -   `prefix1`: Mảng cộng dồn dùng cho truy vấn **Type 1**.
    -   `prefix2`: Mảng cộng dồn xen kẽ (chẵn `+`, lẻ `-`) dùng cho truy vấn **Type 2**.
-   Các bước chính:
    1. Gọi API `https://share.shub.edu.vn/api/intern-test/input` để lấy dữ liệu `data`, `query`, và `token`.
    2. Khởi tạo `prefix1` và `prefix2`.
    3. Xử lý từng truy vấn trong `query` và lưu kết quả vào `results`.
    4. Gửi kết quả bằng phương thức **POST** đến `https://share.shub.edu.vn/api/intern-test/output` kèm `Bearer token`.

## Cách chạy chương trình

-   cd Task4
-   npm install
-   npm run dev
