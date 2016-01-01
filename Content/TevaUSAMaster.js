var searchPageUrl = "";

function slideSwitch() {
    var $active = $('#slideshow IMG.active');
    if ($active.length == 0) $active = $('#slideshow IMG:last');
    var $next = $active.next().length ? $active.next()
        : $('#slideshow IMG:first');
    $active.addClass('last-active');
    $next.css({ opacity: 0.0 })
        .addClass('active')
        .animate({ opacity: 1.0 }, 1000, function () {
            $active.removeClass('active last-active');
        });
}


// get the pagename 
function onPage(name) {
    var path = window.location.pathname;
    return name == path.substring(path.lastIndexOf('/') + 1);
}


$(document).ready(function () {

    $('.fancybox').fancybox();


    //$(window).bind('resize', function () {
    //    var top = ($(window).height() / 2) - ($(".fancybox-wrap").outerHeight() / 2);
    //    var left = ($(window).width() / 2) - ($(".fancybox-wrap").outerWidth() / 2);
    //    $(".fancybox-wrap").css({ top: top, left: left });
    //}).trigger('resize');



    $('#errmessage').hide();
    setNavigationActive();

    setInterval("slideSwitch()", 10000); /* 10 seconds for development */

    // set the path for the Search results page 
    searchPageUrl = 'Search.aspx';

    // Hide default button Button2 
    $("#Button2").hide();

    // hide all the validation error messages
    $('[id^="err"]').hide();

    // Social icons on tablet
    $("#tabletSocial").click(function () {
        $('#social').toggle("slow");

    });

    /* slideshow on secondary landing pages */
    $('.quotefloat').bjqs({
        'randomstart': true,
        'responsive': false,
        'nexttext': '<img src="../../Images/Callout1.0/right-arrow.png">',
        'prevtext': '<img src="../../Images/Callout1.0/left-arrow.png">',
        'automatic': false
    });

    /*Slideshow on Default Page */
    var carousel = $("#carousel").waterwheelCarousel({
        flankingItems: 1,
        autoPlay: 10,
        speed: 5000,
        edgeFadeEnabled: true,
        separation: 150,
        animationEasing: 'swing'

    });

    $('#prev').bind('click', function () {
        carousel.prev();
        return false
    });

    $('#next').bind('click', function () {
        carousel.next();
        return false;

    });


});

function setNavigationActive() {

    var locationHref = window.location.href.toLowerCase();
    var pageName = locationHref.substring(locationHref.lastIndexOf('/') + 1);

    switch (pageName) {
        case "company.aspx":
        case "tevaglobal.aspx":
        case "visionvalues.aspx":
        case "history.aspx":
        case "specialtyareas.aspx":
        case "cns.aspx":
        case "oncology.aspx":
        case "respiratory.aspx":
        case "selectbrands.aspx":
        case "womenshealth.aspx":
        case "govtaffairs.aspx":
        case "contact.aspx":
            $("#A1").addClass("active");
            break;
        case "medicines.aspx":
        case "specialtymedicines.aspx":
        case "genericmedicines.aspx":
        case "medicalaffairs.aspx":
        case "medicalinformation.aspx":
        case "medicaleducation.aspx":
        case "qualitysafety.aspx":
        case "tradepartners.aspx":
        case "returngoodspolicy.aspx":
        case "termsconditions.aspx":
        case "adrproducts.aspx":
            $("#A2").addClass("active");
            break;
        case "responsibility.aspx":
        case "corpsocialresponsibility.aspx":
        case "corpcharitabledonations.aspx":
        case "accesstomedicine.aspx":
        case "volunteerism.aspx":
        case "advocacy.aspx":
        case "compliance.aspx":
        case "relationships.aspx":
            $("#A3").addClass("active");
            break;
        case "careers.aspx":
        case "careersfaq.aspx":
        case "tevaexperience.aspx":
        case "employeetestimonials.aspx":
            $("#A4").addClass("active");
            break;




    }
}



// Count number of char in question field used in career search
function textCounter(field) {
    if (field.value.length > 500) {
        field.value = field.value.substring(0, 500);
        alert("Please limit your comment to 500 characters");
    }
}

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var phoneRegex = /^(\d{3})[- .](\d{3})[- .](\d{4})$/;
var zipCodeRegex = /^(\d{5})(-\d{4})?$/;
var errorCount = 0;


