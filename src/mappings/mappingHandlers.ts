import {SubstrateEvent, SubstrateBlock} from "@subql/types";
import {Account, Transfer} from "../types";
import {Balance} from "@polkadot/types/interfaces";
import { EventRecord } from "@polkadot/types/interfaces/system";

const test_account = "15zAzu3hKv3HDVbR9CJKG5RfJ4WYqaUZBybmX6ETVzP5L98e";

export async function handleBlock(block: SubstrateBlock): Promise<void> {    
    let blockNumber = block.block.header.number.toBigInt();
    let events = block.events;
    for (let i = 0; i < events.length; i++) {
        let eventRecord = events[i];
        let method = eventRecord.event.method
        switch (method) {
            /*case "BalanceSet":
                handleBalanceSet(block, eventRecord);
                break;*/
            /*case "Deposit":
                handleDeposit(block, eventRecord);
                break;*/
            /*case "DustLost":
                handleDustLost(block, eventRecord);
                break;*/
            /*case "Endowed":
                handleEndowed(block, eventRecord);
                break;*/
            /*case "Reserved":
                handleReserved(block, eventRecord);
                break;
            case "ReserveRepatriated":
                handleReserveRepatriated(block, eventRecord);
                break;
            case "Slashed":
                handleSlashed(block, eventRecord);
                break;*/
            case "Transfer":
                handleTransfer(block, eventRecord); 
                handleTransferAccount(block, eventRecord); 
                break;
            /*case "Unreserved":
                handleUnreserved(block, eventRecord); 
                break;*/
            /*case "Withdraw":
                handleWithdraw(block, eventRecord); 
                break;*/
            /*default:
                logger.info("Ignoring method -- "+ method)
                break;*/
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
    if (account.toString() != test_account) {
        return
    }
    logger.info(`Handling Deposit!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 

    logger.info("Block " + block.block.header.hash.toString())
    let record = await Account.get(account.toString());
    if (record === undefined){
        record = createAccount(account.toString());
        logger.info("Found new account " + account.toString())
    }
    let old_balance = record.balance
    record.balance = record.balance + BigInt(balance)
    logger.info("====Added deposit:  (" + old_balance + "+" + balance + ")=" + record.balance)
    await record.save();
}

function createAccount(account: string): Account {
    const entity = new Account(account);
    entity.account = account;
    entity.balance = BigInt(0);
    return entity;
}

export async function handleDustLost(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling DustLost!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}
export async function handleEndowed(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    if (account.toString() != test_account) {
        return
    }
    logger.info(`Handling Endowed!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 

    logger.info("Block " + block.block.header.hash.toString())
    let record = await Account.get(account.toString());
    if (record === undefined){
        record = createAccount(account.toString());
        logger.info("Found new account " + account.toString())
    }
    let old_balance = record.balance
    record.balance = record.balance + BigInt(balance)
    logger.info("====Added endowed:  (" + old_balance + "+" + balance + ")=" + record.balance)
    await record.save();
    
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
    if (account.toString() != test_account && account2.toString() != test_account) {
        return
    }
    logger.info(`Handling Transfer!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Account2 " + account2 + " Balance " + balance) 

    if (account.toString() == test_account) {
        logger.info("Block " + block.block.header.hash.toString())
        let record = await Account.get(account.toString());
        if (record === undefined){
            record = createAccount(account.toString());
            logger.info("Found new account " + account.toString())
        }
        let old_balance = record.balance
        record.balance = record.balance - BigInt(balance)
        logger.info("====Deducted transfer:  (" + old_balance + "-" + balance + ")=" + record.balance)
        await record.save();
    }
    if (account2.toString() == test_account) {
        logger.info("Block " + block.block.header.hash.toString())
        let record = await Account.get(account2.toString());
        if (record === undefined){
            record = createAccount(account2.toString());
            logger.info("Found new account " + account2.toString())
        }
        let old_balance = record.balance

        record.balance = record.balance + BigInt(balance)
        await record.save();
    }
}

export async function handleTransferAccount(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, account2, balance] = event.event.data.toJSON() as [string,string, bigint];
    if (account.toString() != test_account && account2.toString() != test_account) {
        return
    }
    logger.info(`Handling Transfer1!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Account2 " + account2 + " Balance " + balance) 

     //add data into transfer
     const transfer = new Transfer(block.block.header.hash.toString());
     transfer.blockNumber = block.block.header.number.toBigInt();
     transfer.amount = balance;
     transfer.fromAccount = account;
     transfer.toAccount = account2;

     logger.info("====Saved transfer account:  (Balance " + balance + " at blocknumber " + transfer.blockNumber + ")")
     await transfer.save().then((ress) => {
        logger.info("transfer save =>"+ ress)
    })
    .catch((err) => {
        logger.info("transfer error => " + err)
    });
}


export async function handleUnreserved(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    logger.info(`Handling Unreserved!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 
}
export async function handleWithdraw(block: SubstrateBlock, event: EventRecord): Promise<void> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    if (account.toString() != test_account) {
        return
    }
    logger.info(`Handling Withdraw!: ${JSON.stringify(event)}`);
    logger.info("Account " + account + " Balance " + balance) 

    logger.info("Block " + block.block.header.hash.toString())
    let record = await Account.get(account.toString());
    if (record === undefined){
        record = createAccount(account.toString());
        logger.info("Found new account " + account.toString())
    }
    let old_balance = record.balance
    record.balance = record.balance - BigInt(balance)
    logger.info("====Deducted withdraw:  (" + old_balance + "-" + balance + ")=" + record.balance)
    await record.save();
}