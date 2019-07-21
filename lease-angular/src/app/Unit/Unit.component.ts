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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UnitService } from './Unit.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-unit',
  templateUrl: './Unit.component.html',
  styleUrls: ['./Unit.component.css'],
  providers: [UnitService]
})
export class UnitComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  unitId = new FormControl('', Validators.required);
  unitName = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  rentAmount = new FormControl('', Validators.required);
  trnValue = new FormControl('', Validators.required);
  lessee = new FormControl('', Validators.required);
  previous = new FormControl('', Validators.required);
  propertyId = new FormControl('', Validators.required);
  propertyName = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceUnit: UnitService, fb: FormBuilder) {
    this.myForm = fb.group({
      unitId: this.unitId,
      unitName: this.unitName,
      type: this.type,
      rentAmount: this.rentAmount,
      trnValue: this.trnValue,
      lessee: this.lessee,
      previous: this.previous,
      propertyId: this.propertyId,
      propertyName: this.propertyName,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceUnit.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.markn.mynetwork.Unit',
      'unitId': this.unitId.value,
      'unitName': this.unitName.value,
      'type': this.type.value,
      'rentAmount': this.rentAmount.value,
      'trnValue': this.trnValue.value,
      'lessee': this.lessee.value,
      'previous': this.previous.value,
      'propertyId': this.propertyId.value,
      'propertyName': this.propertyName.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'unitId': null,
      'unitName': null,
      'type': null,
      'rentAmount': null,
      'trnValue': null,
      'lessee': null,
      'previous': null,
      'propertyId': null,
      'propertyName': null,
      'owner': null
    });

    return this.serviceUnit.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'unitId': null,
        'unitName': null,
        'type': null,
        'rentAmount': null,
        'trnValue': null,
        'lessee': null,
        'previous': null,
        'propertyId': null,
        'propertyName': null,
        'owner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.markn.mynetwork.Unit',
      'unitName': this.unitName.value,
      'type': this.type.value,
      'rentAmount': this.rentAmount.value,
      'trnValue': this.trnValue.value,
      'lessee': this.lessee.value,
      'previous': this.previous.value,
      'propertyId': this.propertyId.value,
      'propertyName': this.propertyName.value,
      'owner': this.owner.value
    };

    return this.serviceUnit.updateAsset(form.get('unitId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceUnit.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceUnit.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'unitId': null,
        'unitName': null,
        'type': null,
        'rentAmount': null,
        'trnValue': null,
        'lessee': null,
        'previous': null,
        'propertyId': null,
        'propertyName': null,
        'owner': null
      };

      if (result.unitId) {
        formObject.unitId = result.unitId;
      } else {
        formObject.unitId = null;
      }

      if (result.unitName) {
        formObject.unitName = result.unitName;
      } else {
        formObject.unitName = null;
      }

      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
      }

      if (result.rentAmount) {
        formObject.rentAmount = result.rentAmount;
      } else {
        formObject.rentAmount = null;
      }

      if (result.trnValue) {
        formObject.trnValue = result.trnValue;
      } else {
        formObject.trnValue = null;
      }

      if (result.lessee) {
        formObject.lessee = result.lessee;
      } else {
        formObject.lessee = null;
      }

      if (result.previous) {
        formObject.previous = result.previous;
      } else {
        formObject.previous = null;
      }

      if (result.propertyId) {
        formObject.propertyId = result.propertyId;
      } else {
        formObject.propertyId = null;
      }

      if (result.propertyName) {
        formObject.propertyName = result.propertyName;
      } else {
        formObject.propertyName = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'unitId': null,
      'unitName': null,
      'type': null,
      'rentAmount': null,
      'trnValue': null,
      'lessee': null,
      'previous': null,
      'propertyId': null,
      'propertyName': null,
      'owner': null
      });
  }

}
