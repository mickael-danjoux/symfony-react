<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PersonRepository")
 * @ApiResource(
 *     attributes={
 *          "order" = {"lastName" : "ASC", "firstName" : "ASC"}
 *     },
 *     denormalizationContext={"disable_type_enforcement" = true}
 * )
 * @ApiFilter(
 *     SearchFilter::class,
 *     properties={
 *          "firstName" : "partial",
 *          "lastName" : "partial"
 *     },
 * )
 * @ApiFilter(OrderFilter::class)
 *
 *
 */
class Person
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Please enter your last name")
     * @Assert\Length(min="2", minMessage="Your last name must contain a least 3 characters")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Please enter your first name")
     * @Assert\Length(min="2", minMessage="Your first name must contain a least 3 characters")
     */
    private $firstName;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank(message="Please enter your birth date")
     * @Assert\Type(type="dateTime", message="Please enter valid birth date")
     */
    private $birthDate;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Type(type="integer", message="Please enter your gender")
     */
    private $gender;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = ucfirst($lastName);

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = ucfirst($firstName);

        return $this;
    }

    public function getBirthDate(): ?\DateTimeInterface
    {
        return $this->birthDate;
    }

    public function setBirthDate(?\DateTimeInterface $birthDate): self
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getGender(): ?int
    {
        return $this->gender;
    }

    public function setGender(?int $gender): self
    {
        $this->gender = $gender;

        return $this;
    }
}
