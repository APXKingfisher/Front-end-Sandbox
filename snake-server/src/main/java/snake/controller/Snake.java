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

import java.util.ArrayList;
import java.util.List;

public class Snake {
    private String name;
    private List<Coord> coordinates = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Coord> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Coord> coordinates) {
        this.coordinates = coordinates;
    }

    @Override
    public String toString() {
        return "Snake{" +
                "name:'" + name + '\'' +
                ", coordinates:" + coordinates +
                '}';
    }
}
