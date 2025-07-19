import { Component } from '@angular/core';
import {Piston} from '../piston/piston';

@Component({
  selector: 'app-engine',
  imports: [
    Piston
  ],
  templateUrl: './engine.html',
  styleUrl: './engine.css'
})
export class Engine {

}
