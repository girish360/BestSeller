
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
    `shipping` varchar(250),
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



create table product(

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

 ('Electronic','tractor.png'),
 ('Fashion','tractor.png'),
 ('Agricultural Machinery','tractor.png'),
 ('Vehicles','tractor.png'),
 ('Sporting','tractor.png');


insert into sub_category(name,image,category_id)values

  ('Computers','tractor.png','1'),
  ('Smartphone','tractor.png','1'),
  ('Tv','tractor.png','1'),

  ('Shoes','tractor.png','2'),
  ('Watches','tractor.png','2'),

  ('Tractors','tractor.png','3'),
  ('Combines','tractor.png','3'),

  ('Trucks','tractor.png','4'),
  ('Buses','tractor.png','4'),
  ('Vehicle','tractor.png','4'),

  ('Golf','tractor.png','5'),
  ('Balls','tractor.png','5');


insert into product ( title , description , image_id , category_id , company_id , price , unit_stock , image )
values
('Laptop Hp Probvook 6560b','Gjendje perfekte  memory 500 Gb ram 8 Gb ','1','1','1','500','9' ,'pc.jpg'),
('Samsung s7 Edge 5 ','S7 edge shitet per arsye mos perdorimi , eshte ne gjendje perferkte pothuajse i ri me kamere para dhe mbarap Rami 8GB memory 32gb ','2','2','1','500','2','s7.jpg'),
('Lg smart Tv WebOs','I ri me internet me lan dhe wifi me nje alarmi programesh te ndryshme per perdoruesin  ','3','3','1','900','5' ,'tv.jpg'),

('Runing Shoes',' te reja ','4','4','2','50','15' ,'sho.jpg'),
('Watch',' E re nje vit garanci amerikone','5','5','2','420','1' ,'wa.jpg'),

('Tractor John Deere Us',' e sa po ardhur nga USA','6','6','3','42220','1' ,'tra.jpg'),
('Class 68 dominator ',' Germany combina 68s','7','7','3','25220','1' ,'co.jpg'),

('Truck Man',' Germany Man year 2015','8','8','4','52220','1' ,'tru.jpg'),
('Bus Man 2015 ',' Germany Bus ','9','9','4','62220','1' ,'bus.jpg'),
('Benz mercedez','shitet per arsye mos perdorimi 4x4 viti prodhimit 2011 letrat e preme per 1 vit','10','10','4','50000','5' ,'benz.jpg'),

('Golf Ball ',' Amazing Ball','11','11','5','150','5' ,'go.jpg'),
('Ball ',' Ball ','12','12','5','120','5' ,'ba.jpg');




insert into image_product (product_id , image)
 values
  ('1','pc.jpg'),('1','pc1.jpg'),('1','pc2.jpg'),('1','pc3.jpg'),('1','pc4.jpg'),('1','pc5.jpg'),('1','pc6.jpg'),('1','pc7.jpg'),('1','pc8.jpg'),('1','pc9.jpg'),

  ('2','s7.jpg'),('2','s71.jpg'),('2','s72.jpg'),('2','s73.jpg'),('2','s74.jpg'),

  ('3','tv.jpg'),('3','tv1.jpg'),('3','tv2.jpg'),('3','tv3.jpg'),('3','tv4.jpg'),

  ('4','sho.jpg'),('4','sho1.jpg'),('4','sho2.jpg'),

  ('5','wa.jpg'),('5','wa1.jpg'),('5','wa2.jpg'),('5','wa3.jpg'),('5','wa4.jpg'),

  ('6','tra.jpg'),('6','tra1.jpg'),('6','tra2.jpg'),

  ('7','co.jpg'),('7','co1.jpg'),('7','co2.jpg'),('7','co3.jpg'),('7','co4.jpg'),

  ('8','tru.jpg'),('8','tru1.jpg'),('8','tru2.jpg'),

  ('9','bus.jpg'),('9','bus1.jpg'),('9','bus2.jpg'),

  ('10','benz.jpg'),('10','benz1.jpg'),('10','benz2.jpg'),('10','benz3.jpg'),('10','ben4.jpg'),

  ('11','go.jpg'),('11','go1.jpg'),('11','go2.jpg'),

  ('12','ba.jpg'),('12','ba1.jpg');




insert into company (name,email,username,password,phone_number,image,street_adress,city,state,language,shipping)values
  ('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian','World'),
  ('Fashion','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian','Albania'),
    ('Agricultural Machinery','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian','Albania'),
  ('Vehicles','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian','Albania'),
  ('Sporting','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian','Albania');



insert into follower (company_id,user_id)values('4','1'),('5','1'),('6','1');


insert into user ( first_name,last_name,username,email,gener,local,picture,phone,language)
values('klodian','shaba','kshaba','klodian.tik@gmail.com','male','alabnia','klo.jpg','0683834233','albanian'),
('Arjola','Shabani','Ashabani','Arjola.tik@gmail.com','female','Italy','b3.jpg','0683834235','Italy')