// validation for contact form


function ValidateEmailField(objId, labelId) {
    $(objId).val($.trim($(objId).val()));
    var email = $(objId).val();
    if (!emailRegex.test(email)) {
        errorCount++;
        $(labelId).addClass('error');
        $(labelId).show();
        return false;
    }

    return true;
}
function ValidateRequiredFieldDropDown(objId, labelId) {
    if ($(objId).val() == "-1") {
        errorCount++;
        $(labelId).addClass('error');
        $(labelId).show();
        return false;
    }
    return true;
}

function ValidateRequiredField(objId, labelId) {
    $(objId).val($.trim($(objId).val()));

    if ($(objId).val() == "") {
        errorCount++;
        $(labelId).addClass('error');
        $(labelId).show();
        return false;
    }
    return true;
}

function ValidateZipCodeField(objId, labelId) {
    //alert('ValidateZipCodeField');
    $(objId).val($.trim($(objId).val()));

    var zipCode = $(objId).val();

    if (zipCode != "") {
        if (!zipCodeRegex.test(zipCode)) {
            errorCount++;
            $(labelId).addClass('error');
            $(labelId).show();
            return false;
        }
    }
    // alert('true');
    return true;
}
function ValidatePhoneField(objId, labelId) {
    // alert('ValidatePhoneField');
    var phone = $.trim($(objId).val());

    if (phone == "")
        return true;

    phone = phone.replace(/ /g, "-").replace(/\./g, "-");

    if (!phoneRegex.test(phone)) {
        errorCount++;
        $(labelId).addClass('error');
        $(labelId).show();
        return false;
    }
    //alert('true');
    $(objId).val(phone);
    return true;
}

function ValidateContactForm() {
    //alert('validation');
    ResetValidation();
    ValidateRequiredFieldDropDown("#ddArea", "#errddArea");
    ValidateRequiredField("#txtFname", "#errtxtFname");
    ValidateRequiredField("#txtLname", "#errtxtLname");
    ValidateRequiredField("#txtAddress1", "#errAddress1");
    ValidateRequiredField("#txtCity", "#errtxtCity");
    ValidateRequiredFieldDropDown("#ddlState", "#errddlState");
    ValidateRequiredField("#txtzip", "#errtxtzip");
    ValidateRequiredFieldDropDown("#ddlCountry", "#errddlCountry");
    ValidateRequiredField("#txtPhone", "#errtxtPhone");
    ValidateRequiredField("#txtEmail", "#errtxtEmail");
    ValidateRequiredFieldDropDown("#ddYourself", "#errddYourself");

    ValidateEmailField("#txtEmail", "#errtxtEmail");
    ValidateZipCodeField("#txtzip", "#errtxtzip");
    ValidatePhoneField("#txtPhone", "#errtxtPhone");


    if (errorCount > 0) {// alert('final false');
        return false;
    }
    else {
        //alert('final true'); 
        window.scrollTo(0, 200);
        return true;
    }
}

function ResetValidation() {
    // alert('reset');
    errorCount = 0;
    $('[id^="err"]').hide();
    $("#errddArea").removeClass('error');
    $("#errtxtFname").removeClass('error');
    $("#errtxtLname").removeClass('error');
    $("#errAddress1").removeClass('error');
    $("#errtxtCity").removeClass('error');
    $("#errddlState").removeClass('error');
    $("#errtxtzip").removeClass('error');
    $("#errddlCountry").removeClass('error');
    $("#errtxtPhone").removeClass('error');
    $("#errtxtEmail").removeClass('error');
    $("#errddYourself").removeClass('error');


}




// Product Information request validation

// Check all the required fields for Product Information Request

//Validate EmailAddress

function validateEmailAddress() {
    var retFlag = false;
    $("#errMsg").html("");

    retFlag = isValidEmailAddress($("#Txtemail").val());

    if (retFlag == true) {
        if ($("#Txtemail").val() != $("#Txtverifyemail").val()) {
            $("#errMsg").html("Please check - the email address and confirm email address don't match.");
            $("#errMsg").show();
            retFlag = false;
        }
    }
    else {
        $("#errMsg").html("Please enter a valid email address ");
        $("#errMsg").show();
    }

    return retFlag;
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};


