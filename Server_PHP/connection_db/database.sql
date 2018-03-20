
CREATE DATABASE IF NOT EXISTS world_sell;

create table company (

    `id` int NOT NULL primary key AUTO_INCREMENT,
    `name` varchar(50),
    `email` varchar(150),
    `username` varchar(50),
    `password` varchar(50),
    `date`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `activ_pasiv` int NOT NULL DEFAULT 0,
    `phone_number` int(15),
    `image_slide_id` int(11),
    `type` varchar(10),
    `confirm_account` int(11),
    `image` varchar(250),
    `type_indusrty` varchar(70),
    `street_adress` varchar(70),
    `city` varchar(50),
    `state` varchar(50),
    `language` varchar(50)

);




create table user(

`id` int primary key not null AUTO_INCREMENT,
`oauth_provider` varchar(50),
`oauth_uid` varchar(100),
`first_name` varchar(50),
`last_name` varchar(50),
`email`  varchar(100),
`username`  varchar(100),
`gener` varchar(5),
`local` varchar(10),
`picture` varchar(255),
`link` varchar(255),
`created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`modified` datetime not null,
`phone`  int(15),
`password` varchar(50),
`confirm_account` int(11),
`activ_pasiv` int not null DEFAULT 0,
`language` varchar(50)

);



create table image_slide_company(
     `id` int not null primary key AUTO_INCREMENT,
     `company_id` int(11),
     `image` varchar(255)
);



create table category_company(
   `id` int not null primary key AUTO_INCREMENT,
   `name` varchar(100),
   `company_id` int(11)
);
create table sub_category(
   `id` int not null primary key AUTO_INCREMENT,
   `name` varchar(100),
   `category_id` int(11),
   `image` varchar(250)
);

create table category(
   `id` int not null primary key AUTO_INCREMENT,
   `name` varchar(100),
   `image` varchar(250)

);



create table producte(

  `id` int not null primary key AUTO_INCREMENT,
  `title` varchar(100),
  `description` varchar(255),
  `image_id` int(11),
  `category_id` int(11),
  `company_id` int(11),
  `price` varchar(50),
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_stock` int(11),
  `in_wishList` ENUM('false', 'true') NOT NULL DEFAULT 'false',
  `in_cartList` ENUM('false', 'true') NOT NULL DEFAULT 'false',
  `date`  TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP ,
  `image` varchar(250)

);



create table coment_product(
  `id` int not null primary key AUTO_INCREMENT,
  `product_id` int(11),
  `coment` varchar(2000),
  `like` int(11),
  `see` int(11)
);



create table image_product(

  `id` int not null primary key AUTO_INCREMENT, 
  `product_id` int(11),
  `image` varchar(255)

);



create table orders(
   `id` int not null primary key AUTO_INCREMENT,
   `company_id` int(11),
   `user_id` int(11),
   `product_id` int(11)
   
);



create table order_detail(
   `id` int not null primary key AUTO_INCREMENT,
   `order_id` int(11),
   `product_id` int(11),
   `price` varchar(50),
   `quantity` int(11),
   `discount` varchar(50),
   `totali` varchar(50),
   `date`  TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP
);


create table sponsor(
  `id` int not null primary key AUTO_INCREMENT, 
  `product_id` int(11),
  `company_id` int(11)
  
);



create table follower(
`id` int not null primary key AUTO_INCREMENT, 
`company_id` int(11),
`user_id` int(11)
);



create table chat(
 `id` int not null primary key AUTO_INCREMENT, 
 `user_id` int(11),
 `company_id` int(11),
 `description` varchar(500), 
 `date` TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP 
 );




insert into category( name,image )values
                      ('vehicles','tractor.png'),
                      ('Electronic','tractor.png'),

                       ('Books','tractor.png'),


                      ('Flats','tractor.png'),

                      ('Agricultural Machinery','tractor.png'),

                      ('programs','tractor.png');



insert into sub_category(name,image,category_id)values('Vetura','tractor.png','1'),
                                                                          ('Fugona','tractor.png','1'),
                                                                          ('Kamiona','tractor.png','2'),
                                                                          ('Motociklet','tractor.png','2'),
                                                                          ('Bicikleta','tractor.png','3'),
                                                                          ('Vehicles','tractor.png','3'),
                                                                          ('Fugona','tractor.png','4'),
                                                                          ('Trucks','tractor.png','4'),
                                                                          ('Motorbike','tractor.png','5'),
                                                                          ('biycles','tractor.png','5'),
                                                                          ('Motorbike','tractor.png','6'),
                                                                          ('biycles','tractor.png','6');


insert into company (name,email,username,password,phone_number,image,street_adress,city,state,language)values
  ('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
  ('New Phone here','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian'),
    ('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
  ('New Car and old Car','ele@gmail.com','newklodian','klodian12','0683834233','car.png','jordan misja','tirane','albanian','albanian'),
    ('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
  ('New Phone here','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian'),
    ('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
  ('New Phone here','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian');


insert into follower (company_id,user_id)values('4','1'),('5','1'),('6','1');

insert into product ( title , description , image_id , category_id , company_id , price , unit_stock , image )
values('benz mercedez','shitet per arsye mos perdorimi','1','1','1','500','5' ,'1.jpg'),
      ('Iphone 5 ','gjendje perfecte','2','1','1','400','2','2.jpg'),
      ('Iphone 6 ','gjendje perfecte','3','1','1','550','7','3.jpg'),
      ('Iphone 8 ','gjendje perfecte','4','2','1','400','2','4.jpg'),
      ('Iphone 9 ','gjendje perfecte','5','2','1','200','2','5.jpg'),
      ('Iphone 10 ','gjendje perfecte','6','2','1','800','10','2.jpg'),
      ('Iphone 11 ','gjendje perfecte','7','3','1','1000','2','3.jpg'),
      ('Iphone 12 ','gjendje perfecte','8','3','1','400','2','1.jpg'),
      ('Iphone 13 ','gjendje perfecte','9','3','1','400','2','5.jpg');

insert into user ( first_name,last_name,username,email,gener,local,picture,phone,language)
values('klodian','shaba','kshaba','klodian.tik@gmail.com','male','alabnia','klo.jpg','0683834233','albanian'),
('Arjola','Shabani','Ashabani','Arjola.tik@gmail.com','female','Italy','b3.jpg','0683834235','Italy')

