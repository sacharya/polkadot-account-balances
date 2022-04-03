import {SubstrateBlock, SubstrateEvent} from "@subql/types";
import {Account} from "../types";
import { AccountInfo } from "@polkadot/types/interfaces/system";
import {getEventAccounts, getBlockAccounts, readEspecialAccounts} from "../handlers";

export async function handleBlock(block: SubstrateBlock): Promise<void> {    
    let blockNumber = block.block.header.number.toBigInt();
    logger.info("Processing events in block " + blockNumber);

    let accountsInBlock = await getBlockAccounts(block)

    let especialAccountsOnly = true

    if (especialAccountsOnly==true) {
        let blockNum= block.block.header.number.toNumber()
        if(blockNum==9658000) {
            let espAccounts = await readEspecialAccounts()
            for (const account of espAccounts) {
                accountsInBlock.push(account)
            }
        }
    }


    if (accountsInBlock.length > 0) {
        for (const account of accountsInBlock) {
            await saveAccountBalance(block.block.header.number.toBigInt(), account)
        }
    }
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    let blockNumber = event.block.block.header.number.toBigInt()
    logger.info("Processing event " + event.idx +  " in block " + blockNumber);
    
    let accountsInEvent = await getEventAccounts(event)

    let especialAccountsOnly = true

    if (especialAccountsOnly==true) {
        let blockNum= event.block.block.header.number.toNumber()
        if(blockNum==9658000) {
            let espAccounts = await readEspecialAccounts()
            for (const account of espAccounts) {
                accountsInEvent.push(account)
            }
        }
    }

    if (accountsInEvent.length > 0) {
        for (const account of accountsInEvent) {
            await saveAccountBalance(event.block.block.header.number.toBigInt(), account)
        }
    }
}

export async function saveAccountBalance(blockNumber: bigint, account: string): Promise<void> { 
    logger.info("Processing account!: " + account);
    const raw: AccountInfo = (await api.query.system.account(
        account
      )) as unknown as AccountInfo;

    if (raw) {
        logger.info("Raw is " + raw)  
        let record = await Account.get(account);
        if (!record) {
            record = Account.create({
                id: account,
                account: account
              });
        }
        record.freeBalance = raw.data.free.toBigInt();
        record.reserveBalance = raw.data.reserved.toBigInt();
        record.totalBalance = raw.data.free.toBigInt() + raw.data.reserved.toBigInt();
        record.blockNumber = blockNumber

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