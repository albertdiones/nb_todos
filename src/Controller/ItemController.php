<?php

namespace App\Controller;

use App\Service\ItemService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ItemController extends AbstractController
{

    protected $itemService;
    //protected $itemRepository;

    public function __construct(
        ItemService $itemService
        // ItemRepository
    ) {
        $this->itemService = $itemService;
        //$this->itemRepository = $itemService;
    }



    #[Route('/api/items', methods: ['GET'])]
    public function show(Request $request): JsonResponse
    {
        $items = $this->itemService->convertToOutboundDtos(
            $this->itemService->get([])
        );

        return new JsonResponse($items);
    }


    #[Route('/api/items', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $requestItem = json_decode($request->getContent());

        if (!$requestItem) {
            throw new BadRequestException("No request body");
        }

        $item = $this->itemService->create($requestItem);

        if (!$item) {
            throw new \RuntimeException("Failed to create todo item");
        }

        return new JsonResponse($requestItem, Response::HTTP_CREATED);
    }


    #[Route('/api/items/{itemId}', methods: ['PATCH'])]
    public function update(Request $request, int $itemId): JsonResponse
    {
        [$item] = $this->itemService->get(['id' => $itemId]) ?: [null];
        if (empty($item)) {
            throw new BadRequestException("Invalid item id");
        }

        $requestItem = json_decode($request->getContent());

        $this->itemService->update($item, $requestItem);

        return new JsonResponse($item, Response::HTTP_ACCEPTED);
    }



    #[Route('/api/items/{itemId}', methods: ['DELETE'])]
    public function delete(Request $request, int $itemId): JsonResponse
    {

        [$item] = $this->itemService->get(['id' => $itemId]) ?: [null];
        if (empty($item)) {
            throw new BadRequestException("Invalid item id");
        }

        $this->itemService->delete($item);

        return new JsonResponse($item, Response::HTTP_OK);
    }
}
