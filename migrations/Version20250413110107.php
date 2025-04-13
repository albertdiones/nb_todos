<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250413110107 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create item table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE item (
            id INT AUTO_INCREMENT NOT NULL,
            title VARCHAR(512) NOT NULL,
            description VARCHAR(4096) DEFAULT NULL,
            sort_index INT NOT NULL,
            PRIMARY KEY(id)
        ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE item');
    }
}
