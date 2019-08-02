//Automatic imports
import { request } from "http";



/**
  * This transaction leases a unit to a Tenant participant
  * @param {org.markn.mynetwork.Lease} tx- lease to be processed
  * @transaction 
*/
async function leaseUnit(tx) {
  //set the new lessee of the unit
  tx.unit.lessee = tx.newLessee;
  tx.unit.trnValue = tx.unit.rentAmount * 0.1;
  let assetRegistry = await getAssetRegistry('org.markn.mynetwork.Unit');
 //let personRegistry = await getParticipantRegistry('org.markn.mynetwork.Tenant');

  //emit a notification that a trade has occurred
  let leaseNotification = getFactory().newEvent('org.markn.mynetwork', 'LeaseNotification');
  leaseNotification.unit = tx.unit;
  //leaseNotification.phoneNumber = tx.tenant.phoneNumber;
  emit(leaseNotification);
  //persist the state of the unit
  await assetRegistry.update(tx.unit);
  //await personRegistry.update
}

/**
 * Handle a POST transaction, calling Africastalking api 
 * @param {org.markn.mynetwork.Payments} payments - the transaction to be processed
 * @transaction
 * @return [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) a promise that resolves when transaction processing is complete
 */
function handlePost(payments) {
  var url = 'https://payments.sandbox.africastalking.com/mobile/checkout/request';

  return post(url, payments.newPayment)
    .then(function (result) {
      // alert(JSON.stringify(result));
      console.log(result);
      payments.unit.rentAmount = result;
      return getAssetRegistry('org.markn.mynetwork.Unit')
        .then(function (assetRegistry) {
          return assetRegistry.update(payments.unit);
        });
    });
}
