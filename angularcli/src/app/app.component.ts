import { Component,OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app';

 ngOnInit(){


   $(document).ready(function(){
     var errsingin=0;
     var errsingup=0;
     var acc=0;
     var nrr=0;	// tabet sing in and sing up
     var activ='1';
     var clickinpu=0;
     var errorsingin=1;
     var arr=[];
     var arry=[];

     var nrconfirm=0;
     showlogin();

     $('#radiotypelogin1').attr('checked',true);
     $('#radiologintype1').css("border-color","#00BFFF");
     $('#radiologintype1').css("background-color","#E6E6FA");

     $('.radioforgett1').attr('checked',true);


     $('.tabs').click(function(){  // click tabs from sign up ang sign in . . . .. . . .. . .. . . .. . .. .. . . ..
       var t=0;
       zerovariablat();
       $('.valemail').remove();
       $('.error').css("display","none");
       $('.tabs').css("color"," #663399");
       $(this).css("color","black");
       var id = $(this).attr('id');
       if(activ==id){ // check if double click a tab................................................................
       }
       else{
         activ=id;
         if(id==1){
           $('.sing2').slideUp();
           $('.sing1').slideDown();
         }
         else{
           nrr++;
           if(nrr==="1"){
             $('#rad2').prop('checked',false);
             $('#rad1').prop('checked',true);
             $('#radio1').css("border-color","#00BFFF");
             $('#radio1').css("background-color","#E6E6FA");
           }
           $('.sing1').slideUp();
           $('.sing2').slideDown();
         }
       }
     });
     // end tabs click button here ...........................................................................................

     // start sign in   check email when click buton , when write in input keyup , when  click in input onblur..................

     $('.input').keyup(function(){ // check email on keyup .... .. .. .... .. .. . . ..  .. .. ..  ..........................
       var val =$(this).val();
       if(IsEmail(val)==true){
         $('.valemail').remove();
         $('.error').slideUp();
         zerovariablat();
       } else{
         $('.valemail').remove();
         zerovariablat();
         var div=1;
         showdiverror(div);
         $('.error').css("background-color"," #FFB6C1");
       }
       if(val==0){


         $(this).css('border-color','#A52A2A');

       }
       else{
         $(this).css('border-color','#00BFFF');
       }
     });
     // check email on blur ..................................................................................................
     $('.input').on("blur",function(){
       var value=$(this).val();
       if(value==''){
         $(this).css('border-color','#A52A2A');
         $(this).css('border-color','#A52A2A');
       }
     });
     // click button  for take email  valid and send email in server with ajax chehck if exsits ............................
     $('.inputsubmit').click(function(){
       $(this).css({
         background: 'url("images/load.gif") no-repeat center '
       });
       $(this).css('background-color',"#1E90FF");
       $(this).css('opacity',"0.7");
       $(this).val("");
       checkemail();  // call function for click button ....................................................................


     });
     function checkemail(){
       clickinpu++;
       var val = $('#us').val();
       var radiotypelogin=0;
       var nreach=0;
       $('.radiotypelogin').each(function(){
         nreach++;
         if($(this).is(':checked',true)){
           radiotypelogin=nreach;
         }
       });
       if(radiotypelogin=='1'){//check if is client login
         if(IsEmail(val)==false){  // check if email is invalid........................................................
           $('#us').css('border-color','#A52A2A');
           if(clickinpu=="1" ){
             showdiverror(errorsingin);
             clickinpu++;
           }

           setTimeout(function(){
             var each=0;
             var currectly=0;
             var value=0;
             $('.radiotypelogin').each(function(){
               each++;
               if($(this).is(":checked",true)){
                 currectly=each;
               }
             });
             if(currectly=='1'){
               value='Next Client';
             }
             else{
               value='Next Business';
             }
             $('.inputsubmit').val(value);
             $('.inputsubmit').css({
               background: 'url("") no-repeat center '
             });
             $('.inputsubmit').css('background-color',"#1E90FF");
             $('.inputsubmit').css('opacity',"1");


           },1000);
           return false;
         }
         else{  /// send email in server ..............................................................................
           zerovariablat();
           $.ajax({
             type:'GET',
             url: 'classlogin.php',
             data: 'email='+val,

             success:function(data){
               var each=0;
               var currectly=0;
               var value=0;
               $('.radiotypelogin').each(function(){
                 each++;
                 if($(this).is(":checked",true)){
                   currectly=each;
                 }
               });
               if(currectly=='1'){
                 value='Next Client';
               }
               else{
                 value='Next Business';
               }
               $('.inputsubmit').val(value);
               $('.inputsubmit').css({
                 background: 'url("") no-repeat center '
               });
               $('.inputsubmit').css('background-color',"#1E90FF");
               $('.inputsubmit').css('opacity',"1");
               if(data==1){


                 $('.loading').css("visibility","visible");
                 $('.loading').css("background-color","#A52A2A");
                 $('.loading').animate({
                   width:'100%'
                 },'slow',function(){
                   $('.loading').css("visibility","hidden");
                   $('.loading').css("width","5px");
                   $('#us').css('border-color','   #A52A2A');
                   $('.valemail').remove();
                   $('.error').css("background-color"," #A52A2A");
                   vlera='nukkaemail';
                   showdiverror(vlera);
                 });




               }
               else{

                 $('.loading').css("visibility","visible");
                 $('.loading').css("background-color","#00BFFF");
                 $('.loading').animate({
                   width:'100%'
                 },'slow',function(){
                   $('.lgtb').hide();
                   $('.btnlgtb').show();

                   $('.loading').css("visibility","hidden");
                   $('.loading').css("width","5px");
                   var result = $.parseJSON(data); // get data json ..............................................................................

                   $('.name').html('');
                   $('.last').html('');
                   $('.em').html('');
                   $('.emm').html('');
                   $('.emmm').html('');
                   $('.phone').html('');
                   $('.name').append(result['emri']);
                   $('.last').append(result['mbiemri']);
                   $('.em').append(result['email']);
                   $('.emm').append(result['email']);
                   $('.emmm').append(result['email']);
                   $('.phone').append(result['phone']);
                   $('.closelogin').slideUp();
                   $('.error').slideUp();
                   $('.next').slideDown(function(){
                     $('.imguser').hide();
                     $('.writetypelogin').hide();
                     $('.logo1').append('<img class="imguse" src="'+result['foto']+'"/>');
                     $('.imguse').css("width","0px");
                     $('.imguse').animate({
                       width:'100%'
                     });
                   });
                 });

               }
             }

           });
         }
       }
       else{ // here is login for business...............
         var vale='isnotready';
         showdiverror(vale);
         $('#us').css('border-color','#A52A2A');
       }
     }
     // click button from back  to sing in................................................................................................................
     $('.back').click(function(){
       zerovariablat();
       $('.lgtb').show();
       $('.btnlgtb').hide();
       $('.imguse').remove();
       $('.imguser').show();
       $('.writetypelogin').show();
       $('.valpass').css('border-color','');
       $('.valemail').remove();
       $('.error').slideUp();
       $('.next').slideUp();
       $('.closelogin').slideDown();
     });
     //end back to sing in................................................................................................................................

     //end sing in........................................................................................................................................

     // click button for sing up start......................................................................................................................................
     $('.inputsubmit2').click(function(){
       var nreach=0;
       var nrbosh=0;
       var vlera='';
       var nrbo=0;
       var vleraok=0;
       var nraccount=0;
       var nracceach=0;
       var valtype=$(this).attr('id');

       $(this).css({
         background: 'url("images/load.gif") no-repeat center '
       });
       $(this).css('background-color',"#1E90FF");
       $(this).css('opacity',"0.7");
       $(this).val("");

       setTimeout(function(){
         var each=0;
         var currectly=0;
         var value=0;
         $('.radio').each(function(){
           each++;
           if($(this).is(":checked",true)){
             currectly=each;
           }
         });
         if(currectly=='1'){
           value='Register Client';
         }
         else{
           value='Next Business Create';
         }
         $('.inputsubmit2').val(value);
         $('.inputsubmit2').css({
           background: 'url("") no-repeat center '
         });
         $('.inputsubmit2').css('background-color',"#1E90FF");
         $('.inputsubmit2').css('opacity',"1");
         registeruser(valtype);  // call function for click button ....................................................................
       },1000);
       function registeruser(valtype){
         $('.radio').each(function(){
           nracceach++;
           if($(this).is(":checked")==true){
             nraccount=nracceach;
           }
         });
         $('.input2').each(function(){
           nreach++;
           var value=$(this).val();
           if(value=='' && nreach==1){  // check  first input ..........................
             nrbosh++;
             vlera='emri';
             $('.valemail').remove();
             showdiverror(vlera);
             $(this).css('border-color','none');
             $(this).css('border-color','#A52A2A');
           }
           if(nreach==2){   // check second  input .......................................
             if(IsEmail(value)==false){
               if(nrbosh==1){
               }
               else{
                 nrbosh++;
                 vlera='email';
                 $('.valemail').remove();
                 showdiverror(vlera);
                 $(this).css('border-color','none');
                 $(this).css('border-color','#A52A2A');
               }
             }
           }
           if(nreach==3 && value.length<6){  // check third input ..........................
             if(nrbosh==0){
               nrbosh++;
               $('.valemail').remove();
               vlera='fjalkalimi';
               showdiverror(vlera);
               $(this).css('border-color','none');
               $(this).css('border-color','#A52A2A');
             }
           }
           if(value==''){ // find  total input is  empty input .................................
             nrbo++;
           }
         });
         if(nrbosh==0){ // check if inputs are 0 send data in server  ...............................................

           var nr=0;
           if(nraccount==1){ // check  if is Client Account is checked in radio button for sign up/..............................
             $('.input2').each(function(){  // each get data from form................................................
               var val=$(this).val();
               arr[nr]=val;  // create array.........
               nr++;
             });
             arr[3]='icon-user.png';
             $.ajax({  // send sata with ajax .................
               type:'GET',
               url:'classlogin.php',
               data:{arraydatauser : arr},
               success:function(data){
                 if(data=='false'){ // if is not register in database , if email exists in database  ................
                   var nrinput=0;
                   $('.input2').each(function(){  // error in inputs number 2 "email"............
                     nrinput++;
                     if(nrinput==2){ // check inputs......................
                       $('.loading').css("background-color","#A52A2A");
                       $('.loading').css("visibility","visible");
                       $('.loading').animate({  // show loading ..........................
                         width:'100%'
                       },"slow",function(){
                         $('.loading').css("visibility","hidden");
                         $('.loading').css("width","5px");
                         $(this).css('border-color','#A52A2A');  // show border error ...............
                         $('.valemail').remove();
                         $('.error').css("background-color"," #A52A2A");
                         vlera='ekzistonemail';
                         showdiverror(vlera);  // show error .....................................
                         var v=0;
                         $('.input2').each(function(){
                           v++;
                           if(v==2){
                             $(this).css("border-color","#A52A2A");
                           }
                         });
                       });
                     }
                   });
                 }
                 else{// if register is succesfully...........................................
                   $('.loading').css("visibility","visible");
                   $('.loading').css("background-color","#00BFFF");
                   $('.loading').animate({ // show loadin ........................................
                     width:'100%'
                   },"slow",function(){
                     if(valtype=='register'){
                       window.location.href='userprofile/checkuserprofile.php';// riderect  in your accounnt ..............
                     }
                     if(valtype=='reloadregister'){
                       location.reload();
                     }

                   });
                 }
               }
             });
           }
           else{  //Bussinness Account here  sign up  data are valid create array and send in server  .........................................
             $('.input2').each(function(){
               var val=$(this).val();
               arr[nr]=val;
               nr++;
             });
             arr[3]='icon-user.png';
             $.ajax({  // send data ajax .................
               type:'GET',
               url:'classlogin.php',
               data:{checkemail : arr},
               success:function(data){
                 if(data=='false'){ // if email exsists in database
                   var nrinput=0;
                   $('.input2').each(function(){  // error input .........
                     nrinput++;
                     if(nrinput==2){
                       $('.loading').css("background-color","#A52A2A");
                       $('.loading').css("visibility","visible");
                       $('.loading').animate({ //loadin show...................
                         width:'100%'
                       },"slow",function(){
                         $('.loading').css("visibility","hidden");
                         $('.loading').css("width","5px");
                         $(this).css('border-color','#A52A2A');
                         $('.valemail').remove();
                         $('.error').css("background-color"," #A52A2A");
                         vlera='ekzistonemail';
                         showdiverror(vlera);
                         var v=0;
                         $('.input2').each(function(){
                           v++;
                           if(v==2){
                             $(this).css("border-color","#A52A2A");
                           }
                         });
                       });
                     }
                   });
                 }
                 else{  // nest step data .............................................
                   $('.loading').css("visibility","visible");
                   $('.loading').css("background-color","#00BFFF");
                   $('.loading').animate({
                     width:'100%'
                   },"slow",function(){
                     $('.error').slideUp();
                     $('.loading').css("visibility","hidden");
                     $('.loading').css("width","5px");
                     $('.step1').animate({backgroundColor:'#00BFFF'},1000,function(){
                       $('.bussinnes').slideUp();
                       $('.setup').slideDown(); // show step 2 ..............................
                     });
                   });
                 }
               }
             });
           }
         }
         if(nrbo==3){  // check if nr emmpty are 3
           $('.valemail').remove();
           vlera=2;
           showdiverror(vlera);
           $('.input2').each(function(){
             $(this).css('border-color','none');
             $(this).css('border-color','#A52A2A');
           });
         }
       }
     }); // end button form register client acount and bussinnes account here ...........................................................................

     $('.input2').on("click",function(){ // check
       $(this).css('border-color','#00BFFF');
     });
     $('.input2').keyup(function(){  // chechk inputs on keyupp.....................................
       var vlera=0;
       var val=$(this).attr('id');
       var value=$(this).val();
       if(val==1){ // check if is input name .............................................
         if(value==''){
           vlera='emri';
           $('.valemail').remove();
           $('.error').css("background-color","#FFB6C1");
           showdiverror(vlera);
           $(this).css('border-color','none');
           $(this).css('border-color','#A52A2A');
         }
         else{
           $('.error').slideUp();
           $('.valemail').remove();
           $(this).css('border-color','	#00BFFF');
         }
       }
       if(val==2){  //check if is input email .......................................
         if(IsEmail(value)==false){
           vlera='email';
           $('.valemail').remove();
           $('.error').css("background-color","#FFB6C1");
           showdiverror(vlera);
           $(this).css('border-color','none');
           $(this).css('border-color','#A52A2A');
         }
         else{
           $('.error').slideUp();
           $('.valemail').remove();
           $(this).css('border-color','	#00BFFF');

         }
       }
       if(val==3){  // check if is input password .......................................
         if(value.length<6){
           vlera='fjalkalimi';
           $('.valemail').remove();
           $('.error').css("background-color","#FFB6C1");
           showdiverror(vlera);
           $(this).css('border-color','none');
           $(this).css('border-color','#A52A2A');
         }
         else{
           $('.error').slideUp();
           $('.valemail').remove();
           $(this).css('border-color','	#00BFFF');
         }
       }
     });
     // on blur  function for inputs ........................
     $('.input2').on("blur",function(){
       var value=$(this).val();
       if(value==''){
         $(this).css('border-color','#A52A2A');
         $(this).css('border-color','#A52A2A');

       }
     });

     // here end chechk for  sing up  client account and bussinnes account ...............................

     // here check for passwordi  and you can have acsses in your account ............................
     var activ=0;
     $('.btnlogin').click(function(){ // click btton login .................................
       var valtype=$(this).attr('id');

       $(this).css({
         background: 'url("images/load.gif") no-repeat center '
       });
       $(this).css('background-color',"#1E90FF");
       $(this).css('opacity',"0.7");
       $(this).val("");

       setTimeout(function(){

         var value='Send Code';

         $('.btnlogin').val(value);
         $('.btnlogin').css({
           background: 'url("") no-repeat center '
         });
         $('.btnlogin').css('background-color',"#1E90FF");
         $('.btnlogin').css('opacity',"1");
         btnlogin(valtype);  // call function for click button ....................................................................
       },1000);

       function btnlogin(valtype){

         var vali = $('.valpass').val();
         if(vali.length<6){  // chechk if password in input is 6 characters
           $('.valpass').css('border-color','#A52A2A');
           $('.error').css("background-color"," #FFB6C1");
           $('.valemail').remove();
           var valu ='fjalkalimi';
           showdiverror(valu);
         }
         else{ // send password in server , check if exsists in database
           var email = jQuery('.em').text();
           $.ajax({
             type:'GET',
             url:'classlogin.php',
             data:'password='+vali+ '&eemail='+email,
             success:function(data){
               var value=data;
               if(value=='true'){ // if password is correct with email ................................
                 $('.loading2').css("visibility","visible");
                 $('.loading2').css("background-color","#00BFFF");
                 $('.loading2').animate({
                   width:'100%'
                 },"slow",function(){
                   $('.loading2').css("visibility","hidden");
                   $('.loading2').css("width","5px");
                   if(valtype=='login'){
                     window.location.href='userprofile/checkuserprofile.php';
                   }
                   if(valtype=='reloadlogin'){
                     location.reload();
                   }
                 });
               }
               if(value=='false'){ // check if password is not correct with email .......................
                 $('.loading2').css("background-color","#A52A2A");
                 $('.loading2').css("visibility","visible");
                 $('.loading2').animate({
                   width:'100%'
                 },"slow",function(){
                   $('.loading2').css("visibility","hidden");
                   $('.loading2').css("width","5px");
                   $('.valpass').css('border-color','#A52A2A');
                   if(activ=="0"){
                     $('.error').css("background-color"," #A52A2A");
                     var valu ='fjalkaliminukeshteisakte';
                     showdiverror(valu);
                     activ++;
                   }
                 });
               }
             }
           });
         }
       }
     });
     // check password on keyup if is 6 charchters .....................................
     $('.valpass').keyup(function(){
       zerovariablat();
       var val=$(this).val();
       if(val.length<6){
         $('.valemail').remove();
         $('.valpass').css('border-color','#A52A2A');
         $('.error').css("background-color"," #FFB6C1");
         var valu ='fjalkalimi';
         zerovariablat();
         showdiverror(valu);
       }else{
         $('.error').slideUp();
         $('.valemail').remove();
         $(this).css('border-color','	#00BFFF');
       }
     });
     //check password on blur ..............................................
     $('.valpass').on("blur",function(){
       var value=$(this).val();
       if(value==''){
         $(this).css('border-color','#A52A2A');
         $(this).css('border-color','#A52A2A');
       }
     });

     var accounti="radio1";
     $('.clientacc').click(function(){  // click radio button type sign up   client or  bussinness .. .... .
       var i=0;
       var id= $(this).attr('id');
       if(accounti==id){  // check if you  bouble click in one radio
         accounti=id;
       }
       else{
         $('.input2').val("");
         $('.input2').css("border-color","#A9A9A9");
         $('.error').slideUp();
         accounti=id;
       }
       if(id=='radio1'){  //check if click is radio button1 ...................................
         $('.input2').each(function(){   // each  if you change type sign up  .. we change  some  placeholder .... ..
           i++
           if(i=="1"){
             $(this).attr("placeholder","Your Name");
             $('input[name="inputsubmit2"]').val('Register Client');
           }
         });
         $('.clientaccount').slideDown();
         $('.steps').slideUp();
         $('input[name="radioacount"]',this).prop("checked",true);
         $('#radio1').css("border-color","#00BFFF");
         $('#radio2').css("border-color","#A9A9A9");
         $('#radio2').css("background-color","white");
         $('#radio1').css("background-color","#E6E6FA");
       }
       else{
         $('input[name="radioacount"]',this).prop("checked",true);
         $('.input2').each(function(){
           i++
           if(i=="1"){
             $(this).attr("placeholder","Company Name");
             $('input[name="inputsubmit2"]').val('Next Business Create');
           }
         });
         $('.steps').slideDown();
         $('.clientaccount').slideUp();
         $('#radio2').attr('checked',true);
         $('#radio1').attr('checked',false);
         $('#radio1').css("border-color","#A9A9A9");
         $('#radio2').css("border-color","#00BFFF");
         $('#radio1').css("background-color","white");
         $('#radio2').css("background-color","#E6E6FA");
       }
     });

     var accounttype="radiologintype1";
     $('.typeaccountlogin').click(function(){  // click radio button type sign in   client or  bussinness .. .... .
       each=0;
       clickinpu=0;
       var i=0;
       var id= $(this).attr('id');
       if(accounttype==id){  // check if you  bouble click in one radio
         accounttype=id;

       }
       else{
         $('.input').val("");
         $('.input').css("border-color","#A9A9A9");
         $('.error').slideUp();
         accounttype=id;
       }
       if(id=='radiologintype1'){  //check if click is radio button1 ...................................
         $('.input').each(function(){   // each  if you change type sign up  .. we change  some  placeholder .... ..
           i++
           if(i=="1"){

             $('input[name="inputsubmit"]').val('Next Client');
             $('.client').show();
             $('.bussiness').hide();
           }
         });


         $('input[name="radiotypelogin"]',this).prop("checked",true);
         $('#radiologintype1').css("border-color","#00BFFF");
         $('#radiologintype2').css("border-color","#A9A9A9");
         $('#radiologintype2').css("background-color","white");
         $('#radiologintype1').css("background-color","#E6E6FA");
       }
       else{
         $('input[name="radiotypelogin"]',this).prop("checked",true);
         $('.input').each(function(){
           i++
           if(i=="1"){

             $('input[name="inputsubmit"]').val('Next Business');
             $('.client').hide();
             $('.bussiness').show();
           }
         });


         $('#radiologintype2').attr('checked',true);
         $('#radiologintype1').attr('checked',false);
         $('#radiologintype1').css("border-color","#A9A9A9");
         $('#radiologintype2').css("border-color","#00BFFF");
         $('#radiologintype1').css("background-color","white");
         $('#radiologintype2').css("background-color","#E6E6FA");
       }
     });
     // click button forget password ........................................................................................
     $('.forget').click(function(){
       $('.forgettb').show();
       $('.btnlgtb').hide();
       $('.next').slideUp();
       $('.choosetypeforget').slideDown();
       $('.error').slideUp();
       $('.valemail').remove();
       zerovariablat();
       $('.radioforget1').attr("checked",true);
       $('#radioforget1').css("background-color","#E6E6FA");
       $('#radioforget1').css("border-color","#00BFFF");

     });
     // click back from forget ...............................................
     $('.backlogin').click(function(){
       $('.forgettb').hide();
       $('.btnlgtb').show();
       $('.choosetypeforget').slideUp();
       $('.next').slideDown();

     });
     //  click  radio button for chose type forget password ......................................
     $('.forgetclick').click(function(){
       nrconfirm=0;
       $('.error').slideUp('slow');
       var id = $(this).attr('id');

       $('.forgetclick').css("background-color","white");
       $('.forgetclick').css("border-color","#A9A9A9");
       $('#'+id).css("background-color","#E6E6FA");
       $('#'+id).css("border-color","#00BFFF");
       $('input[name="radio"]', this).prop("checked",true);


     });
     $('.verifyclick').click(function(){
       $('.error').slideUp('slow');
       var id = $(this).attr('id');
       $('.verifyclick').css("background-color","white");
       $('.verifyclick').css("border-color","#A9A9A9");
       $('#'+id).css("background-color","#E6E6FA");
       $('#'+id).css("border-color","#00BFFF");
       $('input[name="vf"]', this).prop("checked",true);


     });
     //  click button send E-mail  for confirm account .............................................................


     $('.buttonforgetdb').click(function(){
       $(this).css({
         background: 'url("images/load.gif") no-repeat center '
       });
       $(this).css('background-color',"#1E90FF");
       $(this).css('opacity',"0.7");
       $(this).val("");

       setTimeout(function(){

         var value='Send Code';

         $('.buttonforgetdb').val(value);
         $('.buttonforgetdb').css({
           background: 'url("") no-repeat center '
         });
         $('.buttonforgetdb').css('background-color',"#1E90FF");
         $('.buttonforgetdb').css('opacity',"1");
         buutonforget();  // call function for click button ....................................................................
       },1000);


       function buutonforget(){
         if(nrconfirm=="0"){
           nrconfirm++;
           if ($('.radioforgett1').is(":checked")==true){ // check if you choose email for confirm account ...........

             var value=1;
             $.ajax({
               type:'GET',
               url:'classlogin.php',
               data:'getdatauser='+value,
               success:function(data){
                 var dt = data;
                 if(dt){
                   $.ajax({
                     type:'GET',
                     url:'classlogin.php',
                     data : 'emailforget='+dt,
                     success:function(){

                     }
                   });
                 }
               }


             });
             $(this).css("opacity","0.7");
             $('.loading2').css("visibility","visible");
             $('.loading2').css("background-color","#00BFFF");
             $('.loading2').animate({
               width:'100%'
             },'slow',function(){
               $('.loading2').css("visibility","hidden");
               $('.loading2').css("width","5px");
               $('.choosetypeforget').slideUp('slow');
               $('.forgettb').hide();
               $('.confirmcodetb').show();
               $('.putconfirmcode').slideDown(function(){
               });
             });



           }
         }
         if ($('.radioforgett2').is(":checked")==true){   //  check if you choose phone for confirm code..........................

           $(this).css("opacity","0.7");
           $('.loading2').css("visibility","visible");
           $('.loading2').css("background-color","#A52A2A");
           $('.loading2').animate({
             width:'100%'
           },'slow',function(){
             $('.loading2').css("visibility","hidden");
             $('.loading2').css("width","5px");
             var err="gabimtel";
             showdiverror(err);
           });
         }
       }
     });

     // click button confirm account ...................................................................................
     $('.btnconfirm').click(function(){    /////
       $(this).css({
         background: 'url("images/load.gif") no-repeat center '
       });
       $(this).css('background-color',"#1E90FF");
       $(this).css('opacity',"0.7");
       $(this).val("");

       setTimeout(function(){

         var value='Send Confirm Code';

         $('.btnconfirm').val(value);
         $('.btnconfirm').css({
           background: 'url("") no-repeat center '
         });
         $('.btnconfirm').css('background-color',"#1E90FF");
         $('.btnconfirm').css('opacity',"1");
         btnconfirm();  // call function for click button ....................................................................
       },1000);

       function btnconfirm(){
         $('.loading2').css("width","5px");
         var code=$('.codeconfi').val();
         if(code.length==0 || code.length<6){
           $('.valemail').remove();
           $('.codeconfi').css('border-color',"#A52A2A");
           var code='kodi6digit';
           showdiverror(code);
         }
         else{
           var emaili = $('.emmm').text();
           var arrayconfirm = [];
           arrayconfirm[0]=emaili;
           arrayconfirm[1]=code;
           $.ajax({
             type:'GET',
             url:'classlogin.php',
             data:{key:arrayconfirm},
             success:function(data){
               var value=data;
               if(value=='1'){  //riderect in your account confirm.............................................
                 $('.error').slideUp();
                 $('.loading2').css("width","5px");
                 $('.loading2').css("visibility","visible");
                 $('.loading2').css("background-color","#00BFFF");
                 $('.loading2').animate({
                   width:'100%'
                 },'slow',function(){
                   $('.loading2').css("visibility","hidden");
                   $('.loading2').css("width","5px");
                   window.location.href="userprofile/checkuserprofile.php";
                 });

               }
               if(value=='0'){ /// code isnot correct !!!!! . . . .. . . .. . . .. . . .. . . . .

                 $('.codeconfi').css('border-color',"#A52A2A");
                 $('.loading2').css("visibility","visible");
                 $('.loading2').css("background-color","#A52A2A");
                 $('.loading2').animate({
                   width:'100%'
                 },'slow',function(){
                   $('.loading2').css("visibility","hidden");
                   $('.loading2').css("width","5px");
                   var err='6digit';
                   showdiverror(err);
                 });




               }
             }
           });
         }
       }
     });

     // code for setup steps create bussiness account ...........................................
     var nr =0;
     var nrboshselect=0;

     $('.inputsubmit3').click(function(){
       $(this).css({
         background: 'url("images/load.gif") no-repeat center '
       });

       $(this).css('background-color',"#1E90FF");
       $(this).css('opacity',"0.7");
       $(this).val("");
       nextsetupcreatebusiness();  // call function for click button ....................................................................

     });

     function nextsetupcreatebusiness(){

       $('.inpu').each(function(){
         nr++;

         var val = $(this).val();

         // validate input 1 in setup fill

         if(val==0 && nr==1){
           $('.valemail').remove();
           var error = 'industry';
           showdiverror(error);
           $(this).css('border-color','#A52A2A');
           nrboshselect++;
         }

         if(val!='0' && nr==1){

           $(this).css('border-color','#00BFFF');

         }

         // validate input 2 in input fill
         if(val.length=='0' && nr==2 && nrboshselect==0){
           $('.valemail').remove();
           var error = 'street';
           showdiverror(error);
           $(this).css('border-color','#A52A2A');
           nrboshselect++;
         }

         if(val.length==='0' && nr==2){

           $(this).css('border-color','#A52A2A');
           nrboshselect++;
         }

         if(val.length!='0' && nr==2){

           $(this).css('border-color','#00BFFF');

         }

         // validate input 3 in fill


         if(val.length=='0' && nr==3 && nrboshselect==0){
           $('.valemail').remove();
           var error = 'city';
           showdiverror(error);
           $(this).css('border-color','#A52A2A');
           nrboshselect++;
         }
         if(val.length==0 && nr==3){

           $(this).css('border-color','#A52A2A');
           nrboshselect++;
         }
         if(val.length!='0' && nr==3){

           $(this).css('border-color','#00BFFF');


         }

         // validate inputs 4 in fill

         if(val=='0' && nr==4 && nrboshselect==0){
           $('.valemail').remove();
           var error = 'state';
           showdiverror(error);
           $(this).css('border-color','#A52A2A');
           nrboshselect++;
         }
         if(val=='0' && nr==4){

           $(this).css('border-color','#A52A2A');
           nrboshselect++;
         }
         if(val!='0' && nr==4){

           $(this).css('border-color','#00BFFF');

         }

         // validate inputs 5 in fill

         if( nr==5 && nrboshselect==0){
           if(validatePhone(val)==false){


             $('.valemail').remove();
             var error = 'phone';
             showdiverror(error);
             $(this).css('border-color','#A52A2A');
             nrboshselect++;
           }
         }

         if( nr==5){
           if(validatePhone(val)==false){
             $(this).css('border-color','#A52A2A');
             nrboshselect++;
           }
         }

         if( nr==5){
           if(validatePhone(val)==true){
             $(this).css('border-color','#00BFFF');

           }
         }

         if(nrboshselect=='5'){
           $('.valemail').remove();
           var error = 'totalerror';
           showdiverror(error);


         }

       });

       if(nrboshselect=='0'){

         // get location user  to show it into google map ........... API

         var map, infoWindow;

         initMap();// call function initmap to get latitude and langitude...................
         setTimeout(function(){
           next_bussines_to_verify_account();
         },2000);



         // end get latitude and longitude that are for location in google map .........................
       }
     } // end function .....

     function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -34.397, lng: 150.644},
         zoom: 6
       });
       infoWindow = new google.maps.InfoWindow;

       // Try HTML5 geolocation.
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };

           infoWindow.setPosition(pos);
           infoWindow.setContent('Location found.');
           infoWindow.open(map);
           map.setCenter(pos);
           var i=0;
           var j=1;
           arry[i]=pos['lat'];
           arry[j]=pos['lng'];


         }, function() {
           handleLocationError(true, infoWindow, map.getCenter());
         });


       } else {
         // Browser doesn't support Geolocation
         handleLocationError(false, infoWindow, map.getCenter());

       }

     }

     function handleLocationError(browserHasGeolocation, infoWindow, pos) {
       infoWindow.setPosition(pos);
       infoWindow.setContent(browserHasGeolocation ?
           'Error: The Geolocation service failed.' :
           'Error: Your browser doesn\'t support geolocation.');
       infoWindow.open(map);
     }

     function next_bussines_to_verify_account(){
       $('.error').slideUp();

       var i=2;

       $('.inpu').each(function(){
         arry[i]=$(this).val();
         i++;
       });
       for (var i=0;i<arry.length;i++){
         alert(arry[i]);
       }

       $('.loading').css("visibility","visible");
       $('.loading').css("background-color","#00BFFF");
       $('.loading').animate({
         width:'100%'
       },"slow",function(){
         $('.error').slideUp();
         $('.loading').css("visibility","hidden");
         $('.loading').css("width","5px");
         $('.emailkompani').append(arr['1']);
         $('.telkompani').append(arry['4']);
         $('.step2').animate({backgroundColor: '#00BFFF'},1000,function(){
           // show step 3 ..............................
           $('.setup').slideUp();
           $('.verify').slideDown();

           $('#radioforget1').css("background-color","#E6E6FA");
           $('#radioforget1').css("border-color","#00BFFF");
           $('.radioverify1').prop("checked",true);
         });
       });

       $.ajax({

         type:'GET',
         url:'classlogin.php',
         data:{accbusinessstep1:arr,accbusinessstep2:arry},
         success:function(data){
           $('.inputsubmit3').css({
             background:'url("") no-repeat center'
           });
           $('.inputsubmit3').css('background-color',"#1E90FF");
           $('.inputsubmit3').css('opacity',"1");
           $('.inputsubmit3').val('Next Setup');
         },
         beforeSend:function(){

         },
         error:function(e){
           if(e.status==0){
             var value = 'nointernet';
             nointernet(value);
           }
         }
       });

     }
     // verify  bussiness account button ..............................


     $('.buttonverify').click(function(){
       $(this).css({
         background: 'url("images/load.gif") no-repeat center '
       });
       $(this).css('background-color',"#1E90FF");
       $(this).css('opacity',"0.7");
       $(this).val("");

       setTimeout(function(){

         var value='Send Code';

         $('.buttonverify').val(value);
         $('.buttonverify').css({
           background: 'url("") no-repeat center '
         });
         $('.buttonverify').css('background-color',"#1E90FF");
         $('.buttonverify').css('opacity',"1");
         buttonverify();  // call function for click button ....................................................................
       },1000);
       function buttonverify(){
         $('.valemail').remove();
         if ($('.radioverify1').is(":checked")==true){ // check if you choose email for confirm account ...........

           $('.loading').css("visibility","visible");
           $('.loading').css("background-color","#00BFFF");
           $('.loading').animate({
             width:'100%'
           },"slow",function(){
             $('.error').slideUp();
             $('.loading').css("visibility","hidden");
             $('.loading').css("width","5px");


             $('.step3').animate({backgroundColor: '#FFE4C4'},1000,function(){
               // show step 3 ..............................
               $('.choseforget').slideUp();
               $('.Codeverify').slideDown();
             });
           });
           var conf='confirmcode';
           $.ajax({
             type:'GET',
             url:'classlogin.php',
             data: {confirm:conf,array1:arr},
             success:function(data){




             }
           });
         }
         if ($('.radioverify2').is(":checked")==true){   //  check if you choose phone for confirm code..........................
           var err='gabimtel';
           showdiverror(err);

         }
       }
     });

     $('.submitcode').click(function(){
       $(this).css({
         background: 'url("images/load.gif") no-repeat center '
       });
       $(this).css('background-color',"#1E90FF");
       $(this).css('opacity',"0.7");
       $(this).val("");

       setTimeout(function(){

         var value='Send Code';

         $('.submitcode').val(value);
         $('.submitcode').css({
           background: 'url("") no-repeat center '
         });
         $('.submitcode').css('background-color',"#1E90FF");
         $('.submitcode').css('opacity',"1");
         confirmcodesingupbusiness();  // call function for click button ....................................................................
       },1000);

       function confirmcodesingupbusiness(){
         var buss='stillcreatebusinnes';
         showdiverror(buss);
         $('.inpucode').css('border-color',"#A52A2A");
       }
     });
     // start jqury when is on input text and click enter submit button
     $('.input').keypress(function(e){
       if(e.which == 13){//Enter key pressed
         $('.inputsubmit').click();//Trigger search button click event
       }
     });
     $('.input2').keypress(function(e){
       if(e.which == 13){//Enter key pressed
         $('.inputsubmit2').click();//Trigger search button click event
       }
     });

     $('.valpass').keypress(function(e){
       if(e.which == 13){
         $('.btnlogin').click();
       }
     });
     $('.inpu').keypress(function(e){
       if(e.which == 13){
         $('.inputsubmit3').click();
       }
     });
     $('.inpucode').keypress(function(e){
       if(e.which == 13){
         $('.submitcode').click();
       }
     });
     // end


     function showlogin(){
       $('.loginandhija').css('top','-600px');
       $('.loginandhija').show();
       $('.opacity').show();
       $('.loginandhija').animate({
         top:"100px"
       },'fast');

     }

     $('.hide').click(function(){ /// show login
       hidelogin();
     });
     function hidelogin(){
       $('.loginandhija').animate({
         top:"-600px"
       },'fast',function(){
         $('.loginandhija').hide();
         $('.opacity').hide();
       });
     }

     // function for show div error ..................................................................................

     function showdiverror(nr){
       if(nr='nointernet'){
         $('.valemail').remove();
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Please check you internet connection!!</div>');
       }
       if(nr==1){
         errsingin++;
         $('.valemail').remove();
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Ju lutem plotesoni sakte E-mail</div>');
       }
       if(nr==2){
         errsingup++;
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Ju lutem plotesoni te dhenat</div>');
       }

       if(nr=='emri'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Ju lutem plotesoni emrin tuaj</div>');
       }

       if(nr=='email'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Ju lutem ploteson E-mail te sakte</div>');
       }

       if(nr=='fjalkalimi'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Fjalkalimi te pakten 6 karaktere</div>');
       }
       if(nr=='fjalkaliminukeshteisakte'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Fjalkalimi nuk eshte i sakte!!</div>');
       }

       if(nr=='nukkaemail'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">This E-mail doesnt exsist in Database!!</div>');
       }
       if(nr=='ekzistonemail'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">This E-mail doesnt exsist in Database!!</div>');
       }
       if(nr=='gabimtel'){
         $('.valemail').remove();
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Not avaliable With phone number</div>');
       }
       if(nr=='kodi6digit'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">The code should be 6 characters long</div>');
       }
       if(nr=='6digit'){
         $('.valemail').remove();
         $('.error').show('fast');
         $('.error').append('<div class="valemail">The code is not correct</div>');
       }
       if(nr=='state'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Please select the your State</div>');
       }
       if(nr=='industry'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Please select the your Industry</div>');
       }

       if(nr=='city'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Please put your City</div>');
       }
       if(nr=='street'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Please put your Street Adress</div>');
       }
       if(nr=='totalerror'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Please fill in all fields</div>');
       }
       if(nr=='phone'){
         $('.error').show('fast');
         $('.error').append('<div class="valemail">Please Put your number phone Correct</div>');
       }
       if(nr=='isnotready'){
         $('.valemail').remove();
         $('.error').show('fast');
         $('.error').append('<div class="valemail">This isnot ready for moment</div>');
       }
       if(nr=='stillcreatebusinnes'){
         $('.valemail').remove();
         $('.error').show('fast');
         $('.error').append('<div class="valemail">This isnot ready dont create Bss</div>');
       }
     }
     //function for validate email..............................................................................

     function IsEmail(email) {
       var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
       if(!regex.test(email)) {
         return false;
       }else{
         return true;
       }
     }
     // validate phone number ...............................................................
     function validatePhone(Phone) {

       var filter = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
       if (filter.test(Phone)) {
         return true;
       }
       else {
         return false;
       }
     }
     // function  zero variablat . . . . ..................................................................
     function zerovariablat(){
       errsingin=0;
       errsingup=0;
       clickinpu=0;
       activ=0;
     }
   }); // end documen  ready function .......................................................


 }
}
