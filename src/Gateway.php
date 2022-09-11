<?php

namespace App;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

interface Gateway
{
    public function getCredentials(): array;
    public function getUrl(): string;
    public function getRequest(array $credentials, array $userData): array;
    public function getResponse(array $request): Response;
}
