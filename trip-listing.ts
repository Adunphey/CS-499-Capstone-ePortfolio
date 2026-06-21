import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripCardComponent } from '../trip-card/trip-card';
import { TripDataService, ApiTrip } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListingComponent implements OnInit {
  trips: ApiTrip[] = [];

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips: ApiTrip[]) => {
        console.log('TRIPS FROM API:', trips);
        this.trips = trips;
      },
      error: (err) => console.error('Error loading trips', err)
    });
  }
}