<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class PlaceToPayTest extends KernelTestCase
{
    CONST URL = 'https://checkout-test.placetopay.com/api/session';
    
    public function testPlaceToPayGetUrl()
    {
        // (1) boot the Symfony krnel
        self::bootKernel();

        $PlaceToPay = new PlaceToPay();
        $PlaceToPayGetUrl = $PlaceToPay->getUrl();

        $this->assertEquals(self::URL, $PlaceToPayGetUrl);
        $this->assertIsString($PlaceToPayGetUrl);
    }


    public function testPlaceToPayGetRequest()
    {
        // (1) boot the Symfony krnel
        self::bootKernel();

        $PlaceToPay = new PlaceToPay();
        $PlaceToPayGetRequest = $PlaceToPay->getRequest([], []);

        $this->assertIsArray($PlaceToPayGetRequest);
    }
}
