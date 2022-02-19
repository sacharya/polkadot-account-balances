// import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
// import {Account} from "../types";
// import {Balance} from "@polkadot/types/interfaces";

// export async function handleEvent(event: SubstrateEvent): Promise<void> {
//     const {event: {data: [account, balance]}} = event;
//     //Create a new Account entity with ID using block hash
// 	let record = new
//     Account(event.extrinsic.block.block.header.hash.toString());
//     //Assign the Polkadot address to the account field
//     record.account = account.toString();
//     //Assigh the balance to the balance field "type cast as Balance"
//     record.balance = (balance as Balance).toBigInt();
//     await record.save();
// }

import {SubstrateExtrinsic,SubstrateEvent,SubstrateBlock} from "@subql/types";
import {Account} from "../types";
import {Balance} from "@polkadot/types/interfaces";


export async function handleBlock(block: SubstrateBlock): Promise<void> {
    // //Create a new starterEntity with ID using block hash
    let record = new Account(block.block.header.hash.toString());
    // //Record block number
    // record.field1 = block.block.header.number.toNumber();
    // await record.save();

    logger.info('record----'+record.account)
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    // const {event: {data: [account, balance]}} = event;
    // //Retrieve the record by its ID
    // const record = await StarterEntity.get(event.block.block.header.hash.toString());
    // record.field2 = account.toString();
    // //Big integer type Balance of a transfer event
    // record.field3 = (balance as Balance).toBigInt();
    // await record.save();
    logger.info('handle event')
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
    // const record = await StarterEntity.get(extrinsic.block.block.header.hash.toString());
    // //Date type timestamp
    // record.field4 = extrinsic.block.timestamp;
    // //Boolean tyep
    // record.field5 = true;
    // await record.save();
    logger.info('handle call')
}