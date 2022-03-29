import {SubstrateEvent} from "@subql/types";
import {EventRecord} from "@polkadot/types/interfaces/system";

export async function getEventAccounts(event: SubstrateEvent): Promise<string[]> {    
    let accountsInEvent: string[] = [];
    let method = event.event.method
    switch (method) {
        case "BalanceSet":
            accountsInEvent=await handleBalanceSet(event);
            break;
        case "Deposit":
            await handleDeposit(event);
            break;
        case "DustLost":
            accountsInEvent=await handleDustLost(event);
            break;
        case "Endowed":
            accountsInEvent=await handleEndowed(event);
            break;
        case "Reserved":
            accountsInEvent=await handleReserved(event);
            break;
        case "ReserveRepatriated":
            accountsInEvent=await handleReserveRepatriated(event);
            break;
        case "Slashed":
            accountsInEvent=await handleSlashed(event);
            break;
        case "Transfer":
            accountsInEvent=await handleTransfer(event); 
            break;
        case "Unreserved":
            accountsInEvent=await handleUnreserved(event); 
            break;
        case "Withdraw":
            accountsInEvent=await handleWithdraw(event); 
            break;
        default:
            //logger.info("Ignoring method -- "+ method)
            break;
    }    
    return accountsInEvent
    
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

