

$( document ).ajaxComplete(function(event, request) {
    var location = request.getResponseHeader("location");
    if (request.status === 278 && location !== undefined) {
        window.location.href = location;
    }
});
$.ajaxSetup({
    headers: {"X-WebUI-Header": "AjaxRequest"}
});

var data = [
    {
        menuId: "1",
        itemUrl: "img/menu3.jpg",
        item: {
            itemId: "1",
            itemName: "palak parantha",
            itemDiscription: "2 hot paranthas served with fresh white butter, mint chutney &amp; ketchup.",
            itemPrice: "INR 60"
        }
    },
    {
        menuId: "2",
        item: {
            itemId: "2",
            itemName: "palak parantha",
            itemDiscription: "2 hot paranthas served with fresh white butter, mint chutney &amp; ketchup.",
            itemPrice: "INR 60"
        }
    },
    {
        menuId: "3",
        item: {
            itemId: "3",
            itemName: "palak parantha",
            itemDiscription: "2 hot paranthas served with fresh white butter, mint chutney &amp; ketchup.",
            itemPrice: "INR 60"
        }
    },
    {
        menuId: "4",
        item: {
            itemId: "4",
            itemName: "palak parantha",
            itemDiscription: "2 hot paranthas served with fresh white butter, mint chutney &amp; ketchup.",
            itemPrice: "INR 60"
        }
    }
];


var menuDisplayData = function (dataValue, containerId) {

    Object.keys(dataValue)
        .map(function (key) {
            var menuInner = document.getElementById('menuId');
            var colInner = document.createElement('div');
            colInner.className = 'col-md-6 col-sm-3 col-xs-12'
            colInner.id = 'colId' + key;
            menuInner.appendChild(colInner);

            var imageThumb = document.getElementById('colId' + key);
            var imageThumbAddition = document.createElement('div');
            imageThumbAddition.className = 'menu-thumb';
            imageThumbAddition.id = 'menuImage' + key;
            imageThumb.appendChild(imageThumbAddition);

            var imageInner = document.getElementById('menuImage' + key);
            var imageAddition = document.createElement('img');
            imageAddition.className = "img-responsive";
            imageAddition.src = 'img/menu' + key + '.jpg';
            imageAddition.alt = "menu img";
            imageAddition.id = "image" + key;
            imageInner.appendChild(imageAddition);

            var menuOverlay = document.getElementById('image' + key);
            var menuOverlayAdd = '<div id="item' + key + '" class="menu-overlay">';
            $("#menuImage" + key).append(menuOverlayAdd);

            var menuOverlayId = document.getElementById('item' + key);
            var menuOverlayParaItem = document.createElement('p');
            menuOverlayParaItem.textContent = dataValue[key].item.itemName;
            menuOverlayParaItem.id = "para" + key;
            menuOverlayId.appendChild(menuOverlayParaItem);

            var menuOverlayParaId = document.getElementById('para' + key);
            var itemDiscription = '<h4><i>' + dataValue[key].item.itemDiscription + '</i></h4>';
            var dishDiscription = '<input id="dishCount' + key + '" type="number" name="dishCount" min="0" max="15" required="required" onkeydown="return false">';
            var itemPrice = '<span>' + dataValue[key].item.itemPrice + '</span>';
            var itemTriggerButton = '<input type="submit" value="Add To Cart" class="btn small cart_bt-login" id="itemCart' + key + '">';
            $("#item" + key).append(itemDiscription);
            $("#item" + key).append(dishDiscription);
            $("#item" + key).append(itemPrice);
            $("#item" + key).append(itemTriggerButton);
        });

};


