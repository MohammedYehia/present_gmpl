BEGIN;
DROP TABLE IF EXISTS rooms, events_courses, staff, users, user_courses, bookings, ext_booking, rooms_images CASCADE;

CREATE TABLE "rooms" (
	"id" serial PRIMARY KEY ,
	"room_name" varchar NOT NULL UNIQUE,
	"capacity" integer NOT NULL,
	"lcd" BOOLEAN NOT NULL
) ;


CREATE TABLE "events_courses" (
	"id" serial PRIMARY KEY,
	"title" varchar NOT NULL,
	"description" TEXT NOT NULL,
	"fees" integer
);



CREATE TABLE "staff" (
	"id" serial PRIMARY KEY ,
	"username" varchar NOT NULL UNIQUE,
	"role" varchar NOT NULL,
	"password" varchar NOT NULL
);



CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"phone" varchar NOT NULL UNIQUE,
	"email" varchar NOT NULL UNIQUE
);



CREATE TABLE "user_courses" (
	"user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	"course_id" int NOT NULL REFERENCES events_courses(id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY,
	"event_id" int REFERENCES events_courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
	"start" TIMESTAMP NOT NULL,
	"end" TIMESTAMP NOT NULL,
	"room_id" int NOT NULL REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE "ext_booking" (
	"id" serial PRIMARY KEY,
	"user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
	"booking_id" int NOT NULL REFERENCES bookings(id) ON DELETE CASCADE ON UPDATE CASCADE,
  "event_title" varchar NOT NULL
);
CREATE TABLE "rooms_images" (
	"id" serial PRIMARY KEY,
	"img_url" varchar NOT NULL,
	"room_id" int NOT NULL REFERENCES rooms(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO rooms (room_name, capacity, lcd) values
('قاعة تورينو', 20, true),
('قاعة المركز الثقافي التركي', 25, true),
('قاعة الانشطة', 30, true)
;

INSERT INTO events_courses (title, description, fees) values

('دورة اللغة التركية', 'تعلن مكتبة بلدية غزة العامة عن عقد دورة في اللغة التركية بالتعاون مع الحكومة التركية ومن خلال توفير مدرس تركي بالمكتبة واللتي ستتناول اساسيات اللغة التركية (كتابة، محادثة ،قراءة)' , 25),
('دورة اللغة الانجليزية', 'تعلن مكتبة بلدية غزة العامة عن عقد دورة في اللغة الانجليزية بالتعاون مع الحكومة البريطانية ومن خلال توفير مدرس بريطاني بالمكتبة واللتي ستتناول اساسيات اللغة الانجليزية (كتابة، محادثة ،قراءة' , 20),
('ندوة شعرية بعنوان الارض والشهداء','تعلن مكتبة بلدية غزة العامة عن عقد ندوة شعرية بعنوان الارض والشهداء والتي سيلقيها الاستاذ الشاعر / محمود حسن احمد',NULL),
('لقاء ثقافي بعنوان القراءة والحاضر','تعلن مكتبة بلدية غزة العامة عن عقد لقاء ثقافي  بعنوان القراءة والحاضر والتي ينظمها مركز هوليست الثقافي بالتعاون مع مكتبة بلدية غزة العامة حيث سيحضر اللقاء وزير الثقافة الاستاذ/محمد الحيلة',NULL)
;

INSERT INTO staff (username, role, password) values
('hassan', 'admin', '$2b$08$qQsXiDB5tLjGzYlXiNo7IeDdQAlbRAPs0EsbJvu28c/p5wqbbnaLa')
;
INSERT INTO users (name, phone, email) values
('ramy', '0599447989', 'ramy@hotmail.com'),
('ahmed', '05999955551', 'ahmed@hotmail.com'),
('mohammed', '05999955552', 'mohammed@hotmail.com'),
('abdelsamad', '05999955553', 'abdelsamad@hotmail.com')
;
INSERT INTO user_courses (user_id,course_id) values
(1,1),
(2,1),
(3,1),
(4,2),
(1,2)

;
INSERT INTO bookings (event_id,start,"end",room_id) values
(3, '2018-06-25 12:30:00', '2018-06-25 14:30:00',3),
(4, '2018-06-28 16:00:00', '2018-06-28 18:30:00',2),
(1, '2018-06-24 09:00:00', '2018-06-24 11:30:00',1),
(NULL, '2018-06-26 10:00:00', '2018-06-26 12:30:00',1),
(NULL, '2018-06-22 10:00:00', '2018-06-22 12:30:00',2),
(NULL, '2018-06-23 12:00:00', '2018-06-23 14:30:00',3)
;
INSERT INTO ext_booking (user_id,booking_id,event_title) values
(1,4,'امسية شعرية'),
(3,2,'لقاء ثقافي'),
(2,6,'ندوة سياسية')
;
COMMIT;
