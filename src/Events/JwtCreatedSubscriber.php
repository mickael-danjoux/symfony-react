<?php


namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{

    /**
     * @param JWTCreatedEvent $event
     */
    public function updateJwtData(JWTCreatedEvent $event){
        $user = $event->getUser();

        $data = $event->getData();
        $data['lastName'] = $user->getLastName();
        $data['firstName'] = $user->getFirstName();

        $event->setData($data);
    }
}