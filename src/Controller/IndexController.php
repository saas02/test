<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\PlaceToPay;
use App\CreateOrder;

class IndexController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(Request $request): Response
    {
        return $this->render('index/index.html.twig', [
            'error' => !empty($request->query->get('error')) ? $request->query->get('error') : NULL,
        ]);
    }

    #[Route('/crear-orden', name: 'create_order')]
    public function createOrderAction(Request $request): Response
    {
        if (empty($request->request->get('data-cart'))) {
            return $this->redirectToRoute('app_index', [
                'error' => 'Anadir Productos al carrito'
            ]);
        }

        $amount = count(explode(',', $request->request->get('data-cart')));
        $price = 2000;
        $data = [
            'userData' => [
                'email' => $request->request->get('data-email'),
                'name' => $request->request->get('data-name'),
                'phone' => $request->request->get('data-phone'),
            ],
            'order' => [
                'amount' => $amount,
                'price' => $price,
                'total' => $amount * $price,
            ]
        ];

        $order = new CreateOrder();
        $orderId = $order->createOrder($data);

        if (!$orderId['result']) {
            return $this->redirectToRoute('app_index', [
                'error' => $orderId["message"]
            ]);
        }

        return $this->render('index/index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    #[Route('/return', name: 'return_order')]
    public function returnOrderAction(Request $request): Response
    {


        return $this->render('index/index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }

    #[Route('/cancel', name: 'cancel')]
    public function cancelOrderAction(Request $request): Response
    {


        return $this->render('index/index.html.twig', [
            'controller_name' => 'IndexController',
        ]);
    }
}
