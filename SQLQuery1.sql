CREATE DATABASE EventBookingSystem;
GO

USE EventBookingSystem;
GO

select * from Roles;

select * from Users;

select * from Events;

INSERT INTO Users ( FullName, Email, PasswordHash, PhoneNumber, Status, CreatedAt, LastLoginAt)
VALUES
    ( 'John Doe', 'john.doe@example.com', 'hashedpassword1', '1234567890', 'Active', GETUTCDATE(), DATEADD(DAY, -1, GETUTCDATE())),
    ( 'Jane Smith', 'jane.smith@example.com', 'hashedpassword2', '0987654321', 'Active', GETUTCDATE(), DATEADD(DAY, -2, GETUTCDATE()));

INSERT INTO Events ( Name, Description, ArtistInfo, Category, StartDate, EndDate, VenueName, VenueAddress, TotalTickets, RemainingTickets, Status, CreatedAt, CreatedBy, ImageUrls)
VALUES
    ( 'MINIONS: THE RISE OF GRU', 'Minions - Những Quả Chuối Vàng biết đi sẽ trở lại trong câu chuyện chưa kể về tuổi thơ của Gru - cậu bé mười hai tuổi mơ được trở thành ác nhân xuất sắc nhất thế giới.', 'Various Artists', 'Music', DATEADD(DAY, 10, GETUTCDATE()), DATEADD(DAY, 11, GETUTCDATE()), 'City Hall', '123 Main St, Cityville', 1000, 1000, 'Upcoming', GETUTCDATE(), 1, 'http://movie0706.cybersoft.edu.vn/hinhanh/minions-the-rise-of-gru_gp06.jpg'),
    ( 'LIGHTYEAR', 'Bộ phim kể về chuyến hành trình hành động kết hợp khoa học viễn tưởng nhằm giới thiệu câu chuyện về nguồn gốc của nhân vật Buzz Lightyear — người anh hùng đã truyền cảm hứng sáng tạo ra Toy Story. “Lightyear” sẽ theo chân Cảnh Sát Vũ Trụ huyền thoại trong cuộc hành trình bước ra ngoài không gian cùng với một nhóm chiến binh đầy tham vọng và người bạn đồng hành là chú mèo máy Sox.', 'Tech Leaders', 'Conference', DATEADD(DAY, 20, GETUTCDATE()), DATEADD(DAY, 22, GETUTCDATE()), 'Tech Center', '456 Tech Ave, Tech City', 500, 500, 'Upcoming', GETUTCDATE(), 2, 'http://movie0706.cybersoft.edu.vn/hinhanh/lightyear_gp06.jpg'),
    ( 'THANH SÓI - CÚC DẠI TRONG ĐÊM', 'Lấy bối cảnh Sài Gòn 1998, phim là tiền truyện của Hai Phượng kể về hành trình “hắc hóa” của nữ giang hồ Thanh Sói. Phim mới Thanh Sói - Cúc Dại Trong Đêm ra mắt tại các rạp chiếu phim từ 22.04.2022.', 'Various Artists', 'Music', DATEADD(DAY, 10, GETUTCDATE()), DATEADD(DAY, 11, GETUTCDATE()), 'City Hall', '123 Main St, Cityville', 1000, 1000, 'Upcoming', GETUTCDATE(), 1, 'http://movie0706.cybersoft.edu.vn/hinhanh/thanh-soi-cuc-dai-trong-dem_gp06.jpg'),
    ( 'CHUYẾN PHIÊU LƯU CỦA PIL', 'Ngày xửa ngày xưa, có một cô bé mồ côi phải trở thành nàng công chúa bất đắc dĩ không giống ai. Một ngày nọ, hoàng tử bị một tên quan độc ác đầu độc và khiến Pil cùng những người bạn phải đứng lên bảo vệ mình và cả vương quốc.', 'Tech Leaders', 'Conference', DATEADD(DAY, 20, GETUTCDATE()), DATEADD(DAY, 22, GETUTCDATE()), 'Tech Center', '456 Tech Ave, Tech City', 500, 500, 'Upcoming', GETUTCDATE(), 2, 'http://movie0706.cybersoft.edu.vn/hinhanh/chuyen-phieu-luu-cua-pil_gp06.jpg');
