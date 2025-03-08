import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';

interface Person {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-person-list',
  standalone: true,
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  imports: [CommonModule],
})
export class PersonListComponent implements OnInit {
editPerson(_t17: number) {
throw new Error('Method not implemented.');
}
  persons: Person[] = [];

  constructor(private router: Router, private personService: PersonService) {}

  ngOnInit() {
    this.getAllPersons();
  }

  getAllPersons() {
    this.personService.getAllPersons().subscribe({
      next: (response) => {
        console.log('Fetched persons:', response); // Debugging
        this.persons = response.reverse();
        console.log('API Response:', response);
      },
      error: (error) => console.error('Error fetching persons:', error)
    });
    
  }  

  addPerson() {
    this.router.navigate(['/add-person']);
  }

  deletePerson(index: number) {
    const personId = this.persons[index].id;
    this.personService.deletePerson(personId).subscribe(
      () => {
        this.persons.splice(index, 1);
      },
      (error) => {
        console.error('Error deleting person:', error);
      }
    );
  }

  trackById(index: number, person: Person) {
    return person.id;
  }
}