$(document).ready(function () {
    //display menu Data
    menuDisplayData(data);

    // initialize tooltipster on text input elements
    $('#signin-form input[type="text"], #signin-form input[type="password"]').tooltipster({
        trigger: 'custom',
        onlyOne: false,
        position: 'top'
    });

    $('#register-form input[type="text"],#register-form input[type="password"],#register-form input[type="number"]').tooltipster({
        trigger: 'custom',
        onlyOne: true,
        position: 'top'
    });

    $('#reset-form input[type="text"]').tooltipster({
        trigger: 'custom',
        onlyOne: true,
        position: 'top'
    });


    $("#signin-form").validate({
        errorPlacement: function (error, element) {
            $(element).tooltipster('update', $(error).text());
            $(element).tooltipster('show');
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
        },
        rules: {
            customerEmail: {
                required: true,
                email: true
            },
            profilePassword: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            password: {
                required: "Your password must be at least 5 characters long",
                password: "Please specfiy valid password which you have registered with US"
            },
            email: "Please enter a valid email address"
        },
        submitHandler: function (form) { // for demo
            $.ajax({
                url: "/login",
                type: "POST",
                data: {
                    "login": {
                        "username": $('#client_email').val(),
                        "password": $('#client_password').val()
                    }
                },
                success: function (data) {
                    //console.log("stage3 ");
                    console.log(" loginStream  data", JSON.stringify(data));
                },
                error: function (jqXHR) {
                    console.log(jqXHR.responseText + ' :: ' + jqXHR.statusText);
                }
            });
            return false;
        }
    });

    $("#reset-form").validate({
        errorPlacement: function (error, element) {
            var lastError = $(element).data('lastError'),
                newError = $(error).text();

            $(element).data('lastError', newError);

            if (newError !== '' && newError !== lastError) {
                $(element).tooltipster('content', newError);
                $(element).tooltipster('show');
            }
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
        },
        rules: {
            registerEmailAddress: {
                required: true,
                email: true
            }
        },
        submitHandler: function (form) { // for demo
            $.ajax({
                url: '/reset',
                type: 'POST',
                data: {"login": {"username": $('#remail').val()}},
                success: function (data) {
                    console.log(" resetStream data", JSON.stringify(data));
                    //that.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
                },
                error: function (jqXHR) {
                    console.log(jqXHR.responseText + ' :: ' + jqXHR.statusText);
                }
            });
            return false;
        }
    });

    $("#register-form").validate({
        errorPlacement: function (error, element) {

            var lastError = $(element).data('lastError'),
                newError = $(error).text();

            $(element).data('lastError', newError);

            if (newError !== '' && newError !== lastError) {
                $(element).tooltipster('content', newError);
                $(element).tooltipster('show');
            }
        },
        success: function (label, element) {
            $(element).tooltipster('hide');
        },
        rules: {
            customerName: {
                required: true,
                minlength: 1
            },
            customerEmail: {
                required: true,
                email: true
            },
            profilePassword: {
                required: true,
                minlength: 6
            },
            customerMobile: {
                required: true,
                minlength: 10
            },
            addressPincode: {
                required: true,
                minlength: 6
            }
        },
        submitHandler: function (form) { // for demo
            $.ajax({
                url: "/signup",
                method: "POST",
                data: {
                    "signup": {
                        "name": $('#customerName').val(),
                        "contact": {
                            "email": $('#customerEmail').val(),
                            "mobile": $('#customerMobile').val()
                        },
                        "profile": {
                            "password": $('#profilePassword').val()
                        },
                        "address": {
                            "pincode": $('#addressPincode').val()
                        }
                    }
                },
                success: function (data) {
                    console.log(" stage signup data", JSON.stringify(data));
                    if (data === 'ok') {
                        console.log(" signup was sucess");
                        window.location.href = '/customer/registeredUser';
                    }
                },
                error: function (jqXHR) {
                    console.log(jqXHR.responseText + ' :: ' + jqXHR.statusText);
                }
            });
            return false;
        }
    });


    $('#forgotModal').on('shown.bs.modal', function (e) {
        $('#loginModal').modal('hide');
        $('#registerModal').modal('hide');
    });


    $('#registerModal').on('shown.bs.modal', function (e) {
        $('#loginModal').modal('hide');
    });


    $("#loginClose").on('click', function(){
        $('.tooltipstered').tooltipster('hide');
    });


    $("#forgotClose").on('click', function(){
        $('.tooltipstered').tooltipster('hide');
    });

    $("#registerClose").on('click', function(){
        $('.tooltipstered').tooltipster('hide');
    });


    var linkText = 0;
    $(document).on('click','#itemCart0',function(e){
        e.preventDefault();
        //console.log("stage 1 ::: ",$('#dishCountA').val());
        // get the contents of the link that was clicked
        linkText =  $('#dishCountA').val();

        // replace the contents of the div with the link text
        $('#item_count_in_cart_top_displayed').html(linkText);

        // cancel the default action of the link by returning false
        return false;
    });


    $(document).on('click','#itemCart1',function(e){
        e.preventDefault();
        //console.log("stage 2 ::: ",$('#dishCountB').val());
        // get the contents of the link that was clicked
        linkText = $('#dishCountB').val();

        // replace the contents of the div with the link text
        $('#item_count_in_cart_top_displayed').html(linkText);

        // cancel the default action of the link by returning false
        return false;
    });

    $(document).on('click','#itemCart2',function(e){
        e.preventDefault();
        //console.log("stage 3 ::: ",$('#dishCountC').val());
        // get the contents of the link that was clicked
        linkText = $('#dishCountC').val();

        // replace the contents of the div with the link text
        $('#item_count_in_cart_top_displayed').html(linkText);

        // cancel the default action of the link by returning false
        return false;
    });

    $(document).on('click','#itemCart3',function(e){
        e.preventDefault();
        //console.log("stage 4 ::: ",$('#dishCountD').val());
        // get the contents of the link that was clicked
        linkText = $('#dishCountD').val();

        // replace the contents of the div with the link text
        $('#item_count_in_cart_top_displayed').html(linkText);

        // cancel the default action of the link by returning false
        return false;
    });
});

