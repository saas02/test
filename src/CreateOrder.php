<?php

namespace App;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class CreateOrder
{

    public function createOrder(array $data): array
    {
        try {

            $PlaceToPay = new PlaceToPay();

            $credentials = $PlaceToPay->getCredentials();

            $request = $PlaceToPay->getRequest($credentials, $data);

            $request['url'] = $PlaceToPay->getUrl();

            $response = $PlaceToPay->getResponse($request)->getContent();

            $json  = json_decode($response, true);

            $error = json_last_error();

            $message = $result = ($error === JSON_ERROR_UTF8 || empty($json)) ? false : true;

            if ($result) {

                if (isset($json['status']['status']) && $json['status']['status'] == 'FAILED') {
                    $message = $json['status']['message'];
                    $result = false;
                }
            }
        } catch (\RuntimeException $ex) {
            // catch errors
            $result = false;
        }


        return [
            'result' => $result,
            'message' => $message
        ];
    }
}
