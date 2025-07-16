/*
 * Copyright © Progmasters (QTC Kft.), 2018.
 * All rights reserved. No part or the whole of this Teaching Material (TM) may be reproduced, copied, distributed,
 * publicly performed, disseminated to the public, adapted or transmitted in any form or by any means, including
 * photocopying, recording, or other electronic or mechanical methods, without the prior written permission of QTC Kft.
 * This TM may only be used for the purposes of teaching exclusively by QTC Kft. and studying exclusively by QTC Kft.’s
 * students and for no other purposes by any parties other than QTC Kft.
 * This TM shall be kept confidential and shall not be made public or made available or disclosed to any unauthorized person.
 * Any dispute or claim arising out of the breach of these provisions shall be governed by and construed in accordance with the laws of Hungary.
 */
package snake.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.progmasters.snake.controller.Snake;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static java.time.LocalDateTime.now;

@Controller
public class SnakeServer {

    private Map<String, Snake> snakeMap = Collections.synchronizedMap(new HashMap<>());
    private Map<String, LocalDateTime> snakeTimeouts = Collections.synchronizedMap(new HashMap<>());

    private ObjectMapper jsonConverter;

    @Autowired
    public SnakeServer(ObjectMapper jsonConverter) {
        this.jsonConverter = jsonConverter;
    }

    @CrossOrigin
    @PostMapping(value = "/snake", consumes = "application/json", produces = "application/json")
    @ResponseBody
    public String snakePositions(@RequestBody Snake snake) throws JsonProcessingException {
        synchronized (this) {
            if (snakeMap.get(snake.getName()) == null) {
                System.out.println("Incoming:" + snake.toString());
            }
            snakeMap.put(snake.getName(), snake);
            snakeTimeouts.put(snake.getName(), now());
        }

        clearTimeouts();
        addBots();

        synchronized (this) {
            return jsonConverter.writeValueAsString(snakeMap);
        }
    }

    private void addBots() {
        synchronized (this) {
            if (!snakeMap.containsKey("rectSnak")) {

                Snake rectSnake = new Snake();
                rectSnake.setName("rectSnake");
                rectSnake.getCoordinates().add(new Coord(1, 1));
                rectSnake.getCoordinates().add(new Coord(2, 1));
                rectSnake.getCoordinates().add(new Coord(3, 1));
                rectSnake.getCoordinates().add(new Coord(3, 2));
                rectSnake.getCoordinates().add(new Coord(3, 3));
                rectSnake.getCoordinates().add(new Coord(2, 3));
                rectSnake.getCoordinates().add(new Coord(1, 3));
                rectSnake.getCoordinates().add(new Coord(1, 2));
                snakeMap.put(rectSnake.getName(), rectSnake);
                snakeTimeouts.put(rectSnake.getName(), now());
            }
            if (!snakeMap.containsKey("lineSnake")) {

                Snake lineSnake = new Snake();
                lineSnake.setName("lineSnake");
                lineSnake.getCoordinates().add(new Coord(10, 11));
                lineSnake.getCoordinates().add(new Coord(10, 12));
                lineSnake.getCoordinates().add(new Coord(10, 13));
                lineSnake.getCoordinates().add(new Coord(10, 14));
                snakeMap.put(lineSnake.getName(), lineSnake);
                snakeTimeouts.put(lineSnake.getName(), now());
            }
        }

    }

    private void clearTimeouts() {
        synchronized (this) {
            List<String> names = new ArrayList<String>(snakeTimeouts.keySet());
            for (String name : names) {
                LocalDateTime snakeDateTime = snakeTimeouts.get(name);
                if (snakeDateTime != null) {
                    if (snakeDateTime.isBefore(now().minus(5, ChronoUnit.SECONDS))) {
                        System.out.println("Removing: " + name);
                        snakeMap.remove(name);
                        snakeTimeouts.remove(name);
                    }
                }
            }
        }
    }
}
