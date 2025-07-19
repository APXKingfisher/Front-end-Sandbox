import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Car} from './components/car/car';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Car],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Angular');
}
