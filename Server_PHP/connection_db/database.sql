
CREATE DATABASE IF NOT EXISTS world_sell;

create table adminat (

  `id` int NOT NULL primary key AUTO_INCREMENT,
  `name_company` varchar(50),
    `email` varchar(150),
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




create table users(

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
     `id_admin` int(11),
     `image` varchar(255)
);



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



create table comment_products(
  `id` int not null primary key AUTO_INCREMENT,
  `id_product` int(11),
  `comment` varchar(2000),
  `like` int(11),
  `see` int(11)
);



create table image_products(

  `id` int not null primary key AUTO_INCREMENT, 
  `id_product` int(11), 
  `image` varchar(255)
);



create table orders(
   `id` int not null primary key AUTO_INCREMENT,
   `id_admin` int(11),
   `id_user` int(11),
   `product_id` int(11)
   
);



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


create table sponsorised(
  `id` int not null primary key AUTO_INCREMENT, 
  `id_product` int(11), 
  `id_admin` int(11)
  
);



create table followers(
`id` int not null primary key AUTO_INCREMENT, 
`id_admin` int(11), 
`id_user` int(11) 
);



create table chat(
 `id` int not null primary key AUTO_INCREMENT, 
 `id_user` int(11), 
 `id_admin` int(11), 
 `description` varchar(500), 
 `date` TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP 
 );




insert into categorytype(name_category,language)values('Automjete','albanian'),
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
                                                      ('programs','english')



insert into allcategory_item(name_category,language,id_categorytype)values('Vetura','albanian','1'),
                                                                          ('Fugona','albanian','1'),
                                                                          ('Kamiona','albanian','1'),
                                                                          ('Motociklet','albanian','1'),
                                                                          ('Bicikleta','albanian','1'),
                                                                          ('Vehicles','english','2'),
                                                                          ('Fugona','english','2'),
                                                                          ('Trucks','english','2'),
                                                                          ('Motorbike','english','2'),
                                                                          ('biycles','english','2')


insert into adminat (name_company,emai,username,password,phone_number,imageprofile,street_adress,city,state,language)values
  ('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
  ('New Phone here','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian'),
    ('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
  ('New Car and old Car','ele@gmail.com','newklodian','klodian12','0683834233','car.png','jordan misja','tirane','albanian','albanian'),
    ('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
  ('New Phone here','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian'),
    ('Elektronics','ele@gmail.com','eleklodian','klodian12','0683834233','klo.jpg','jordan misja','tirane','albanian','albanian'),
  ('New Phone here','ele@gmail.com','newklodian','klodian12','0683834233','1234.jpg','jordan misja','tirane','albanian','albanian')


insert into followers (id_admin,id_user)values('4','1'),('5','1'),('6','1')

insert into products ( title , description , id_image , id_category , id_admin , price , quantity , image )
values('benz mercedez','shitet per arsye mos perdorimi','1','1','1','500','5' ,'1234.jpg'),
      ('Iphone 5 ','gjendje perfecte','2','1','1','400','2','b3.jpg'),
      ('Iphone 6 ','gjendje perfecte','3','1','1','550','7','under_login.jpg'),
      ('Iphone 8 ','gjendje perfecte','4','2','1','400','2','klo.jpg'),
      ('Iphone 9 ','gjendje perfecte','5','2','1','200','2','b3.jpg'),
      ('Iphone 10 ','gjendje perfecte','6','2','1','800','10','klo.jpg'),
      ('Iphone 11 ','gjendje perfecte','7','3','1','1000','2','1234.jpg'),
      ('Iphone 12 ','gjendje perfecte','8','3','1','400','2','klo.jpg'),
      ('Iphone 13 ','gjendje perfecte','9','3','1','400','2','1234.jpg')

insert into users ( first_name,last_name,username,email,gener,local,picture,phone,language)
values('klodian','shaba','kshaba','klodian.tik@gmail.com','male','alabnia','klo.jpg','0683834233','albanian'),
('Arjola','Shabani','Ashabani','Arjola.tik@gmail.com','female','Italy','b3.jpg','0683834235','Italy')

