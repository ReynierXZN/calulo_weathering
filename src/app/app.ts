import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './services/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5 text-center">
      <h1 class="mb-4">Weather App</h1>
      <input
        type="text"
        [(ngModel)]="city"
        class="form-control mb-3"
        placeholder="Enter city"
      />
      <button class="btn btn-primary mb-3" (click)="searchWeather()">Search</button>

      <div *ngIf="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <div *ngIf="weatherData" class="card p-3 mt-3">
        <h3>{{ weatherData.name }}</h3>
        <p>Temperature: {{ weatherData.main.temp }}°C</p>
        <p>Weather: {{ weatherData.weather[0].description }}</p>
      </div>
    </div>
  `
})
export class App {
  city = '';
  weatherData: any;
  errorMessage = '';

  constructor(private weatherService: WeatherService) {}

  searchWeather() {
    if (!this.city.trim()) return;
    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = '';
      },
      error: () => {
        this.weatherData = null;
        this.errorMessage = 'City not found or API error.';
      }
    });
  }
}
