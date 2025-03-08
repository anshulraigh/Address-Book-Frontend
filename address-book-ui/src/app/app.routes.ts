import { Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

export const routes: Routes = [
  { path: '', component: PersonListComponent },
  { path: 'add-person', component: PersonFormComponent },
];
