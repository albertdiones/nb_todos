<?php

namespace Test\Service;

use App\Entity\Item;
use App\Repository\ItemRepository;
use App\Service\ItemService;

class ItemServiceTest extends \PHPUnit\Framework\TestCase
{

    public function testConvertToOutboundDto() {
        $service = new ItemService(
            $this->createMock(ItemRepository::class)
        );

        $expectedId = 123;
        $items = [
            (new Item())
                ->setId($expectedId)
        ];

        $dtos = $service->convertToOutboundDtos(
            $items
        );

        $debug = print_r(json_decode(json_encode($dtos)), true);

        self::assertArrayHasKey(0, $dtos, $debug);
        self::assertNotEmpty($dtos[0], $debug);

        self::assertEquals($expectedId, $items[0], $debug);

    }

}