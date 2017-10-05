

#administrators or account for Company.............

create table adminat (
  `id` int NOT NULL primary key AUTO_INCREMENT,
  `name_company` varchar(50),
    `emai` varchar(150),
    `username` varchar(50),
    `password` varchar(50),
    `date`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `activ_pasiv` int NOT NULL DEFAULT 0,
    `phone_number` int(15),
    `id_image_slide` int(11),
    `type` varchar(10),
    `confirm_account` int(11),
    `imageprofile` varchar(250),
    `type_indusrty` varchar(70),
    `street_adress` varchar(70),
    `city` varchar(50),
    `state` varchar(50),
    `language` varchar(50)

);


#table for users...............

create table users(

`id` int primary key not null AUTO_INCREMENT,
`oauth_provider` varchar(50),
`oauth_uid` varchar(100),
`first_name` varchar(50),
`last_name` varchar(50),
`email`  varchar(100),
`gener` varchar(5),
`local` varchar(10),
`picture` varchar(255),
`link` varchar(255),
`created` datetime not null,
`modified` datetime not null,
`phone`  int(15),
`password` varchar(50),
`confirm_account` int(11),
`activ_pasiv` int not null DEFAULT 0,
`language` varchar(50)

);

#table for image slide_show for profile company 

create table image_slide_company(
     `id` int not null primary key AUTO_INCREMENT,
     `id_admin` int(11),
     `image` varchar(255)
);

#table for Category_Company 

create table Category_Company(
   `id` int not null primary key AUTO_INCREMENT,
   `name_category` varchar(100),
   `id_admin` int(11)
);
create table allcategory_item(
   `id` int not null primary key AUTO_INCREMENT,
   `name_category` varchar(100),
   `id_categorytype` int(11),
   `language` varchar(50),
   `image` varchar(250)
);

create table categorytype(
   `id` int not null primary key AUTO_INCREMENT,
   `name_category` varchar(100),
   `language` varchar(50),
   `image` varchar(250)

);

#table for products........

create table products(

  `id` int not null primary key AUTO_INCREMENT,
  `title` varchar(100),
  `description` varchar(255),
  `id_image` int(11),
  `id_category` int(11),
  `id_admin` int(11),
  `price` varchar(50),
  `quantity` int(11),
  `date`  TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP
);

#table comment like see for product 

create table comment_products(
  `id` int not null primary key AUTO_INCREMENT,
  `id_product` int(11),
  `comment` varchar(2000),
  `like` int(11),
  `see` int(11)
);

#table for image_products...

create table image_products(

  `id` int not null primary key AUTO_INCREMENT, 
  `id_product` int(11), 
  `image` varchar(255),
  `type_image` int(1)
);

#table for order .........

create table orders(
   `id` int not null primary key AUTO_INCREMENT,
   `id_admin` int(11),
   `id_user` int(11),
   `product_id` int(11)
   
);

# table for orderdetails......

create table orderdetails(
   `id` int not null primary key AUTO_INCREMENT,
   `id_order` int(11),
   `id_product` int(11),
   `price` varchar(50),
   `quantity` int(11),
   `discount` varchar(50),
   `totali` varchar(50),
   `date`  TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP
);

#table for sponsorised......

create table sponsorised(
  `id` int not null primary key AUTO_INCREMENT, 
  `id_product` int(11), 
  `id_admin` int(11)
  
);

#table for subscribe ......

create table followers(
`id` int not null primary key AUTO_INCREMENT, 
`id_admin` int(11), 
`id_user` int(11) 
);

#table for chat ........

create table chat(
 `id` int not null primary key AUTO_INCREMENT, 
 `id_user` int(11), 
 `id_admin` int(11), 
 `description` varchar(500), 
 `date` TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP 
 );


# insert categorytype add  default category here 

insert into categorytype(name_category,language)
values('Automjete','albanian'),
('vehicles','english'),
('Electronic','english'),
('Elektronike','albania'),
('Books','english'),
('Libra','albania'),
('Apartamente','albania'),
('Flats','english'),
('Makineri Bujqesore','albania'),
('Agricultural Machinery','english'),
('Programe','albania'),
('programs','english');


insert into allcategory_item(name_category,language,id_categorytype)
values('Vetura','albanian','1'),
('Fugona','albanian','1'),
('Kamiona','albanian','1'),
('Motoçiklet','albanian','1'),
('Biçikleta','albanian','1'),
('Vehicles','english','2'),
('Fugona','english','2'),
('Trucks','english','2'),
('Motorbike','english','2'),
('biycles','english','2');


insert into adminat (name_company,emai,username,password,phone_number,imageprofile,street_adress,city,state,language)values
('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
('New Phone here','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian'),
('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
('New Car and old Car','ele@gmail.com','newklodian','klodian12','0683834233','car.png','jordan misja','tirane','albanian','albanian'),
('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
('New Phone here','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian'),
('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
('New Phone here','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian');


insert into followers (id_admin,id_user)
values('4','1'),('5','1'),('6','1');

insert into products (title,description,id_image,id_category,id_admin,price,quantity)values
('Iphone s1','this iphone ins new version 8.5522 ','1','1','1','800','5'),
('Iphone s2','this iphone ins new version 8.5522 ','2','3','1','800','5'),
('Iphone s3','this iphone ins new version 8.5522 ','3','2','1','800','5'),
('Iphone s4','this iphone ins new version 8.5522 ','4','1','1','800','5'),
('Iphone s5','this iphone ins new version 8.5522 ','5','5','1','800','5'),
('Iphone s6','this iphone ins new version 8.5522 ','6','6','1','800','5'),
('Iphone s7','this iphone ins new version 8.5522 ','7','6','1','800','5'),
('Iphone s8','this iphone ins new version 8.5522 ','8','6','1','800','5'),
('Iphone s9','this iphone ins new version 8.5522 ','9','2','1','800','5'),
('Iphone s10','this iphone ins new version 8.5522 ','10','1','1','800','5'),
('Iphone s11','this iphone ins new version 8.5522 ','11','1','1','800','5'),
('Iphone s12','this iphone ins new version 8.5522 ','12','2','1','800','5'),
('Iphone s13','this iphone ins new version 8.5522 ','13','2','1','800','5'),
('Iphone s14','this iphone ins new version 8.5522 ','14','2','1','800','5');

insert into image_products(id_product,image,type_image)
values
('1','p3.png','1'),
('1','p2.jpg','2'),
('2','b2.jpg','1'),
('2','b3.jpg','2'),
('3','123.jpg','1'),
('3','b1.jpg','2'),
('4','bm1.jpg','1'),
('4','bm2.jpg','2'),
('5','p2.jpg','1'),
('5','p1.jpg','2'),
('6','p3.png','1'),
('6','p2.jpg','2'),
('7','p3.png','1'),
('7','p2.jpg','2'),
('8','p3.png','1'),
('8','p2.jpg','2'),
('9','p3.png','1'),
('9','p2.jpg','2'),
('10','p3.png','1'),
('10','p2.jpg','2'),
('11','p3.png','1'),
('11','p2.jpg','2'),
('12','p3.png','1'),
('12','p2.jpg','2'),
('13','p3.png','1'),
('13','p2.jpg','2'),
('14','p3.png','1'),
('14','p2.jpg','2');

