import { Component } from '@angular/core';
import {Engine} from '../engine/engine';

@Component({
  selector: 'app-car',
  imports: [
    Engine
  ],
  templateUrl: './car.html',
  styleUrl: './car.css'
})
export class Car {

}
