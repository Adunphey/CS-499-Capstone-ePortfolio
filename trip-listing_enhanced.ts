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

  // Stores all trip records returned from the API
  trips: ApiTrip[] = [];

  // Stores filtered and sorted trip records for display
  filteredTrips: ApiTrip[] = [];

  // Stores the user's search input
  searchTerm: string = '';

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.getTrips();
  }

  // Retrieves trip data from the API service
  getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips: ApiTrip[]) => {
        console.log('TRIPS FROM API:', trips);

        // Sort trip data alphabetically before displaying it
        this.trips = this.sortTripsByName(trips);

        // Copy sorted trips into filteredTrips array
        this.filteredTrips = [...this.trips];
      },

      error: (err) =>
        console.error('Error loading trips', err)
    });
  }

  // Sorts trip objects alphabetically by trip name
  sortTripsByName(trips: ApiTrip[]): ApiTrip[] {
    return [...trips].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  // Filters trip data based on search text entered by the user
  filterTrips(searchText: string): void {

    // Convert search term to lowercase for consistent searching
    this.searchTerm = searchText.toLowerCase();

    // Search trip names and descriptions
    this.filteredTrips = this.trips.filter((trip) =>
      trip.name.toLowerCase().includes(this.searchTerm) ||
      trip.description.toLowerCase().includes(this.searchTerm)
    );
  }

  // Restores the full trip list after filtering
  resetFilter(): void {
    this.searchTerm = '';

    // Reset display back to all trips
    this.filteredTrips = [...this.trips];
  }
}
