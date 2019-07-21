import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.markn.mynetwork{
   export class Property extends Asset {
      propertyId: string;
      propertyName: string;
      owner: Landlord;
   }
   export class Unit extends Property {
      unitId: string;
      unitName: string;
      type: UnitType;
      rentAmount: number;
      trnValue: number;
      lessee: Tenant;
      previous: Tenant[];
   }
   export class Landlord extends Participant {
      landlordId: string;
      fullName: string;
      email: string;
      phoneNumber: string;
      properties: Property[];
   }
   export class Tenant extends Participant {
      tenantId: string;
      fullName: string;
      idNo: string;
      email: string;
      phoneNumber: string;
   }
   export class Lease extends Transaction {
      unit: Unit;
      newLessee: Tenant;
   }
   export enum UnitType {
      ThreeBedroom,
      TwoBedroom,
      OneBedroom,
      Bedsitter,
      Single,
      Lab,
   }
// }
