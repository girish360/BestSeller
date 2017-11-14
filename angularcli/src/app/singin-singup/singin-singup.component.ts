import { Component, OnInit} from '@angular/core';

declare var $:any;



@Component({
  selector: 'app-singin-singup',
  templateUrl: './singin-singup.component.html',
  styleUrls: ['./singin-singup.component.css']
})

export class SinginSingupComponent implements OnInit {



  constructor() { }




  ngOnInit() {

    $(document).ready(function () {

      var ClearAllInput=true;
      var errsingin=0;
      var errsingup=0;
      var acc=0;
      var nrr=0;	// tabet sing in and sing up
      var activ=1;
      var clickinpu=0;
      var errorsingin=1;
      var First_array_singup_user=[];
      var Second_array_singup_user=[];
      var vlera= 0;
      //color input and icon variable
      var inputName='';
      var color_input_icon='';
      var iconName='';
      //end..
      // variable submit button ......
      var inputName_submit='';
      var status_submit='';
      // end..
      var Error_Value;

      //variable for send request in server .......
      var Path ='';
      var Data = '';
      var Status = '';
      var Response;
      //end
      var radiotypelogin=0;
      var value_input='';

      var nrconfirm=0;

      var Server_path='http://localhost';
      showlogin();

      $('#radiotypelogin1').attr('checked',true);
      $('#radiologintype1').css("border-color","#00BFFF");
      $('#radiologintype1').css("background-color","#E6E6FA");

      $('.radioforgett1').attr('checked',true);

      $('.inittab').css({ backgroundColor: '#F5F5F5' ,borderColor:'#00BFFF',color:'red'});


      $('.tabs').click(function(){  // click tabs from sign up ang sign in . . . .. . . .. . .. . . .. . .. .. . . ..
        var t=0;
        zerovariablat();
        $('.valemail').remove();
        $('.error').css("display","none");
        $('.tabs').css({ backgroundColor: '#E6E6FA' , borderColor:'	#E6E6FA'});
        $(this).css({ backgroundColor: '#F5F5F5' ,borderColor:'#00BFFF'});

        var id = $(this).attr('id');
        if(activ==id){ // check if is double click  on one tab................................................................
        }
        else{
          activ=id;
          if(id == 1){
            $('.sing2').slideUp();
            $('.sing1').slideDown();
          }
          else if(id == 2 ){
            nrr++;
            if(nrr==1){
              $('#rad2').prop('checked',false);
              $('#rad1').prop('checked',true);
              $('#radio1').css("border-color","#00BFFF");
              $('#radio1').css("background-color","#E6E6FA");
            }
            $('.sing1').slideUp();
            $('.sing2').slideDown();
          }
          else if(id == 3){
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
            $('.inittab').css({backgroundColor: '#F5F5F5' ,borderColor:'#00BFFF',color:'red'});
          }
          else if( id == 4 ){
            // click button forget password ........................................................................................

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

            $('.inittab').css({backgroundColor: '#F5F5F5' ,borderColor:'#00BFFF',color:'red'});
          }
          else if( id == 5 ){
            // click back from forget ...............................................

            $('.forgettb').hide();
            $('.btnlgtb').show();
            $('.choosetypeforget').slideUp();
            $('.next').slideDown();

            $('.inittab').css({backgroundColor: '#F5F5F5' ,borderColor:'#00BFFF',color:'red'});
          }
        }
      });





      // end tabs click button here ...........................................................................................

      // start sign in   check email when click buton , when write in input keyup , when  click in input onblur..................


      $('.input').on("focus",function () {

        GiveColorInput(inputName="input-email" , iconName ='icon-email' ,color_input_icon="#00BFFF" );

      });
      // check email on blur ..................................................................................................
      $('.input').on("blur",function(){
        var value=$(this).val();

        if(value==''){

          GiveColorInput(inputName="input-email" , iconName ='icon-email' ,color_input_icon="#A52A2A" );
        }
      });
      // click button  for take email  valid and send email in server with ajax chehck if exsits ............................
      $('.inputsubmit').click(function(){


        clicksubmit( inputName_submit = 'inputsubmit' , status_submit='show' ,value_input);
        // call function for click button ....................................................................
        checkemail();

      });
      function checkemail(){ // check email if is correcly  .......
        clickinpu++;
        var val = $('#us').val();
        var nreach=0;
        var vlera;
        var each=0;

        $('.radiotypelogin').each(function(){
          nreach++;
          if($(this).is(':checked',true)){
            radiotypelogin=nreach;
          }
        });

        if ( radiotypelogin == 1){
          value_input='Next Client';
        }
        else{
          value_input='Next Business';
        }

        if(radiotypelogin==1){//check if is client login
          if(IsEmail(val)==false){  // check if email is invalid........................................................

            GiveColorInput( inputName="input-email" , iconName ='icon-email' ,color_input_icon="#A52A2A" );

            if(clickinpu==1 ){
              showdiverror(errorsingin);
              clickinpu++;
            }


            setTimeout(function(){
              clicksubmit( inputName_submit = 'inputsubmit' , status_submit='hide',value_input);
            },1000);
            return false;
          }
          else{  /// send email in server ..............................................................................
            zerovariablat(); // empty variable ....
            Path = Server_path+'/bestseller/Server_PHP/classlogin.php';
            Data = 'email='+val;
            Status='GET';
            Send_Request_In_Server( Path , Data , Status); // call function  to make request in server .........
          }
        }
        else{ // here is login for business...............
          Error_Value = 'isnotready';
          showdiverror(Error_Value);
          $('#us').css('border-color','#A52A2A');
        }
      }


      //end sing in........................................................................................................................................

      // click button for sing up  client and business......................................................................................................................................
      $('.inputsubmit2').click(function(){

        var nreach=0;
        var nrbosh=0;
        var  vlera ="";
        var nrbo=0;
        var vleraok=0;
        var nraccount=0;
        var nracceach=0;
        var valtype=$(this).attr('id');

        value_input = '';
        clicksubmit( inputName_submit = 'inputsubmit2' , status_submit='show' ,value_input); //  put image loading in button

        setTimeout(function(){
          var each=0;
          var currectly=0;

          $('.radio').each(function(){
            each++;
            if($(this).is(":checked",true)){
              currectly=each;
            }
          });
          if(currectly==1){
            value_input='Register Client';
          }
          else{
            value_input='Next Business Create';
          }
          clicksubmit( inputName_submit = 'inputsubmit2' , status_submit='hide' ,value_input); //  put image loading in button

          registeruser(valtype);  // call function for register user ....................................................................
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
              Error_Value='emri';
              $('.valemail').remove();
              showdiverror(Error_Value);
              $(this).css('border-color','none');
              $(this).css('border-color','#A52A2A');
            }
            if(nreach==2){   // check second  input .......................................
              if(IsEmail(value)==false){
                if(nrbosh==1){
                }
                else{
                  nrbosh++;
                  Error_Value='email';
                  $('.valemail').remove();
                  showdiverror(Error_Value);
                  $(this).css('border-color','none');
                  $(this).css('border-color','#A52A2A');
                }
              }
            }
            if(nreach==3 && value.length<6){  // check third input ..........................
              if(nrbosh==0){
                nrbosh++;
                $('.valemail').remove();
                Error_Value='fjalkalimi';
                showdiverror(Error_Value);
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

                First_array_singup_user[nr]=val;  // create array.........
                nr++;
              });

              First_array_singup_user[3]='icon-user.png';
              // send request in server ......
              Path = Server_path+'/bestseller/Server_PHP/classlogin.php';
              Data = 'arraydatauser='+First_array_singup_user;
              Status='GET';
              Send_Request_In_Server( Path , Data , Status ); // call function  to make request in server .........
            }
            else{  //Bussinness Account here  sign up  data are valid create array and send in server  .........................................
              $('.input2').each(function(){
                var val=$(this).val();
                First_array_singup_user[nr]=val;
                nr++;
              });
              First_array_singup_user[3]='icon-user.png';
              $.ajax({  // send data ajax .................
                type:'GET',
                url:'classlogin.php',
                data:{checkemail : First_array_singup_user},
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
            var error = 2;
            showdiverror(error);
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
        var vlera="";
        var val=$(this).attr('id');
        var value=$(this).val();
        if(val==1){ // check if is input name .............................................
          if(value==''){
            vlera = 'emri';
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
            vlera = "email";
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
      var activ =0;
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
            var email = $('.em').text();
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
                    if(activ == 0){
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
            if(i==1){
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
            if(i==1){
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
        var each=0;
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
            if(i==1){

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
            if(i==1){

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

        value_input='';
        clicksubmit( inputName_submit = 'buttonforgetdb' , status_submit='show',value_input);

        setTimeout(function(){

          value_input='Send Code';
          clicksubmit( inputName_submit = 'buttonforgetdb' , status_submit='hide',value_input);
          buutonforget();  // call function for click button ....................................................................

        },1000);


        function buutonforget(){
          if(nrconfirm==0){
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
            var codes = "kodi6digit";
            showdiverror(codes);
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

          if(nrboshselect==5){
            $('.valemail').remove();
            var error = 'totalerror';
            showdiverror(error);


          }

        });

        if(nrboshselect==0){

          // get location user  to show it into google map ........... API

          var map, infoWindow;


          setTimeout(function(){
            next_bussines_to_verify_account();
          },2000);



          // end get latitude and longitude that are for location in google map .........................
        }
      } // end function ....
      function next_bussines_to_verify_account(){
        $('.error').slideUp();

        var i=2;

        $('.inpu').each(function(){
          Second_array_singup_user[i]=$(this).val();
          i++;
        });
        for (var i=0;i<  Second_array_singup_user.length;i++){
          alert(Second_array_singup_user[i]);
        }

        $('.loading').css("visibility","visible");
        $('.loading').css("background-color","#00BFFF");
        $('.loading').animate({
          width:'100%'
        },"slow",function(){
          $('.error').slideUp();
          $('.loading').css("visibility","hidden");
          $('.loading').css("width","5px");
          $('.emailkompani').append(First_array_singup_user['1']);
          $('.telkompani').append(Second_array_singup_user['4']);
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
          data:{accbusinessstep1:First_array_singup_user,accbusinessstep2:Second_array_singup_user},
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
              showdiverror(value);
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
              data: {confirm:conf,array1:First_array_singup_user},
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
        $('.under_login').css('top','-600px');
        $('.under_login').show();
        $('.opacity').show();
        $('.under_login').animate({
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

        $('.error').css({width:'5px'});
        if(nr=='nointernet'){
          $('.valemail').remove();
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Please check you internet connection!! and  click again</div>');
        }
        if(nr==1){
          errsingin++;
          $('.valemail').remove();
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Ju lutem plotesoni sakte E-mail</div>');
        }
        if(nr==2){
          errsingup++;
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Ju lutem plotesoni te dhenat</div>');
        }

        if(nr=='emri'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Ju lutem plotesoni emrin tuaj</div>');
        }

        if(nr=='email'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Ju lutem ploteson E-mail te sakte</div>');
        }

        if(nr=='fjalkalimi'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Fjalkalimi te pakten 6 karaktere</div>');
        }
        if(nr=='fjalkaliminukeshteisakte'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Fjalkalimi nuk eshte i sakte!!</div>');
        }

        if(nr=='nukkaemail'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">This E-mail doesnt exsist in Database!!</div>');
        }
        if(nr=='ekzistonemail'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">This E-mail doesnt exsist in Database!!</div>');
        }
        if(nr=='gabimtel'){
          $('.valemail').remove();
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Not avaliable With phone number</div>');
        }
        if(nr=='kodi6digit'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">The code should be 6 characters long</div>');
        }
        if(nr=='6digit'){
          $('.valemail').remove();
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">The code is not correct</div>');
        }
        if(nr=='state'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Please select the your State</div>');
        }
        if(nr=='industry'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Please select the your Industry</div>');
        }

        if(nr=='city'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Please put your City</div>');
        }
        if(nr=='street'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Please put your Street Adress</div>');
        }
        if(nr=='totalerror'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Please fill in all fields</div>');
        }
        if(nr=='phone'){
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">Please Put your number phone Correct</div>');
        }
        if(nr=='isnotready'){
          $('.valemail').remove();
          $('.error').show('fast').animate({width:'100%'},'fast');
          $('.error').append('<div class="valemail">This isnot ready for moment</div>');
        }
        if(nr=='stillcreatebusinnes'){
          $('.valemail').remove();
          $('.error').show('fast').animate({width:'100%'},'fast');
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

      function GiveColorInput(inputName , iconName, color_input_icon ){

        $('.'+inputName).css({borderColor:color_input_icon});
        $('.'+iconName).css({color:color_input_icon,borderColor:color_input_icon});
      }

      function clicksubmit(inputName_submit , status ,value){
        if(status=='show'){
          $('.'+inputName_submit).val('');
          $('.'+inputName_submit).css({ background:'url("assets/images/load.gif") no-repeat center', backgroundColor:'#1E90FF', opacity:'0.7' });

        }
        if(status=='hide'){
          setTimeout(function(){
            $('.'+inputName_submit).css({background:'url("") no-repeat center', backgroundColor:'#1E90FF', opacity:'1' });
            $('.'+inputName_submit).val(value);
          },1000);

        }

      }

      function Send_Request_In_Server( Path , Data , Status){

        if(Status == 'GET'){

          $.ajax({
            type: Status,
            url: Path,
            data: Data,

            success:function(data){

              Response = data;

              success_response(); // call function success

            },error:function(e){

            },beforeSend:function(){

            }
          });

        }
        else if(Status == 'POST'){

        }
        else{
          Response  = 'Nothing';

        }

      }

      function loading_Submit_Red_Blue(Status){
        $('.loading').css({float: 'Left'});
        if(Status == 'Red') {
          $('.loading').css("visibility", "visible");
          $('.loading').css("background-color", "#A52A2A");
          $('.loading').animate({
            width: '100%'
          }, 'slow', function () {
            $('.loading').css({float: 'Right'});
            $('.loading').animate({
              width:'5px'
            },'fast',function(){
              $('.loading').css("visibility", "hidden");
              $('.loading').css("width", "5px");
              $('#us').css('border-color', '   #A52A2A');
              $('.valemail').remove();
              $('.error').css("background-color", " #A52A2A");
              Error_Value = 'nukkaemail';
              showdiverror(Error_Value);
            });
          });

        }
        if(Status == 'Blue'){
          $('.loading').css("visibility","visible");
          $('.loading').css("background-color","#00BFFF");
          $('.loading').animate({
            width:'100%'
          },'slow',function(){
            $('.loading').css({float: 'Right'});
            $('.loading').animate({
              width:'5px'
            },'slow',function(){
              $('.lgtb').hide();
              $('.btnlgtb').show();

              $('.loading').css("visibility","hidden");
              $('.loading').css("width","5px");
            });


          });
        }

      }

      // response from server for email login  ...............................................................................................................
      function success_response(){
        if( Response == 'false_register_client' || Response == 'true_register_client'){
          if(Response == 'false_register_client' ){ // if is not register in database , if email exists in database  ................
            var nrinput=0;
            $('.input2').each(function(){  // error in inputs number 2 "email"............
              nrinput++;
              if(nrinput==2){ // check inputs......................
                Status = 'Red';
                loading_Submit_Red_Blue(Status);  // show error  and loding.....................................

                var v=0;
                $('.input2').each(function(){
                  v++;
                  if(v==2){
                    $(this).css("border-color","#A52A2A");
                  }
                });

              }
            });
          }
          else if( Response == 'true_register_client' ){// if register is succesfully...........................................
            Status = 'Blue';
            loading_Submit_Red_Blue(Status);  // show loding.....................................



          }

        }else {
          if (Response == '1') {
            //red
            Status = 'Red';
            loading_Submit_Red_Blue(Status);
            clicksubmit(inputName_submit = 'inputsubmit', status_submit = 'hide', value_input);
          }
          else {
            //blue
            Status = 'Blue';
            loading_Submit_Red_Blue(Status);

            var result = $.parseJSON(Response); // get data json ..............................................................................

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
            $('.next').slideDown(function () {
              $('.imguser').hide();
              $('.writetypelogin').hide();
              $('.logo1').append('<img class="imguse" src="' + result['foto'] + '"/>');
              $('.imguse').css({width: "0px", height: '120px'});
              $('.imguse').animate({
                width: '100%',
                borderRadius: '150px'

              });
            });

          }
        }
      }
    }); // end documen  ready function .......................................................


  }

}
