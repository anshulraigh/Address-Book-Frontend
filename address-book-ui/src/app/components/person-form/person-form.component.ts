import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-form',
  standalone: true,
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  imports: [FormsModule, CommonModule],
})
export class PersonFormComponent {
  person = {
    name: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    phoneNumber: '',
  };

  states = [
    { name: 'Madhya Pradesh', cities: ['Bhopal', 'Indore', 'Gwalior'] },
    { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi'] },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
    { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai'] }
  ];

  cities: string[] = [];
  isOtherState = false;
  isOtherCity = false;
  manualState = ''; // Stores manually entered state
  manualCity = ''; // Stores manually entered city

  hoverAdd = false;
  hoverReset = false;

  constructor(private router: Router, private personService: PersonService) {}

  updateCities() {
    if (this.person.state === 'Other') {
      this.isOtherState = true;
      this.manualState = ''; // Reset manual input
      this.cities = [];
      this.isOtherCity = false; // Reset city
      this.person.city = '';
    } else {
      this.isOtherState = false;
      const selectedState = this.states.find(state => state.name === this.person.state);
      this.cities = selectedState ? selectedState.cities : [];
      this.person.city = ''; // Reset city selection when changing state
    }
  }

  checkOtherCity() {
    this.isOtherCity = this.person.city === 'Other';
    if (this.isOtherCity) {
      this.manualCity = ''; // Reset manual input
    }
  }

  addPerson() {
    if (!this.isValidForm()) return;

    // Store manually entered state and city only if valid
    this.person.state = this.isOtherState && this.manualState ? this.manualState : this.person.state;
    this.person.city = this.isOtherCity && this.manualCity ? this.manualCity : this.person.city;

    // Prevent saving blank state or city
    if (!this.person.state || !this.person.city) {
      alert("Please provide valid state and city.");
      return;
    }

    this.personService.addPerson(this.person).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.error('Error adding person:', error),
    });
  }

  resetForm() {
    this.person = {
      name: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',
      phoneNumber: '',
    };
    this.isOtherState = false;
    this.isOtherCity = false;
    this.manualState = '';
    this.manualCity = '';
  }

  closeForm() {
    this.router.navigate(['/']);
  }

  private isValidForm(): boolean {
    if (!this.person.name || !this.person.phoneNumber || !this.person.address || !this.person.zipcode) {
      alert('Please fill all required fields.');
      return false;
    }
    if (!/^\d{10}$/.test(this.person.phoneNumber)) {
      alert('Phone number must be exactly 10 digits.');
      return false;
    }
    if (!/^\d{6}$/.test(this.person.zipcode)) {
      alert('Zipcode must be exactly 6 digits.');
      return false;
    }
    return true;
  }
}
