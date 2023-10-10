<?php

namespace App\Dto;

use App\Entity\Item;

class OutboundItem implements \JsonSerializable
{

    protected Item $entity;
    public function __construct(Item $item) {
        $this->entity = $item;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->entity->getId(),
            'title' => $this->entity->getTitle()
        ];
    }
}