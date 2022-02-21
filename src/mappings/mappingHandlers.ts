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

import {SubstrateEvent, SubstrateBlock} from "@subql/types";
import {Account} from "../types";
import {Balance} from "@polkadot/types/interfaces";
import {EventRecord } from "@polkadot/types/interfaces/system";

export async function handleBlock(block: SubstrateBlock): Promise<void> {    
    let blockNumber = block.block.header.number.toBigInt();
    let events = block.events;
    for (let i = 0; i < events.length; i++) {
        let eventRecord = events[i];
        let method = eventRecord.event.method
        switch (method) {
            case "BalanceSet":
                handleBalanceSet(block, eventRecord);
                break;
            case "Deposit":
                handleDeposit(block, eventRecord);
                break;
            case "DustLost":
                handleDustLost(block, eventRecord);
                break;
            case "Endowed":
                handleEndowed(block, eventRecord);
                break;
            case "Reserved":
                handleReserved(block, eventRecord);
                break;
            case "ReserveRepatriated":
                handleReserveRepatriated(block, eventRecord);
                break;
            case "Slashed":
                handleSlashed(block, eventRecord);
                break;
            case "Transfer":
                handleTransfer(block, eventRecord); 
                break;
            case "Unreserved":
                handleUnreserved(block, eventRecord); 
                break;
            case "Withdraw":
                handleWithdraw(block, eventRecord); 
                break;
            case "ExtrinsicSuccess":
                handleExtrinsicSuccess(block, eventRecord);
                break;
            case "CandidateIncluded":
                handleCandidateIncluded(block, eventRecord);
                break;
            case "CandidateBacked":
                handleCandidateBacked(block, eventRecord);
                break;
            default:
                logger.info("Ignoring method -- "+ method)
                break;
        }
     
    }
}

export async function handleBalanceSet(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance1, balance2] = event.event.data.toJSON() as [string, bigint, bigint];
    logger.info(`Handling BalanceSet!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance1 + " Balance2 " + balance2)
}
  
export async function handleDeposit(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling Deposit!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}

export async function handleDustLost(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling DustLost!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}
export async function handleEndowed(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling Endowed!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}
export async function handleReserved(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling Reserved!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}
export async function handleReserveRepatriated(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, account2, balance, balance2] = event.event.data.toJSON() as [string, string, bigint, bigint];
    logger.info(`Handling ReserveRepatriated!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Account2 " + account2 + " Balance " + balance + " Balance2 " + balance2) 
}
export async function handleSlashed(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling Slashed!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}
export async function handleTransfer(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, account2, balance] = event.event.data.toJSON() as [string,string, bigint];
    logger.info(`Handling Transfer!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Account2 " + account2 + " Balance " + balance) 
}
export async function handleUnreserved(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling Unreserved!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}
export async function handleWithdraw(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling Withdraw!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}

export async function handleExtrinsicSuccess(block: SubstrateBlock, event: EventRecord): Promise<void> {
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling ExtrinsicSuccess!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}

export async function handleCandidateIncluded(block: SubstrateBlock, event: EventRecord): Promise<void> {
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling CandidateIncluded!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}

export async function handleCandidateBacked(block: SubstrateBlock, event: EventRecord): Promise<void> {
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling CandidateBacked!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}

