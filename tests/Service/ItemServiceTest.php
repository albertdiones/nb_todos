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
        $dtosAsArray = json_decode(json_encode($dtos), true);

        $debug = print_r($dtosAsArray, true);

        self::assertArrayHasKey(0, $dtosAsArray, $debug);
        self::assertNotEmpty($dtosAsArray[0], $debug);

        self::assertEquals($expectedId, $dtosAsArray[0]['id'], $debug);

    }

}