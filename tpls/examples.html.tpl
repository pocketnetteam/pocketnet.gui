<!doctype html>
<html class="no-js customscroll applicationhtml" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Cache-Control" content="no-cache">
        <meta http-equiv='expires' content='0'>
        <meta http-equiv="X-Frame-Options: SAMEORIGIN">

        <title>__VAR__.name Demo</title>
        <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=no">
        <meta name="fragment" content="!">
        <link rel="apple-touch-icon" href="img/res/blue_pad_250.png" sizes="250x250">
        <meta name="theme-color" content="#011621" />
        <link rel="icon" href="./favicon.svg" sizes="any" type="image/svg+xml">
        <link rel="stylesheet" href="css/main.css?v=503197461855">
        <link rel="stylesheet" href="css/common.css?v=503197461855">
        
    </head>
    <body id="application" class="menu-hide ">

        <!-- example 1: PaymentButton: begin -->
        <div>
            <h2>__VAR__.name payment button</h2>
        </div>
        <div class="example" id="paymentButton">

        </div>

        <script>
            window.addEventListener("bastyonLibLoaded", function() {

                var payments = window.bastyonLib.payments({
                    payment : {
                        "address": "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                        "c_url": "https://6.pocketnet.app:8899/ping",
                        "c_url_type": "fetch",
                        "payload": {
                            "order": "10"
                        },
                        "items": [{
                            "image": "https://i.imgur.com/xpRSxI1.jpeg",
                            "name": "Omega 3-6-9 (3-Pack)",
                            "value": 0.1
                        }, {
                            "image": "https://i.imgur.com/d0eD64P.jpeg",
                            "name": "(6-Pack)",
                            "value": 0.2
                        }],
                        "store": {
                            "name": "Health Ranger Store",
                            "site": "www.healthrangerstore.com"
                        }
                    }
                })

                var button = payments.makeButton()

                var elem = document.getElementById('paymentButton');
                    elem.append(button)
            });
        </script>
        <!-- example 1: PaymentButton: end -->



        <!-- example 2: PaymentLink: begin -->
        <div>
            <h2>__VAR__.name payment link</h2>
        </div>
        <div class="example" >
            <a href="" id="paymentURL">Payment link</a>
        </div>

        <script>
            window.addEventListener("bastyonLibLoaded", function() {

                var payments = window.bastyonLib.payments({
                    payment : {
                        /*
                        Link duration
                        
                        */
                        //"expired" : 60 * 10, // 10 minutes
                        /*
                            Seller Address
                        */
                        "address": "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                        
                        /*
                            Require buyer to enter email address
                        */

                        "email" : true,

                        /*
                            Require buyer to enter phone number
                        */

                        "phone" : true,

                        /*
                            Description. Not required
                        */

                        //"description" : "some text",

                        /*
                        
                        Transaction amount. Ignored if "items" set
                        
                        */

                        //"value" : 5,

                        /*
                            Shopping list - image, name, value required
                        */
                       
                        "items": [{
                            "image": "https://i.imgur.com/xpRSxI1.jpeg",
                            "name": "Omega 3-6-9 (3-Pack)",
                            "value": 0.1
                        }, {
                            "image": "https://i.imgur.com/d0eD64P.jpeg",
                            "name": "(6-Pack)",
                            "value": 0.2
                        }],

                        /*
                            Seller info - name required, website
                        */

                        "store": {
                            "name": "Health Ranger Store",
                            "site": "www.healthrangerstore.com"
                        },

                        /*
                        
                            Shipment server url

                            If specified, the buyer will need to fill out a delivery form

                            The server must process a request like

                            {
                                shipment : {
                                    name,
                                    country,
                                    address,
                                    city,
                                    state,
                                    zipcode
                                },

                                locale : 'en',
                                payload : (Seller Payload) {}
                            }

                            And return the answer

                            {
                                value : 3 (Cost of delivery PKOIN)
                            }

                            Or

                            {
                                error : {
                                    text : 'Error text for the user in (locale) language'
                                }
                            }
                        
                        */

                        "s_url": "https://6.pocketnet.app:8899/ping",

                        /*
                            Shipment value: if exist "s_url" ignoring
                        */
                            shipmentValue : 5,
                        /*

                            Seller payload JSON

                        */

                        "payload": {
                            "order": "10"
                        },

                        /*
                            Callback server route

                            request
                            {
                                tx : Transaction id
                                phone : User phone (if seller required),
                                email : User email (if seller required),
                                shipment : Shipment details,
                                ...payload : (Seller Payload) {}
                            }

                            expected answer - response with code 200
                        */

                        "c_url": "https://6.pocketnet.app:8899/ping",

                        /* 
                            Callback server route type: (fetch, redirect) 
                        */

                        "c_url_type": "fetch",


                        /*
                            Anonimus flag - Do not transfer buyer data to the seller, prohibit paying from the address linked to the account
                        */
                        
                        //"anonimus" : true,
                        
                        /*
                        
                            For payments when it is not possible to generate a new address for each payment (random small value)
                            Max: 0.01, 8 digits
                        */

                        // saltValue : 0.00798765
                        

                        
                    }
                })

                var urlElement = document.getElementById('paymentURL');
                    urlElement.href = payments.makeURL()

                    payments.makeQR().then(q => {
                        console.log(q)
                    })
            });
        </script>
        <!-- example 2: PaymentLink: end -->


        <!-- example 3: Auth: begin -->
        <div>
            <h2>__VAR__.name auth button</h2>
        </div>
        <div class="example" >
            <div class="example" id="authButton">
            </div>
        </div>

        <script>
            window.addEventListener("bastyonLibLoaded", function() {

                var auth = window.bastyonLib.auth({
                    auth : {
                        

                        /*
                        
                            Server url

                            If specified, the buyer will need to fill out a delivery form

                            The server must process a request like

                            {
                                signature : {
                                    "nonce": "",
                                    "signature": "",
                                    "pubkey": "",
                                    "address": "",
                                    "v": 1
                                }
                            }

                            And return the answer

                            {
                                redirect_url : ''
                            }

                            Or

                            {
                                error : {
                                    text : 'Signature check failed'
                                }
                            }
                        
                        */

                        "c_url": "https://6.pocketnet.app:8899/ping",

                        
                    }
                })

                var button = auth.makeButton()

                var elem = document.getElementById('authButton');
                    elem.append(button)
            });
        </script>
        <!-- example 2: PaymentLink: end -->

        <script src="https://localhost/pocketnet/external.js"></script>
        
        <!-- <script src="https://__VAR__.domain/external.js"></script> -->
    </body>
</html>
