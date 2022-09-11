<?php

namespace App;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Dotenv\Dotenv;
use App\Gateway;

class PlaceToPay implements Gateway
{
    const LOGIN = "6dd490faf9cb87a9862245da41170ff2";
    const SECRETKEY = "024h1IlD";
    const URL = "http://www.evertec.local/";
    const URLSERVICE = "https://checkout-test.placetopay.com/api/session";

    public function getCredentials(): array
    {
        $nonce = date("Y-m-d h:i:s");
        $seed = date(\DateTime::ISO8601);

        return [
            'auth' => [
                "login" => PlaceToPay::LOGIN,
                "tranKey" => base64_encode(sha1($nonce . $seed . PlaceToPay::SECRETKEY)),
                "nonce" => base64_encode($nonce),
                "seed" => $seed
            ]
        ];
    }

    public function getUrl(): string
    {
        return self::URLSERVICE;
    }

    public function getRequest(array $credentials, array $userData): array
    {
        $request = '{
            "locale": "es_CO",
            "auth":
            {
                "auth":
                {
                    "login": "' . (isset($credentials["auth"]["login"]) ? $credentials["auth"]["login"] : NULL) . '",
                    "tranKey": "' . (isset($credentials["auth"]["tranKey"]) ? $credentials["auth"]["tranKey"] : NULL) . '",
                    "nonce": "' . (isset($credentials["auth"]["nonce"]) ? $credentials["auth"]["nonce"] : NULL) . '",
                    "seed": "' . (isset($credentials["auth"]["seed"]) ? $credentials["auth"]["seed"] : NULL) . '"
                }
            },
            "payer":
            {
                "document": "1122334455",
                "documentType": "CC",
                "name": "sss",
                "surname": "Doe",
                "company": "Evertec",
                "email": "aaaaa",
                "mobile": "bbbb",
                "address":
                {
                    "street": "Calle falsa 123",
                    "city": "Medell\u00edn",
                    "state": "Poblado",
                    "postalCode": "55555",
                    "country": "Colombia",
                    "phone": "+573111111111"
                }
            },
            "buyer":
            {
                "document": "1122334455",
                "documentType": "CC",
                "name": "' . (isset($userData["userData"]["name"]) ? $userData["userData"]["name"] : NULL) . '",
                "surname": "Doe",
                "company": "Evertec",
                "email": "' . (isset($userData["userData"]["email"]) ? $userData["userData"]["email"] : NULL) . '",
                "mobile": "' . (isset($userData["userData"]["phone"]) ? $userData["userData"]["phone"] : NULL) . '",
                "address":
                {
                    "street": "Calle falsa 123",
                    "city": "Medell\u00edn",
                    "state": "Poblado",
                    "postalCode": "55555",
                    "country": "Colombia",
                    "phone": "+573111111111"
                }
            },
            "payment":
            {
                "reference": "12345",
                "description": "Prueba de pago",
                "amount":
                {
                    "currency": "COP",
                    "total": 2000,
                    "taxes": [
                    {
                        "kind": "valueAddedTax",
                        "amount": 1000,
                        "base": 0
                    }],
                    "details": [
                    {
                        "kind": "discount",
                        "amount": 1000
                    }]
                },
                "allowPartial": false,
                "shipping":
                {
                    "document": "1122334455",
                    "documentType": "CC",
                    "name": "John",
                    "surname": "Doe",
                    "company": "Evertec",
                    "email": "johndoe@app.com",
                    "mobile": "+5731111111111",
                    "address":
                    {
                        "street": "Calle falsa 123",
                        "city": "Medell\u00edn",
                        "state": "Poblado",
                        "postalCode": "55555",
                        "country": "Colombia",
                        "phone": "+573111111111"
                    }
                },
                "items": [
                {
                    "sku": "12345",
                    "name": "product_1",
                    "category": "physical",
                    "qty": "1",
                    "price": 1000,
                    "tax": 0
                }],
                "fields": [
                {
                    "keyword": "_test_field_value_",
                    "value": "_test_field_",
                    "displayOn": "approved"
                }],
                "recurring":
                {
                    "periodicity": "D",
                    "interval": "1",
                    "nextPayment": "2019-08-24",
                    "maxPeriods": 1,
                    "dueDate ": "2019-09-24",
                    "notificationUrl ": "https://checkout.placetopay.com"
                },
                "subscribe": false,
                "dispersion": [
                {
                    "agreement": "1299",
                    "agreementType": "MERCHANT",
                    "amount":
                    {
                        "currency": "USD",
                        "total": 200
                    }
                }],
                "modifiers": [
                {
                    "type": "FEDERAL_GOVERNMENT",
                    "code": 17934,
                    "additional":
                    {
                        "invoice": "123345"
                    }
                }]
            },
            "subscription":
            {
                "reference": "12345",
                "description": "Ejemplo de descripci\u00f3n",
                "fields":
                {
                    "keyword": "1111",
                    "value": "lastDigits",
                    "displayOn": "none"
                }
            },
            "fields": [
            {
                "keyword": "_processUrl_",
                "value": "https://checkout.redirection.test/session/1/a592098e22acc709ec7eb30fc0973060",
                "displayOn": "none"
            }],
            "paymentMethod": "visa",
            "expiration": "2019-08-24T14:15:22Z",
            "returnUrl": "' . PlaceToPay::LOGIN . '/return",
            "cancelUrl": "' . PlaceToPay::LOGIN . '/cancel",
            "ipAddress": "127.0.0.1",
            "userAgent": "PlacetoPay Sandbox",
            "skipResult": false,
            "noBuyerFill": false,
            "type": "checkin"
        }';

        return [
            'request' => json_decode($request, true)
        ];
    }

    public function getResponse(array $request): Response
    {
        $ExecuteCurl = new ExecuteCurl(
            $request['url'],
            [
                CURLOPT_HTTPHEADER => [
                    'Content-Type:application/json'
                ]
            ]
        );

        $response = $ExecuteCurl->execute($request['request']);

        return new Response($response['response']);
    }
}
