<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class CreateOrderTest extends KernelTestCase
{
    
    public function testPlaceToPayGetUrl()
    {
        // (1) boot the Symfony krnel
        self::bootKernel();

        $CreateOrder = new CreateOrder();
        $CreateOrder = $CreateOrder->createOrder([]);

        $this->assertIsArray($CreateOrder);
        $this->assertIsBool($CreateOrder['result']);
    }
}
