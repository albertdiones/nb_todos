<?php

namespace App\Service;

use App\Dto\OutboundItem;
use App\Entity\Item;
use App\Repository\ItemRepository;

class ItemService {

    protected ItemRepository $itemRepository;

    public function __construct(
        ItemRepository $itemRepository
    ) {
        $this->itemRepository = $itemRepository;
    }

    public function get(array $criteria): array
    {
        return $this->itemRepository->findBy($criteria);
    }

    /**
     * @param Item[] $items
     * @return OutboundItem[]
     */
    public function convertToOutboundDtos(array $items): array {
        return array_map(
            function (Item $item) {
                return new OutboundItem($item);
            },
            $items
        );

    }

    public function create(array $requestItem): ?Item {
        $item = new Item();

        $item->setTitle($requestItem['title']);

        if (!$this->itemRepository->save($item)) {
            return null;
        }

        return $item;
    }

}