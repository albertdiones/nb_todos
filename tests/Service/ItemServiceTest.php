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


    public function testGet() {
        $repository = $this->createMock(ItemRepository::class);
        $expectedId = 123;
        $repository->expects(self::once())->method('findBy')->willReturn(
            [
                (new Item())
                ->setId($expectedId)
            ]
        );
        $service = new ItemService(
            $repository
        );
        $items = $service->get([]);
        self::assertIsArray($items);
        self::assertNotEmpty($items);
        self::assertArrayHasKey(0, $items);
        self::assertInstanceOf(Item::class, $items[0]);
        self::assertEquals($expectedId, $items[0]->getId());
    }


    public function testCreate() {
        $repository = $this->createMock(ItemRepository::class);
        $expectedId = 123;

        $repository->expects(self::once())->method('save')->willReturn(true);

        $service = new ItemService(
            $repository
        );


        $expectedTitle = 'buy tomatoes';
        $item = $service->create([
            'title' => $expectedTitle
        ]);
        self::assertNotEmpty($item);
        self::assertInstanceOf(Item::class, $item);
        self::assertEquals($expectedTitle, $item->getTitle());
    }


    public function testUpdate() {
        $repository = $this->createMock(ItemRepository::class);

        $repository->expects(self::once())->method('save')->willReturn(true);

        $service = new ItemService(
            $repository
        );


        $expectedTitle = 'buy bell peppers';
        $itemToUpdate = (new Item())
            ->setTitle($expectedTitle);

        $item = $service->update([
            'title' => $expectedTitle
        ],$itemToUpdate);

        self::assertNotEmpty($item);
        self::assertInstanceOf(Item::class, $item);
        self::assertEquals($expectedTitle, $item->getTitle());
    }


    public function testDelete() {
        $repository = $this->createMock(ItemRepository::class);

        $repository->expects(self::once())->method('delete')->willReturn(true);

        $service = new ItemService(
            $repository
        );

        $itemToDelete = (new Item())
            ->setId(123)
            ->setTitle('buy potato');

        $service->delete($itemToDelete);
    }

}