function checkProductRequiredField() {
    //  alert('in');
    var retFlag = true;

    $("[id^=Txt]").each(function () {
        var lblId = $(this).attr('ID').replace("Txt", "lbl");
        $("#" + lblId).css('color', '#696969');

        if ($(this).val().length == 0) {
            $("#" + lblId).css('color', '#FF0000');
            //  $("#" + lblId).focus();

            retFlag = false;
        }

    });


    $("#lblProduct").css('color', '#696969');
    if ($("#ddProduct").val() == "-1") {
        $("#lblProduct").css('color', '#FF0000'); retFlag = false;
    }

    $("#lblGreeting").css('color', '#696969');
    if ($("#ddGreeting").val() == "-1") {
        $("#lblGreeting").css('color', '#FF0000'); retFlag = false;
    }

    $("#lblDegree").css('color', '#696969');
    if ($("#ddDegree").val() == "-1") {
        $("#lblDegree").css('color', '#FF0000'); retFlag = false;
    }

    $("#lblMethod").css('color', '#696969');
    if ($("#ddMethod").val() == "-1") {
        $("#lblMethod").css('color', '#FF0000'); retFlag = false;
    }

    $("#lblconfirm").css('color', '#696969');
    if ($("#ddconfirm").val() == "-1") {
        $("#lblconfirm").css('color', '#FF0000'); retFlag = false;
    }

    if ($("#ddcountry").val() == "US") {
        $("#lblstate").css('color', '#696969');
        if ($("#ddstate").val() == "-1") {
            $("#lblstate").css('color', '#FF0000'); retFlag = false;
        }
    }

    return retFlag;
}

function ValidateZipCode(objId, labelId) {
  //  alert('Validatezip');
    // $(objId).val($.trim($(objId).val()));
    var zipCode = $(objId).val();
    var country = $('#ddcountry :selected').val();
    var zipRegex = "";
    $(labelId).css('color', '#696969');
    switch (country) {
        case "US":
            zipRegex = /^(\d{5})(-\d{4})?$/;
            break;
        case "CA":
            zipRegex = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/;
            break;
        case "GB":
            zipRegex = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;
            break;
    }
    //alert(zipRegex);
    if (zipRegex != "") {
        if (!zipRegex.test(zipCode)) {
            errorCount++;
            $(labelId).css('color', '#FF0000');
            return false;
        }
    }
    else
    {
        if(zipCode == "")
        {
            errorCount++;
            $(labelId).css('color', '#FF0000');
            return false;
        }
        
    }
         //   if (!zipCodeRegex.test(zipCode)) {
         ////     alert('invalidzip');
         //   errorCount++;
         //   $(labelId).css('color', '#FF0000');
         //   return false;
      
   
    //alert('true');
    return true;
}

function ValidatePhone(objId, labelId) {
  //  alert('ValidatePhoneField');
    $(labelId).css('color', '#696969');
    var phone = $.trim($(objId).val());
    if (/\(?\b[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}\b/.test(phone)) {
        phone = phone.replace(/[\. ,:-]+/g, "");
        //alert(phone);
        $(objId).val(phone);
        return true;
    }
    else {
        errorCount++;
        $(labelId).css('color', '#FF0000');
        return false;
    }

}


function ValidateProductForm() {
    $('#errmessage').hide();
    var retFlag, status, status_email, status_zip = true;
    status = checkProductRequiredField();
    status_email = validateEmailAddress();
    status_zip = ValidateZipCode("#Txtzip","#lblzip");
    status_phone = ValidatePhone("#TxtPhone", "#lblPhone");
    if (status & status_email & status_zip & status_phone) {
        window.scrollTo(0, 200);
        retFlag = true;
    }
    else {
        window.scrollTo(0, 200);
        $('#errmessage').show();
        retFlag = false;
    }

    return retFlag;
}

$(document).ready(function () {

    $("#ddcountry").change(function () {
     //  alert('hi');
        var selectedvalue = $('#ddcountry :selected').val();
     //   alert(selectedvalue);
        if (selectedvalue != "US") {
            $('#State').hide().css({ 'visibility': 'hidden', 'display': 'none' });
        }
        else {
            $('#State').show().css({ 'visibility': 'visible', 'display': 'block' });
        }
    });



});