/**
  * This transaction leases a unit to a Tenant participant
  * @param {org.markn.mynetwork.Lease} tx- lease to be processed
  * @transaction 
*/
async function leaseUnit(tx) {
    //set the new lessee of the unit
    tx.unit.lessee = tx.newLessee;
    tx.unit.trnValue = tx.unit.rentAmount * 1.1;
    let assetRegistry = await getAssetRegistry('org.markn.mynetwork.Unit');

    //persist the state of the unit
    await assetRegistry.update(tx.unit);
}