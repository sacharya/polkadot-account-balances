import {SubstrateBlock} from "@subql/types";
import {EventRecord} from "@polkadot/types/interfaces/system";

export async function getBlockAccounts(block: SubstrateBlock): Promise<string[]> {    
    let events = block.events;

    let accountsInBlock: string[] = [];
    let accountsInEvent: string[] = [];
    for (let i = 0; i < events.length; i++) {
        let eventRecord = events[i];
        let method = eventRecord.event.method
        switch (method) {
            case "BalanceSet":
                accountsInEvent=await handleBalanceSet(eventRecord);
                break;
            case "Deposit":
                await handleDeposit(eventRecord);
                break;
            case "DustLost":
                accountsInEvent=await handleDustLost(eventRecord);
                break;
            case "Endowed":
                accountsInEvent=await handleEndowed(eventRecord);
                break;
            case "Reserved":
                accountsInEvent=await handleReserved(eventRecord);
                break;
            case "ReserveRepatriated":
                accountsInEvent=await handleReserveRepatriated(eventRecord);
                break;
            case "Slashed":
                accountsInEvent=await handleSlashed(eventRecord);
                break;
            case "Transfer":
                accountsInEvent=await handleTransfer(eventRecord); 
                break;
            case "Unreserved":
                accountsInEvent=await handleUnreserved(eventRecord); 
                break;
            case "Withdraw":
                accountsInEvent=await handleWithdraw(eventRecord); 
                break;
            default:
                //logger.info("Ignoring method -- "+ method)
                break;
        }    
        for (const account of accountsInEvent) {
            accountsInBlock.push(account)
        }
    }
    return accountsInBlock
}

async function handleBalanceSet(event: EventRecord): Promise<string[]> { 
    const [account, balance1, balance2] = event.event.data.toJSON() as [string, bigint, bigint];
    return [account]
}

async function handleDeposit(event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    return [account]
}

async function handleDustLost(event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    return [account]
}

async function handleEndowed(event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    return [account]
}

async function handleReserved(event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    return [account]
}

async function handleReserveRepatriated(event: EventRecord): Promise<string[]> { 
    const [account, account2, balance, balance2] = event.event.data.toJSON() as [string, string, bigint, bigint];
    return [account, account2]
}

async function handleSlashed(event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    return [account]
}

async function handleTransfer(event: EventRecord): Promise<string[]> { 
    const [account, account2, balance] = event.event.data.toJSON() as [string,string, bigint];
    return [account, account2]
}

async function handleUnreserved(event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    return [account]
}

async function handleWithdraw(event: EventRecord): Promise<string[]> { 
    const [account, balance] = event.event.data.toJSON() as [string, bigint];
    return [account]
}

