<?php
    require_once 'fbConfig.php';// Include FB config file && User class

    $loginURL = $helper->getLoginUrl($redirectURL, $fbPermissions);// Get login url
	$outp = '<a class="log" href="'.htmlspecialchars($loginURL).'"><img class="imgf" src="images/fblogin-btn.png"></a>';	// Render facebook login button

	if(isset($accessToken) || isset($_SESSION['id'])){
	if(isset($_SESSION['facebook_access_token']) || isset($_SESSION['id'])){
		if(isset($_SESSION['id']) || isset($_SESSION['facebook_access_token'])){
            header('location:userprofile/checkuserprofile.php');
		}
		
	}
	
}


?>

<html>
<head>
    <title>Login with Facebook using PHP</title>
    <style type="text/css">
	   h1{font-family:Arial, Helvetica, sans-serif;color:#999999;}
    </style>
    <script src="js/jquery-3.1.1.min.js"></script> <!-- jquery library -->
    <link rel="stylesheet" type="text/css" href="css/css_login/style.css">  <!-- css style -->
    <script type="text/javascript" src="js/js_login/login.js"></script>  <!-- jquery file for login -->
    <script src="//cdn.jsdelivr.net/jquery.color-animation/1/mainfile"></script>
    <link href='http://fonts.googleapis.com/css?family=Droid+Serif' rel='stylesheet' type='text/css'>
</head>
<body>

    
       <div class="opacity"></div>
       <br>
      <div class="hide">X</div>
        <div class="loginandhija">
        <div class="login">
            <div class="slid">
                <div class="btabs"><!-- start the tabs sing in ore sing up  -->
                    <div class="lgtb">
                    <a href="#"> <div class="tabs" id="1"> <div class="tabtext" id="tab1"><img src="images/sign.png"><div class="word">Sign In</div></div> </div></a><a href="#"><div class="tabs" id="2"><div class="tabtext" id="tab2"><img src="images/add.png"><div class="word">Sign Up</div></div></div></a><br>
                    <div class="loading"></div>
                    </div>
                    <div class="btnlgtb">
                    	<a href="#"> <div class="back" id="1"><div class="tabtext"><img src="images/back.png"><div class="word">Back</div></div></div></a><a href="#"><div class="forget" id="2"><div class="tabtext"><img src="images/help.png"><div class="word">Forget Key</div></div></div></a> <div class="loading2"></div><br>
                    </div>
                    <div class="forgettb">
	                      <a href="#"> <div class="backlogin" id=""><div class="tabtext"><img src="images/back.png"><div class="word">Back</div></div></div></a><a href="#"><div class="forget" id=""><div class="tabtext"><img src="images/help.png"><div class="word">Forget Key</div></div></div></a> <div class="loading2"></div><br>
                     </div>
                     <div class="confirmcodetb">
	                       <a href="#"> <div class="accountcode" id=""><div class="tabtext" style="color:gray;">Confirm Your Account</div></div></a><div class="loading2" style="-webkit-box-shadow: 142px 142px 9px -137px rgba(199,52,135,1);-moz-box-shadow: 142px 142px 9px -137px rgba(199,52,135,1);box-shadow: 142px 142px 9px -137px rgba(199,52,135,1);"></div><br>
                     </div>
                </div><br> <!-- end the tabs sing in ore sing up  -->
            <div class="sing1" id="sing" > <!-- start sing in -->

                <center><div class="logo1"><img class="imguser" src="images/icon-user.png"></div>
                       
                      <div class="writetypelogin">  <div class="client"> Client Login </div><div class="bussiness"> Business Login </div></div><br>
                <div class="closelogin">
                    <div class="typeaccount">
                            <a href="#"> 
                            <div class="typeaccountlogin" id="radiologintype1">
                               <input class="radiotypelogin" id="radiotypelogin1" name="radiotypelogin" type="radio">
                               <div class="clacc">Client</div>
                            </div></a>
                            <a href="#"> 
                            <div class="typeaccountlogin" id="radiologintype2">
                                 <input class="radiotypelogin" id="radiotypelogin2" name="radiotypelogin" type="radio">
                                 <div class="clacc">Business</div>
                            </div></a>
                    </div>
                  
                  
                  
	                    <input class="input" id="us" type="text" placeholder=" Email ose numer telefoni ">
	                    <div class="namediv">
	                    <img src="images/email2.png">
	                    </div>
	                    <br><br>
		                <input class="inputsubmit" name="inputsubmit" id="submi" type="submit" value="Next Client"><br><br>
	                    <div class="imgfb"><?php echo $outp; ?></div><br>
	              
	           </div>
	            </center>
            </div>
            <div class="sing2" id="sing" ><!-- start sing up -->
   	            <center> <div class="clientaccount">Client Account</div></center>
   	            <center><div class="steps"><!-- start sing up bussinnes-->
   	                       <div class="bussinness">Business Account</div>
   	            	       <div class="step1"><div class="b">Business</div></div>
   	            	       <div class="step2"><div class="s" >Setup</div></div>
   	            	       <div class="step3"><div class="v" >Verify</div></div>
   	                   </div>
   	            </center>
                <br>
                <center>
                <div class="bussinnes"> <!--  start choose  sing up bussinnes ore client-->
                    <div class="typeaccount">
                            <a href="#"> 
                            <div class="clientacc" id="radio1">
                               <input class="radio" id="rad1" name="radioacount" type="radio">
                               <div class="clacc">Client</div>
                            </div></a>
                            <a href="#"> 
                            <div class="clientacc" id="radio2">
                                 <input class="radio" id="rad2" name="radioacount" type="radio">
                                 <div class="clacc">Business</div>
                            </div></a>
                    </div> <!-- start these input are for both create account  first step for both-->
                    <input class="input2" id="name" type="text" placeholder="Your Name ">
                    <div class="namediv">
                    <img src="images/name.png">
                    </div>
                    <br><br>
                    <input class="input2" id="email" type="text" placeholder="Email ">
                    <div class="namediv">
                    <img src="images/email2.png">
                    </div>
                    <br><br>
	                <input class="input2" id="password" type="password" placeholder="Password ">
                    <div class="namediv">
                    <img src="images/key.png">
                    </div>
                    <br><br>
	                <input class="inputsubmit2" name="inputsubmit2" id="register" type="submit" value="Register Client"><br><br>
                   
	                <br>
	            </div>
	            </center>
	            <div class="setup"> <!-- start if choose create bussines second step  setup -->
                <center>
	             	<select class="inpu" name="industry" > <!-- start type of industry-->
                        <option value="0"> Select Industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                    </select>
                    <div class="namediv">
                    <img src="images/name.png">
                    </div>
                    <br><br>
                    <input class="inpu" id="email" type="text" placeholder=" Street Adress ">
                    <div class="namediv">
                    <img src="images/street.png">
                    </div>
                    <br><br>
                    <input class="inpu" id="in" type="text" placeholder="City ">
                    <div class="namediv">
                    <img src="images/city.png">
                    </div><br><br>
                    <select class="inpu" id="in" name="industry">  <!-- start choose of nationality-->
                        <option value="0" style="color:#848C91;"> Select State</option>
                        <option value="Afghanistan" title="Afghanistan">Afghanistan</option>
					    <option value="Åland Islands" title="Åland Islands">Åland Islands</option>
					    <option value="Albania" title="Albania">Albania</option>
					    <option value="Algeria" title="Algeria">Algeria</option>
					    <option value="American Samoa" title="American Samoa">American Samoa</option>
					    <option value="Andorra" title="Andorra">Andorra</option>
					    <option value="Angola" title="Angola">Angola</option>
					    <option value="Anguilla" title="Anguilla">Anguilla</option>
					    <option value="Antarctica" title="Antarctica">Antarctica</option>
					    <option value="Antigua and Barbuda" title="Antigua and Barbuda">Antigua and Barbuda</option>
					    <option value="Argentina" title="Argentina">Argentina</option>
					    <option value="Armenia" title="Armenia">Armenia</option>
					    <option value="Aruba" title="Aruba">Aruba</option>
					    <option value="Australia" title="Australia">Australia</option>
					    <option value="Austria" title="Austria">Austria</option>
					    <option value="Azerbaijan" title="Azerbaijan">Azerbaijan</option>
					    <option value="Bahamas" title="Bahamas">Bahamas</option>
					    <option value="Bahrain" title="Bahrain">Bahrain</option>
					    <option value="Bangladesh" title="Bangladesh">Bangladesh</option>
					    <option value="Barbados" title="Barbados">Barbados</option>
					    <option value="Belarus" title="Belarus">Belarus</option>
					    <option value="Belgium" title="Belgium">Belgium</option>
					    <option value="Belize" title="Belize">Belize</option>
					    <option value="Benin" title="Benin">Benin</option>
					    <option value="Bermuda" title="Bermuda">Bermuda</option>
					    <option value="Bhutan" title="Bhutan">Bhutan</option>
					    <option value="Bolivia, Plurinational State of" title="Bolivia, Plurinational State of">Bolivia, Plurinational State of</option>
					    <option value="Bonaire, Sint Eustatius and Saba" title="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</optio>
					    <option value="Bosnia and Herzegovina" title="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
					    <option value="Botswana" title="Botswana">Botswana</option>
					    <option value="Bouvet Island" title="Bouvet Island">Bouvet Island</option>
					    <option value="Brazil" title="Brazil">Brazil</option>
					    <option value="British Indian Ocean Territory" title="British Indian Ocean Territory">British Indian Ocean Territory</option>
					    <option value="Brunei Darussalam" title="Brunei Darussalam">Brunei Darussalam</option>
					    <option value="Bulgaria" title="Bulgaria">Bulgaria</option>
					    <option value="Burkina Faso" title="Burkina Faso">Burkina Faso</option>
					    <option value="Burundi" title="Burundi">Burundi</option>
					    <option value="Cambodia" title="Cambodia">Cambodia</option>
					    <option value="Cameroon" title="Cameroon">Cameroon</option>
					    <option value="Canada" title="Canada">Canada</option>
					    <option value="Cape Verde" title="Cape Verde">Cape Verde</option>
					    <option value="Cayman Islands" title="Cayman Islands">Cayman Islands</option>
					    <option value="Central African Republic" title="Central African Republic">Central African Republic</option>
					    <option value="Chad" title="Chad">Chad</option>
					    <option value="Chile" title="Chile">Chile</option>
					    <option value="China" title="China">China</option>
					    <option value="Christmas Island" title="Christmas Island">Christmas Island</option>
					    <option value="Cocos (Keeling) Islands" title="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
					    <option value="Colombia" title="Colombia">Colombia</option>
					    <option value="Comoros" title="Comoros">Comoros</option>
					    <option value="Congo" title="Congo">Congo</option>
					    <option value="Congo, the Democratic Republic of the" title="Congo, the Democratic Republic of the">Congo, the Democratic Republic of the</option>
					    <option value="Cook Islands" title="Cook Islands">Cook Islands</option>
					    <option value="Costa Rica" title="Costa Rica">Costa Rica</option>
					    <option value="Côte d'Ivoire" title="Côte d'Ivoire">Côte d'Ivoire</option>
					    <option value="Croatia" title="Croatia">Croatia</option>
					    <option value="Cuba" title="Cuba">Cuba</option>
					    <option value="Curaçao" title="Curaçao">Curaçao</option>
					    <option value="Cyprus" title="Cyprus">Cyprus</option>
					    <option value="Czech Republic" title="Czech Republic">Czech Republic</option>
					    <option value="Denmark" title="Denmark">Denmark</option>
					    <option value="Djibouti" title="Djibouti">Djibouti</option>
					    <option value="Dominica" title="Dominica">Dominica</option>
					    <option value="Dominican Republic" title="Dominican Republic">Dominican Republic</option>
					    <option value="Ecuador" title="Ecuador">Ecuador</option>
					    <option value="Egypt" title="Egypt">Egypt</option>
					    <option value="El Salvador" title="El Salvador">El Salvador</option>
					    <option value="Equatorial Guinea" title="Equatorial Guinea">Equatorial Guinea</option>
					    <option value="Eritrea" title="Eritrea">Eritrea</option>
					    <option value="Estonia" title="Estonia">Estonia</option>
					    <option value="Ethiopia" title="Ethiopia">Ethiopia</option>
					    <option value="Falkland Islands (Malvinas)" title="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
					    <option value="Faroe Islands" title="Faroe Islands">Faroe Islands</option>
					    <option value="Fiji" title="Fiji">Fiji</option>
					    <option value="Finland" title="Finland">Finland</option>
					    <option value="France" title="France">France</option>
					    <option value="French Guiana" title="French Guiana">French Guiana</option>
					    <option value="French Polynesia" title="French Polynesia">French Polynesia</option>
					    <option value="French Southern Territories" title="French Southern Territories">French Southern Territories</option>
					    <option value="Gabon" title="Gabon">Gabon</option>
					    <option value="Gambia" title="Gambia">Gambia</option>
					    <option value="Georgia" title="Georgia">Georgia</option>
					    <option value="Germany" title="Germany">Germany</option>
					    <option value="Ghana" title="Ghana">Ghana</option>
					    <option value="Gibraltar" title="Gibraltar">Gibraltar</option>
					    <option value="Greece" title="Greece">Greece</option>
					    <option value="Greenland" title="Greenland">Greenland</option>
					    <option value="Grenada" title="Grenada">Grenada</option>
					    <option value="Guadeloupe" title="Guadeloupe">Guadeloupe</option>
					    <option value="Guam" title="Guam">Guam</option>
					    <option value="Guatemala" title="Guatemala">Guatemala</option>
					    <option value="Guernsey" title="Guernsey">Guernsey</option>
					    <option value="Guinea" title="Guinea">Guinea</option>
					    <option value="Guinea-Bissau" title="Guinea-Bissau">Guinea-Bissau</option>
					    <option value="Guyana" title="Guyana">Guyana</option>
					    <option value="Haiti" title="Haiti">Haiti</option>
					    <option value="Heard Island and McDonald Islands" title="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
					    <option value="Holy See (Vatican City State)" title="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
					    <option value="Honduras" title="Honduras">Honduras</option>
					    <option value="Hong Kong" title="Hong Kong">Hong Kong</option>
					    <option value="Hungary" title="Hungary">Hungary</option>
					    <option value="Iceland" title="Iceland">Iceland</option>
					    <option value="India" title="India">India</option>
					    <option value="Indonesia" title="Indonesia">Indonesia</option>
					    <option value="Iran, Islamic Republic of" title="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
					    <option value="Iraq" title="Iraq">Iraq</option>
					    <option value="Ireland" title="Ireland">Ireland</option>
					    <option value="Isle of Man" title="Isle of Man">Isle of Man</option>
					    <option value="Israel" title="Israel">Israel</option>
					    <option value="Italy" title="Italy">Italy</option>
					    <option value="Jamaica" title="Jamaica">Jamaica</option>
					    <option value="Japan" title="Japan">Japan</option>
					    <option value="Jersey" title="Jersey">Jersey</option>
					    <option value="Jordan" title="Jordan">Jordan</option>
					    <option value="Kazakhstan" title="Kazakhstan">Kazakhstan</option>
					    <option value="Kenya" title="Kenya">Kenya</option>
					    <option value="Kiribati" title="Kiribati">Kiribati</option>
					    <option value="Korea, Democratic People's Republic of" title="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
					    <option value="Korea, Republic of" title="Korea, Republic of">Korea, Republic of</option>
					    <option value="Kuwait" title="Kuwait">Kuwait</option>
					    <option value="Kyrgyzstan" title="Kyrgyzstan">Kyrgyzstan</option>
					    <option value="Lao People's Democratic Republic" title="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
					    <option value="Latvia" title="Latvia">Latvia</option>
					    <option value="Lebanon" title="Lebanon">Lebanon</option>
					    <option value="Lesotho" title="Lesotho">Lesotho</option>
					    <option value="Liberia" title="Liberia">Liberia</option>
					    <option value="Libya" title="Libya">Libya</option>
					    <option value="Liechtenstein" title="Liechtenstein">Liechtenstein</option>
					    <option value="Lithuania" title="Lithuania">Lithuania</option>
					    <option value="Luxembourg" title="Luxembourg">Luxembourg</option>
					    <option value="Macao" title="Macao">Macao</option>
					    <option value="Macedonia, the former Yugoslav Republic of" title="Macedonia, the former Yugoslav Republic of">Macedonia, the former Yugoslav Republic of</option>
					    <option value="Madagascar" title="Madagascar">Madagascar</option>
					    <option value="Malawi" title="Malawi">Malawi</option>
					    <option value="Malaysia" title="Malaysia">Malaysia</option>
					    <option value="Maldives" title="Maldives">Maldives</option>
					    <option value="Mali" title="Mali">Mali</option>
					    <option value="Malta" title="Malta">Malta</option>
					    <option value="Marshall Islands" title="Marshall Islands">Marshall Islands</option>
					    <option value="Martinique" title="Martinique">Martinique</option>
					    <option value="Mauritania" title="Mauritania">Mauritania</option>
					    <option value="Mauritius" title="Mauritius">Mauritius</option>
					    <option value="Mayotte" title="Mayotte">Mayotte</option>
					    <option value="Mexico" title="Mexico">Mexico</option>
					    <option value="Micronesia, Federated States of" title="Micronesia, Federated States of">Micronesia, Federated States of</option>
					    <option value="Moldova, Republic of" title="Moldova, Republic of">Moldova, Republic of</option>
					    <option value="Monaco" title="Monaco">Monaco</option>
					    <option value="Mongolia" title="Mongolia">Mongolia</option>
					    <option value="Montenegro" title="Montenegro">Montenegro</option>
					    <option value="Montserrat" title="Montserrat">Montserrat</option>
					    <option value="Morocco" title="Morocco">Morocco</option>
					    <option value="Mozambique" title="Mozambique">Mozambique</option>
					    <option value="Myanmar" title="Myanmar">Myanmar</option>
					    <option value="Namibia" title="Namibia">Namibia</option>
					    <option value="Nauru" title="Nauru">Nauru</option>
					    <option value="Nepal" title="Nepal">Nepal</option>
					    <option value="Netherlands" title="Netherlands">Netherlands</option>
					    <option value="New Caledonia" title="New Caledonia">New Caledonia</option>
					    <option value="New Zealand" title="New Zealand">New Zealand</option>
					    <option value="Nicaragua" title="Nicaragua">Nicaragua</option>
					    <option value="Niger" title="Niger">Niger</option>
					    <option value="Nigeria" title="Nigeria">Nigeria</option>
					    <option value="Niue" title="Niue">Niue</option>
					    <option value="Norfolk Island" title="Norfolk Island">Norfolk Island</option>
					    <option value="Northern Mariana Islands" title="Northern Mariana Islands">Northern Mariana Islands</option>
					    <option value="Norway" title="Norway">Norway</option>
					    <option value="Oman" title="Oman">Oman</option>
					    <option value="Pakistan" title="Pakistan">Pakistan</option>
					    <option value="Palau" title="Palau">Palau</option>
					    <option value="Palestinian Territory, Occupied" title="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
					    <option value="Panama" title="Panama">Panama</option>
					    <option value="Papua New Guinea" title="Papua New Guinea">Papua New Guinea</option>
					    <option value="Paraguay" title="Paraguay">Paraguay</option>
					    <option value="Peru" title="Peru">Peru</option>
					    <option value="Philippines" title="Philippines">Philippines</option>
					    <option value="Pitcairn" title="Pitcairn">Pitcairn</option>
					    <option value="Poland" title="Poland">Poland</option>
					    <option value="Portugal" title="Portugal">Portugal</option>
					    <option value="Puerto Rico" title="Puerto Rico">Puerto Rico</option>
					    <option value="Qatar" title="Qatar">Qatar</option>
					    <option value="Réunion" title="Réunion">Réunion</option>
					    <option value="Romania" title="Romania">Romania</option>
					    <option value="Russian Federation" title="Russian Federation">Russian Federation</option>
					    <option value="Rwanda" title="Rwanda">Rwanda</option>
					    <option value="Saint Barthélemy" title="Saint Barthélemy">Saint Barthélemy</option>
					    <option value="Saint Helena, Ascension and Tristan da Cunha" title="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option>
					    <option value="Saint Kitts and Nevis" title="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
					    <option value="Saint Lucia" title="Saint Lucia">Saint Lucia</option>
					    <option value="Saint Martin (French part)" title="Saint Martin (French part)">Saint Martin (French part)</option>
					    <option value="Saint Pierre and Miquelon" title="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
					    <option value="Saint Vincent and the Grenadines" title="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
					    <option value="Samoa" title="Samoa">Samoa</option>
					    <option value="San Marino" title="San Marino">San Marino</option>
					    <option value="Sao Tome and Principe" title="Sao Tome and Principe">Sao Tome and Principe</option>
					    <option value="Saudi Arabia" title="Saudi Arabia">Saudi Arabia</option>
					    <option value="Senegal" title="Senegal">Senegal</option>
					    <option value="Serbia" title="Serbia">Serbia</option>
					    <option value="Seychelles" title="Seychelles">Seychelles</option>
					    <option value="Sierra Leone" title="Sierra Leone">Sierra Leone</option>
					    <option value="Singapore" title="Singapore">Singapore</option>
					    <option value="Sint Maarten (Dutch part)" title="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>
					    <option value="Slovakia" title="Slovakia">Slovakia</option>
					    <option value="Slovenia" title="Slovenia">Slovenia</option>
					    <option value="Solomon Islands" title="Solomon Islands">Solomon Islands</option>
					    <option value="Somalia" title="Somalia">Somalia</option>
					    <option value="South Africa" title="South Africa">South Africa</option>
					    <option value="South Georgia and the South Sandwich Islands" title="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
					    <option value="South Sudan" title="South Sudan">South Sudan</option>
					    <option value="Spain" title="Spain">Spain</option>
					    <option value="Sri Lanka" title="Sri Lanka">Sri Lanka</option>
					    <option value="Sudan" title="Sudan">Sudan</option>
					    <option value="Suriname" title="Suriname">Suriname</option>
					    <option value="Svalbard and Jan Mayen" title="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
					    <option value="Swaziland" title="Swaziland">Swaziland</option>
					    <option value="Sweden" title="Sweden">Sweden</option>
					    <option value="Switzerland" title="Switzerland">Switzerland</option>
					    <option value="Syrian Arab Republic" title="Syrian Arab Republic">Syrian Arab Republic</option>
					    <option value="Taiwan, Province of China" title="Taiwan, Province of China">Taiwan, Province of China</option>
					    <option value="Tajikistan" title="Tajikistan">Tajikistan</option>
					    <option value="Tanzania, United Republic of" title="Tanzania, United Republic of">Tanzania, United Republic of</option>
					    <option value="Thailand" title="Thailand">Thailand</option>
					    <option value="Timor-Leste" title="Timor-Leste">Timor-Leste</option>
					    <option value="Togo" title="Togo">Togo</option>
					    <option value="Tokelau" title="Tokelau">Tokelau</option>
					    <option value="Tonga" title="Tonga">Tonga</option>
					    <option value="Trinidad and Tobago" title="Trinidad and Tobago">Trinidad and Tobago</option>
					    <option value="Tunisia" title="Tunisia">Tunisia</option>
					    <option value="Turkey" title="Turkey">Turkey</option>
					    <option value="Turkmenistan" title="Turkmenistan">Turkmenistan</option>
					    <option value="Turks and Caicos Islands" title="Turks and Caicos Islands">Turks and Caicos Islands</option>
					    <option value="Tuvalu" title="Tuvalu">Tuvalu</option>
					    <option value="Uganda" title="Uganda">Uganda</option>
					    <option value="Ukraine" title="Ukraine">Ukraine</option>
					    <option value="United Arab Emirates" title="United Arab Emirates">United Arab Emirates</option>
					    <option value="United Kingdom" title="United Kingdom">United Kingdom</option>
					    <option value="United States" title="United States">United States</option>
					    <option value="United States Minor Outlying Islands" title="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
					    <option value="Uruguay" title="Uruguay">Uruguay</option>
					    <option value="Uzbekistan" title="Uzbekistan">Uzbekistan</option>
					    <option value="Vanuatu" title="Vanuatu">Vanuatu</option>
					    <option value="Venezuela, Bolivarian Republic of" title="Venezuela, Bolivarian Republic of">Venezuela, Bolivarian Republic of</option>
					    <option value="Viet Nam" title="Viet Nam">Viet Nam</option>
					    <option value="Virgin Islands, British" title="Virgin Islands, British">Virgin Islands, British</option>
					    <option value="Virgin Islands, U.S." title="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
					    <option value="Wallis and Futuna" title="Wallis and Futuna">Wallis and Futuna</option>
					    <option value="Western Sahara" title="Western Sahara">Western Sahara</option>
					    <option value="Yemen" title="Yemen">Yemen</option>
					    <option value="Zambia" title="Zambia">Zambia</option>
					    <option value="Zimbabwe" title="Zimbabwe">Zimbabwe</option>
                    </select>
                    <div class="namediv">
                    <img src="images/country.png">
                    </div><br><br>
                      <input class="inpu" id="in" type="tel" placeholder="Phone number ">
                    <div class="namediv">
                    <img src="images/number.png">
                    </div><br><br>

                    
                    <input class="inputsubmit3" name="inputs" id="su" type="submit" value="Next Setup">
                    </center><br><br>

	           </div>
	             <div class="verify"> <!-- here choose type of verify your account email or phone-->
	             	 <div class="choseforget">
                        <center> <h2>"Choose type for Verify"</h2></center><br>
                            <a href="#">
                                <div class="verifyclick" id="radioforget1">
                                    <div class="position">
                                        <input type="radio" name="vf" class="radioverify1" id="radioforget">
                                        <div class="emailkompani"></div>
                                    </div>
                                    <div class="named"><img src="images/email2.png">
                                    </div>
                                </div><br>
                            </a>
                            <a href="#">
                                <div class="verifyclick" id="radioforget2">
                                    <div class="position2">
                                         <input type="radio" name="vf" class="radioverify2" id="radioforget"><div class="telkompani"></div>
                                    </div>
                                    <div class="named"><img src="images/phone.png">
                                    </div>
                                </div>
                            </a>
                        <br>
                        <center>
                        <input class="buttonverify" id="sub" type="submit" value="Send Code"><br><br>
                        </center>
                    </div>
                    <div class="Codeverify"> <!--  when user put data currectly, now looking from system verify your account -->
                        <center>
                         <h2>"We send you the code"</h2><br>
                                    <input class="inpucode" id="in" type="tel" placeholder="Put the code please ">
                                    <div class="namediv">
				                    <img src="images/key.png">
				                    </div><br><br>
				                    <input class="submitcode" id="sub" type="submit" value="Finish Verify"><br><br>
                         </center>
                            
                    </div>
                </div>
	        </div>
            <div class="next"> <!-- here looking password your account when user put email currectly -->
               <center>
                    <div class="name" style="display: inline-block;"></div> <div class="last" style="display: inline-block;"></div><br>
                    <div class="em"></div><br><br>
                    <input class="valpass" id="us" type="password" placeholder="Password ">
                    <div class="namediv">
                        <img src="images/key.png">
                    </div>
                    <br><br>
	                <input class="btnlogin" id="login" type="submit" value="Login"><br><br><br>
                </center>
            </div>
        </div>
            <div class="choosetypeforget">
               <center>
                     <div class="name" style="display: inline-block;"></div> <div class="last" style="display: inline-block;"></div>
                </center> 
                    
                 
	                <div class="choseforget">
	                   <center> <h2>"Choose type forget password"</h2></center><br>
	                  <a href="#">
	                	<div class="forgetclick" id="radioforgett1">
	                	   <div class="position">
	                	   <input type="radio" name="radio" class="radioforgett1" id="radioforget"><div class="emm"></div>
                       
                         

                           </div>
                            <div class="named"><img src="images/email2.png"></div>
	                	</div><br></a>
	                  <a href="#">
                        <div class="forgetclick" id="radioforgett2">
                            <div class="position2">
                           <input type="radio" name="radio" class="radioforgett2" id="radioforget"><div class="phone"></div>
                            
                           </div>
                           <div class="named"><img src="images/phone.png"></div>
                        </div></a>
                        <br>
                        <center>
                        <input class="buttonforgetdb" id="sub" type="submit" value="Forget password"><br><br>
                        </center>
	                </div>
	            
            </div>
             <div class="putconfirmcode">
                 <center>
                    <div class="name" style="display: inline-block;"></div> <div class="last" style="display: inline-block;"></div><br>
                    <div class="emmm"></div><br>     
                 	<div class="sms">"Check your E-mail for code 6 digit"</div><br>

                 	<input class="codeconfi" type="text" name="condeconfirm" placeholder="Enter Confirm Code"><div class="namediv"><img src="images/key.png"></div>
                    </center><br>
                 	<center><input class="btnconfirm" id="sub" type="submit" value=" Send Confirm Code"></center><br>
                </center> 
                    <br>
                 
	               
	            
            </div>
            <center><div class="error"></div></center>


        </div><br><br>
        
            
       </div>
 

</body>
</html>


