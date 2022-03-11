import {SubstrateEvent, SubstrateBlock} from "@subql/types";
import {Account} from "../types";
import {Balance} from "@polkadot/types/interfaces";
import { AccountInfo, EventRecord } from "@polkadot/types/interfaces/system";

export async function handleBlock(block: SubstrateBlock): Promise<void> {    
    let blockNumber = block.block.header.number.toBigInt();
    logger.info("Processing blockNumber============= " + blockNumber);

    let events = block.events;

    let accountsInBlock: string[] = [];
    let accountsInEvent: string[] = [];
    for (let i = 0; i < events.length; i++) {
        let eventRecord = events[i];
        let method = eventRecord.event.method
        switch (method) {
            case "BalanceSet":
                accountsInEvent=await handleBalanceSet(block, eventRecord);
                break;
            case "Deposit":
                await handleDeposit(block, eventRecord);
                break;
            case "DustLost":
                accountsInEvent=await handleDustLost(block, eventRecord);
                break;
            case "Endowed":
                accountsInEvent=await handleEndowed(block, eventRecord);
                break;
            case "Reserved":
                accountsInEvent=await handleReserved(block, eventRecord);
                break;
            case "ReserveRepatriated":
                accountsInEvent=await handleReserveRepatriated(block, eventRecord);
                break;
            case "Slashed":
                accountsInEvent=await handleSlashed(block, eventRecord);
                break;
            case "Transfer":
                accountsInEvent=await handleTransfer(block, eventRecord); 
                break;
            case "Unreserved":
                accountsInEvent=await handleUnreserved(block, eventRecord); 
                break;
            case "Withdraw":
                accountsInEvent=await handleWithdraw(block, eventRecord); 
                break;
            default:
                //logger.info("Ignoring method -- "+ method)
                break;
        }    
        for (const account of accountsInEvent) {
            accountsInBlock.push(account)
        }
    }
    if (accountsInBlock.length > 0) {
        for (const account of accountsInBlock) {
            await handleTotalBalance(block, account)
        }
    }
}

export async function handleBalanceSet(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, balance1, balance2] = event.event.data.toJSON() as [string, bigint, bigint];
    //logger.info(`Handling BalanceSet!: ${JSON.stringify(event)}`);
    //logger.info("Account " + account + " Balance " + balance1 + " Balance2 " + balance2)
    return [account]
}
  
export async function handleDeposit(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    //logger.info(`Handling Deposit!: ${JSON.stringify(event)}`);
    //logger.info("Account " + account + " Balance " + balance) 
    return [account]
}

export async function handleDustLost(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    //logger.info(`Handling DustLost!: ${JSON.stringify(event)}`);
    //logger.info("Account " + account + " Balance " + balance) 
    return [account]
}
export async function handleEndowed(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    //logger.info(`Handling Endowed!: ${JSON.stringify(event)}`);
    //logger.info("Account " + account + " Balance " + balance) 
    return [account]
}
export async function handleReserved(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    //logger.info(`Handling Reserved!: ${JSON.stringify(event)}`);
    //logger.info("Account " + account + " Balance " + balance) 
    return [account]
}
export async function handleReserveRepatriated(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, account2, balance, balance2] = event.event.data.toJSON() as [string, string, bigint, bigint];
    //logger.info(`Handling ReserveRepatriated!: ${JSON.stringify(event)}`);
    //logger.info("Account " + account + " Account2 " + account2 + " Balance " + balance + " Balance2 " + balance2) 
    return [account, account2]
}
export async function handleSlashed(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    //logger.info(`Handling Slashed!: ${JSON.stringify(event)}`);
    //logger.info("Account " + account + " Balance " + balance) 
    return [account]
}
export async function handleTransfer(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, account2, balance] = event.event.data.toJSON() as [string,string, bigint];
    return [account, account2]
}

export async function handleUnreserved(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    //logger.info(`Handling Unreserved!: ${JSON.stringify(event)}`);
    //logger.info("Account " + account + " Balance " + balance) 
    return [account]
}
export async function handleWithdraw(block: SubstrateBlock, event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    return [account]
}
export async function handleTotalBalance(block: SubstrateBlock, account: string): Promise<void> { 
    logger.info("Processing account!: " + account);
    const raw: AccountInfo = (await api.query.system.account(
        account
      )) as unknown as AccountInfo;

    if (raw) {
        //logger.info("Account is " + account)
        logger.info("Raw is " + raw)  
        //logger.info("Free " + raw.data.free.toBigInt()) 
        //logger.info("Reserved " + raw.data.reserved.toBigInt())
        //logger.info("Total " + raw.data.free.toBigInt() + raw.data.reserved.toBigInt())
        let record = await Account.get(account);
        if (!record) {
            record = Account.create({
                id: account,
                account: account
              });
            //logger.info("Found new account " + record)
        }
        record.freeBalance = raw.data.free.toBigInt();
        record.reserveBalance = raw.data.reserved.toBigInt();
        record.totalBalance = raw.data.free.toBigInt() + raw.data.reserved.toBigInt();
        record.blockNumber = block.block.header.number.toBigInt();

        await record.save().then((ress) => {
            logger.info("totalAccount save =>"+ ress)
        })
        .catch((err) => {
            logger.info("totalAccount error => " + err)
        });        
    } else {
        logger.info("No raw==============================")
    }
}