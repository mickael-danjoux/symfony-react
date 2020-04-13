<?php

namespace App\DataFixtures;

use App\Entity\Person;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use Faker;

class AppFixtures extends Fixture
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    private $faker;

    /**
     * AppFixtures constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->faker = Faker\Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager)
    {

        $this->createPeople(50);
        $this->entityManager->flush();
    }

    public function createPeople(int $number){
        for( $i = 0; $i < $number; $i ++ ){
            $person = new Person();
            $person->setFirstName($this->faker->firstName);
            $person->setLastName($this->faker->lastName);
            $person->setGender($this->faker->boolean);
            $person->setBirthDate($this->faker->dateTimeBetween('-75 years','now'));
            $this->entityManager->persist($person);
        }
    }
}
