const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/') // Thư mục lưu ảnh
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Đặt tên file
    }
});

const upload = multer({ storage: storage });

// Phục vụ file tĩnh
app.use(express.static('public'));

// Route xử lý upload ảnh
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Không có file nào được upload' });
    }
    res.json({ 
        message: 'Upload thành công',
        filename: req.file.filename
    });
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
}); 