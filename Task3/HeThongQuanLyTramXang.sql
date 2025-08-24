CREATE DATABASE HETHONGQUANLYTRAMXANG;
GO

USE HETHONGQUANLYTRAMXANG;
GO

-- Bảng Trạm Xăng
CREATE TABLE TramXang (
    MaTramXang CHAR(5) NOT NULL CONSTRAINT PK_TX PRIMARY KEY,
    TenTramXang NVARCHAR(50),
    DiaChi NVARCHAR(50),
    TrangThai BIT DEFAULT 1 -- 1: hoạt động, 0: ngừng
);

-- Bảng Hàng Hóa
CREATE TABLE HangHoa (
    MaHangHoa CHAR(5) NOT NULL CONSTRAINT PK_HH PRIMARY KEY,
    TenHangHoa NVARCHAR(50),
    Loai NVARCHAR(20),
    DonViTinh NVARCHAR(10),
    GiaBan INT
);

-- Bảng Trụ Bơm
CREATE TABLE TruBom (
    MaTruBom CHAR(5) NOT NULL,
    MaTramXang CHAR(5) NOT NULL,
    MaHangHoa CHAR(5) NOT NULL,
    TenTruBom NVARCHAR(50),
    TrangThai BIT DEFAULT 1, -- 1: hoạt động, 0: ngừng
    CONSTRAINT PK_TB PRIMARY KEY (MaTruBom, MaTramXang),
    CONSTRAINT FK_TB_MTX FOREIGN KEY (MaTramXang) REFERENCES TramXang(MaTramXang),
    CONSTRAINT FK_TB_MHH FOREIGN KEY (MaHangHoa) REFERENCES HangHoa(MaHangHoa)
);

-- Bảng Giao Dịch
CREATE TABLE GiaoDich (
    MaGiaoDich CHAR(5) NOT NULL CONSTRAINT PK_GD PRIMARY KEY,
    MaTruBom CHAR(5) NOT NULL,
    MaTramXang CHAR(5) NOT NULL,
    ThoiGian DATETIME,
    SoLuong INT,
    CONSTRAINT FK_GD_MTB_MTX FOREIGN KEY (MaTruBom, MaTramXang)
        REFERENCES TruBom(MaTruBom, MaTramXang)
);

-- Lấy tất cả giao dịch của 1 trạm trong khoảng ngày
-- ví dụ: MaTramXang = 'TX001' từ ngày '2025-08-01' đến ngày '2025-08-24'

DECLARE @MaTramXang CHAR(5) = 'TX001';
DECLARE @NgayBatDau DATETIME = '2025-08-01';
DECLARE @NgayKetThuc DATETIME = '2025-08-20';

SELECT gd.MaGiaoDich, gd.MaTruBom, gd.MaTramXang, gd.ThoiGian, gd.SoLuong, (gd.SoLuong * hh.GiaBan) AS ThanhTien FROM GiaoDich gd JOIN TruBom tb
ON gd.MaTruBom = tb.MaTruBom AND gd.MaTramXang = tb.MaTramXang
JOIN HangHoa hh
ON tb.MaHangHoa = hh.MaHangHoa
WHERE gd.MaTramXang = @MaTramXang AND gd.ThoiGian >= @NgayBatDau AND gd.ThoiGian < DATEADD(DAY, 1, @NgayKetThuc)

-- Tổng doanh thu theo ngày cho 1 trụ bơm
-- ví dụ: MaTruBom = 'TB001' ngày '2025-08-24'

DECLARE @MaTruBom CHAR(5) = 'TB001';
DECLARE @Ngay DATETIME = '2025-08-24';

SELECT @MaTruBom AS MaTruBom, @Ngay AS Ngay, SUM(gd.SoLuong * hh.GiaBan) AS TongDoanhThuTheoTruBom FROM GiaoDich gd JOIN TruBom tb
ON gd.MaTruBom = tb.MaTruBom AND gd.MaTramXang = tb.MaTramXang
JOIN HangHoa hh
ON tb.MaHangHoa = hh.MaHangHoa
WHERE gd.MaTruBom = @MaTruBom AND CAST(gd.ThoiGian AS DATE) = @Ngay
GROUP BY gd.MaTruBom

-- Tổng doanh thu theo ngày cho 1 trạm

SELECT @MaTramXang AS MaTramXang, @Ngay AS Ngay, SUM(gd.SoLuong * hh.GiaBan) AS TongDoanhThuTheoTram FROM GiaoDich gd JOIN TruBom tb
ON gd.MaTruBom = tb.MaTruBom AND gd.MaTramXang = tb.MaTramXang
JOIN HangHoa hh
ON tb.MaHangHoa = hh.MaHangHoa
WHERE gd.MaTramXang = @MaTramXang AND CAST(gd.ThoiGian AS DATE) = @Ngay
GROUP BY gd.MaTramXang

-- Lấy top 3 hàng hoá chạy nhất và tổng số lít tại một trạm trong tháng

DECLARE @Thang INT = '8'

SELECT TOP 3 hh.MaHangHoa, hh.TenHangHoa, SUM(gd.SoLuong * hh.GiaBan) AS TongDoanhThu, SUM(gd.SoLuong) AS TongSoLit FROM GiaoDich gd JOIN TruBom tb
ON gd.MaTruBom = tb.MaTruBom AND gd.MaTramXang = tb.MaTramXang
JOIN HangHoa hh
ON tb.MaHangHoa = hh.MaHangHoa
WHERE MONTH(gd.ThoiGian) = @Thang AND gd.MaTramXang = @MaTramXang
GROUP BY hh.MaHangHoa, hh.TenHangHoa
ORDER BY TongSoLit DESC