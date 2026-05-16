# Shop Manage

Một dự án quản lý cửa hàng đơn giản bằng Node.js, bao gồm API HTTP nhẹ và giao diện dòng lệnh (CLI).

## Tính năng

- Máy chủ HTTP với các endpoint sản phẩm, giỏ hàng, đơn hàng và xác thực
- Dữ liệu được lưu trữ dưới dạng JSON trong thư mục `src/data`
- Xác thực JWT cho các route bảo vệ
- Các lệnh CLI để quản lý sản phẩm, danh mục, người dùng và đơn hàng
- Không cần cơ sở dữ liệu, chỉ dùng các module core của Node.js và vài thư viện nhẹ

## Yêu cầu

- Node.js 18+ đã cài
- npm có sẵn

## Cài đặt

```powershell
npm install
```

## Chạy máy chủ

Khởi động API server:

```powershell
npm run server
```

Chế độ phát triển nếu đã cài `nodemon` toàn cục hoặc trong dự án:

```powershell
npm run dev:server
```

Mặc định server lắng nghe cổng `3000`, trừ khi bạn đặt `PORT` trong file môi trường.

## Các endpoint API

### Root

- `GET /`
  - Trả về thông điệp chào mừng

### Xác thực

- `POST /api/auth/register`
  - Body: `{ "name": "Nguyen Van A", "email": "user@example.com", "password": "secret" }`

- `POST /api/auth/login`
  - Body: `{ "email": "user@example.com", "password": "secret" }`
  - Kết quả trả về chứa `{ token }`

- `GET /api/auth/profile`
  - Yêu cầu header `Authorization: Bearer <token>`

### Sản phẩm

- `GET /api/products`
  - Có thể thêm tham số truy vấn: `search`, `category`, `limit`

- `GET /api/products/:id`

- `POST /api/products`
  - Yêu cầu admin JWT
  - Body ví dụ: `{ "name": "iPhone 15", "price": 25000000, "stock": 10, "category": "Điện thoại" }`

- `PUT /api/products/:id`
  - Yêu cầu admin JWT
  - Body có thể chứa các trường muốn cập nhật

- `DELETE /api/products/:id`
  - Yêu cầu admin JWT

### Giỏ hàng

- `GET /api/cart`
  - Yêu cầu JWT

- `POST /api/cart/add`
  - Yêu cầu JWT
  - Body ví dụ: `{ "productId": "1234567890", "quantity": 2 }`

### Đơn hàng

- `GET /api/orders`
  - Yêu cầu JWT

- `POST /api/orders`
  - Yêu cầu JWT
  - Body ví dụ: `{ "items": [ ... ], "total": 100000 }`

## Sử dụng CLI

CLI khởi động qua `src/app.js cli`.

### Các lệnh có sẵn

- `npm run cli -- product list`
- `npm run cli -- product add --name="iPhone" --price=25000000 --stock=100 --category="Điện thoại"`
- `npm run cli -- product update --id=1234567890 --price=23000000`
- `npm run cli -- product delete --id=1234567890`

### Ví dụ

```powershell
npm run cli -- product list
npm run cli -- product add --name="Áo thun" --price=150000 --stock=50 --category="Thời trang"
```

## Lưu trữ dữ liệu

Dữ liệu được lưu vào các file JSON trong `src/data`:

- `src/data/users.json`
- `src/data/products.json`
- `src/data/orders.json`
- `src/data/cart.json`

## Biến môi trường

Bạn có thể tùy chỉnh hành vi server bằng file `.env` ở gốc dự án.

Các biến hỗ trợ:

- `PORT` — cổng server
- `JWT_SECRET` — khóa bí mật để ký JWT

## Ghi chú

- API sử dụng body JSON cho các route `POST`/`PUT`.
- Các route bảo vệ yêu cầu header `Authorization` hợp lệ.
- Tạo, cập nhật, xóa sản phẩm yêu cầu quyền admin.
- Dự án sử dụng `chalk` để tô màu terminal và `dotenv` để cấu hình môi trường.
