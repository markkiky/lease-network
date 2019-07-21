/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { PropertyComponent } from './Property/Property.component';
import { UnitComponent } from './Unit/Unit.component';

import { LandlordComponent } from './Landlord/Landlord.component';
import { TenantComponent } from './Tenant/Tenant.component';

import { LeaseComponent } from './Lease/Lease.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Property', component: PropertyComponent },
  { path: 'Unit', component: UnitComponent },
  { path: 'Landlord', component: LandlordComponent },
  { path: 'Tenant', component: TenantComponent },
  { path: 'Lease', component: LeaseComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
