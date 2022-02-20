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
// account -- 0x056c0fd3e977395a99980c3e4e3e98aa3f52dcb0a8a517d034ac3ee5e3a24ef7
// dotsama_subql-subquery-node-1   |  event  -- {"phase":{"applyExtrinsic":0},"event":{"index":"0x0000","data":[{"weight":158654000,"class":"Mandatory","paysFee":"Yes"}]},"topics":[]},{"phase":{"applyExtrinsic":1},"event":{"index":"0x3501","data":[{"descriptor":{"paraId":1000,"relayParent":"0xc6585d3c33252a09be37f17429fce350aa4e36162b61829284348254b3b6ae04","collator":"0xfce39923bbff6523efcaa4de50436f66bc7927305829e1a0e0bc13b1897da967","persistedValidationDataHash":"0x1c2f558abcb8db69dbffe114cadf9218d68119e58a65ebcd18b90651d71c5c0b","povHash":"0x384bcbd1185d113bf9072edd103571cae7c35d4bf2fca4eda0e195f865d3096f","erasureRoot":"0xd257af01c4752f2101de676076203088c9fd750b2d227700a80679d82bc5e0e8","signature":"0x5ce19f2a040dcff3d06144e1d9ba9d8ccedeaea8d1225ef6e269373837ec1f09a43726f237f9de99e6d425eff37f64ee7cf73b72803fadea04a7e90ed2da7489","paraHead":"0xfa61b0460ef75472d40f7f04d2287fb48d25f2e23256b634b3fb418e7da1fc83","validationCodeHash":"0xc28865d04f32588c55eb3e40c8fb5e950283cc0131ace6e79a5501572faa6dee"},"commitmentsHash":"0xae2ae18f5e56a249e24014d2e5f7062102666d3bcd90f978550a4e1ca8d1a0f0"},"0x22b07eb92ff6f06ebf3776c7798a4e0fa97a358703cbbfb02c314df8948f3474c2e82a00ab524e5f3c6f5aa0643a7d74849ef6dcc9c6d23335e0424dba9489848afba698616f1c9f15a99e55b564a79f2f362a21b56c85adaf8de09870677569b4b3ee8c08066175726120d3062c080000000005617572610101348e9b59944a32fe8483b8377cd34e73c2bb09a7d119ca6ce562fcdaaa21c088700551942dd9608b423e8cdc5d90ecc3c6b72f2acf32bc89b0fd83535f60f509",0,35]},"topics":[]},{"phase":{"applyExtrinsic":1},"event":{"index":"0x3501","data":[{"descriptor":{"paraId":2004,"relayParent":"0xc6585d3c33252a09be37f17429fce350aa4e36162b61829284348254b3b6ae04","collator":"0x2e16a6268b9c95b92326145696e3d09483712c09e20b2751bbc0f81c550d2a47","persistedValidationDataHash":"0xf0408312915ee3e0159a60ae080ef01c15169f0ca3f25a10c8aed9449a6a63fd","povHash":"0xbf30875848645420c4ae4135f57bfa939ebaa152d4651c3f18c435494a2a01c6","erasureRoot":"0xf75b53e2686938db9407979a346f5117c68ad514d6542a0e704015e6880d1014","signature":"0xb019a8b0a7ed49a90e1179ae85c197788557deb19a31d973cd0e419bd1d0e47a736ec5dd5b09b6c5dcb6845b6460bccfc791a645cf5a7fdb08913704e57e2f8d","paraHead":"0x654e94874ecba34e66a09ab10a2aa4ede4651de1df53e1a720101aa263f7d70d","validationCodeHash":"0x97baa6a8847c94aecab65f3800ca581bbf47d6d0425aa9494a66593bfc0d47f2"},"commitmentsHash":"0x84374bfe28c277e857dc47a0f20e7c0ee4ce0674f59313429c66d8849456af0a"},"0x0a05fdd02897bdf5edc0e409d9bf63a98145bd53b3765b2fa6308ef660e87f3e3ac51a00e4d876beeeaa20c16d71545428131dd56bcbb3eb37deda8398ce3cbe4fff560a520be4d719cfc7039bf7c5cda497a99c48ddb4c884b702c812dd3380db3ebc770c066e6d62738064d5aaafbb1a0ad3b57d184a9941acb4ce9dc36d661a7a314a3ba538d26977150466726f6e890201af7fa235de0d9db0654e3bbe07f9e0ea8880f80baf7e302fd8130c3e4519f23f1088e36b8e6a4a97363a62e45a8efbb2681fe6d944662f6deb5700c426a9419972cde64f232c98d1179760082d29c073484c442d40dd18ae8b6a2bb2b55c75c142ab91435f8f3ca0b3c0c1d1323f6752b1d96641f944b13bb26a9b4ecdc70f4b33739171e51e0ab8102233200ba45f0cd0f3a707e9beb76f0e22e074ad8581c42f056e6d627301017ea658978bc9468e8e4a977ae772e0e542b36c9a7c70d4fc724d0411521e2f395d1362740f65866d7a4502d3cdd9c60c97958db48ce72476f73d3a3d9540318c",3,38]},"topics":[]},{"phase":{"applyExtrinsic":1},"event":{"index":"0x3500","data":[{"descriptor":{"paraId":2000,"relayParent":"0xf096d7cd0ba36b0d4f53cae4fb37895fe09dbbcd30006320603190041143ca6e","collator":"0xa6fa119f64ea40ef1cc07ed634d54f93e4f3cc5f045adc6ae511cc2364be4b59","persistedValidationDataHash":"0xa65c87fad7271e4ce3bbc5a55bd48ac894731270b7edc957a885c74014b42991","povHash":"0x59008bc90bcd2978950377daad81647ba5f9405270bab3eca6c13e52fb19fc1d","erasureRoot":"0x72e8856395689f3efb11d5ded652bf9b824727d76b0828548ccc1862b91dcbfb","signature":"0x563c21c904c69f3478d0ddd41965788e809a84914592b5e849289fafeeba464e5d77001885109db9700f60f1a378436ffb12c8f4b14a485cb7c5cb36af89a98b","paraHead":"0xcb1d976586127b87afd91b72c9f57aedd3db07fb47085a36ea035f5c28504027","validationCodeHash":"0x02c3379563912bd5715a328a84affe95cd86f2f02f517d7f3831ddfb844efd5b"},"commitmentsHash":"0xc0fe17ad5a9b0113ad7e3c28e49b023f5c5e2d9d358f6e8326b56a4cee2c9409"},"0x0fdf6df12c93a783b74bfd2e3a558b5c299341bfd7503460289aa4ee40b4a2fa7a9b1a00a7757ac95cb23a8c88501c545cb6f1c9c3e85ad876755a26cb61b75869fd79e02bda9d1ad6ddd2f1dfe056bf3ecc8f32919d83d0522d3197f500a3f1cbb0808c08066175726120d4062c080000000005617572610101821312061050f226012645ff678d0fcdb8cd5cdc91216e938a8a9e794bdb4a43972e90dbb2919d9c1ce97afc17e556aeccd5538bb6298f595b0cc1ea54ec6e89",1,36]},"topics":[]},{"phase":{"applyExtrinsic":1},"event":{"index":"0x3500","data":[{"descriptor":{"paraId":2002,"relayParent":"0xf096d7cd0ba36b0d4f53cae4fb37895fe09dbbcd30006320603190041143ca6e","collator":"0x4c2c7a36d73388432c8a9e495975538bf61d883e93b0d255cbe3ae2969f8be31","persistedValidationDataHash":"0xcf75172392d6bfe5ae43ed6f2abb167396a0bf6f7997fdb04c08d4f14ef81293","povHash":"0x16a5e6813af17b28f606efeba4090dd4ad9486edba5610fd0a4859ee1935aaf4","erasureRoot":"0xb52e348f39593f48a752673a97ea8212e752b243b4d3cc1cbc108b4c6a6d2a36","signature":"0xd41c2423bbd24722eb257980c575467de530186dae7a91fe6351b1b219a1d9476d83d1e19de0443b9bc9dd1aa299bcc2c32515f5203f6f2d9af3365df3a0e781","paraHead":"0x152f515b82aedf0ddb1593fe4d005555338043152b331cc64e9f5d8c2cbda6a8","validationCodeHash":"0x61aa4952356ef46453837c0b40c3f77dd684468208baf236c3ff88747201ee65"},"commitmentsHash":"0x0c54feddb5844babfa39fd5b8cd30ca53254142d14e24a6ff8e3f6aa774027bd"},"0x16a22ced637a9488061d2bb2fa99919338c15e34f8e6f3669a0075d56a94bde0deb81900adf83243a84f6ff6b3ac50fcad4260e5857169574bfb60af9ad32dc46730b5600420490963142b9fe7a469febcde9d7c3f22843981595303f11d81a882ac4dfc0c066175726120a80d5810000000000466726f6e8801d436a198618833384eee6e5daa4a2017583b32bc1b708df3893683b549579f8100056175726101015a862245723049f5484aed6b336568871ed15f7040b46265b3d6d71bc9eb9775c26f8fa45947cf229888cd4b3b3e6eafc1c645c2107412881b9cc394a568fb8f",2,37]},"topics":[]},{"phase":{"applyExtrinsic":1},"event":{"index":"0x3500","data":[{"descriptor":{"paraId":2006,"relayParent":"0xf096d7cd0ba36b0d4f53cae4fb37895fe09dbbcd30006320603190041143ca6e","collator":"0x4a1196f5b9721787f4a902bfe80f0cfa53bf1573027e772462426077b0e3cb2a","persistedValidationDataHash":"0x89609944bc4775cd579f9a530314d90ab2468152159f59196b216c87625409c1","povHash":"0x5db89445ecaf1a12690cb07bbc1837fbecfa032a5ad855da836bf1db1643d475","erasureRoot":"0x32b03c9251485007ca62495d6c3ecec8fd2fbf5faff7716ec71028d44f784ead","signature":"0xd0468e1dae32952ed7f39c0cae5d3c969ff06f4e23dd979880b417447feb6628d528c255f1f7fbb56aa8c77fb9607a188354293637a0935ec67eb2a962c47b8b","paraHead":"0x4c270279b747b36a594ac7e158fcb72ec55dab9de63230ec16c005d63ee57add","validationCodeHash":"0x7f249e49ef459acbabe5b169e31f30fabe93d993c49e685c8a78b8cf5390ef0a"},"commitmentsHash":"0xf1153142fc45fdb48276f1a113d04fa84b59822b8037ae8c7bc4f84b59a110ad"},"0xac14d36dc70295fa3c516abb5d12bea6338d8e8b7c03ded1862b6f86260d4156ce321b0036e9082c2a30e555107359952cc023dea12833529faf498ed29ee40c8e07296a0700d3ab54e290b718a5f28768bd8aab5788c7d7252c9085ea0540f54b3c4da60c066175726120d4062c08000000000466726f6e8801281075948180c0d1397f219d7b5b9023fdcf10127716014f32807a21beeff6bf0005617572610101e0611fba4274500618e4c97725dd61ff68622328d607aeef7c90e06a2047cc5a8d7702bc9c7f211d1074ce50f22dbaffaf445461853970a7995e07e47bae898b",4,39]},"topics":[]},{"phase":{"applyExtrinsic":1},"event":{"index":"0x0000","data":[{"weight":471791820000,"class":"Mandatory","paysFee":"Yes"}]},"topics":[]},{"phase":{"applyExtrinsic":2},"event":{"index":"0x0508","data":["12C3n1drQXk1fMerqnyhwY9PGe5W2S3CJBukd9WrPinr6ApJ",169000014]},"topics":[]},{"phase":{"applyExtrinsic":2},"event":{"index":"0x0004","data":["12C3n1drQXk1fMerqnyhwY9PGe5W2S3CJBukd9WrPinr6ApJ"]},"topics":[]},{"phase":{"applyExtrinsic":2},"event":{"index":"0x0502","data":["12C3n1drQXk1fMerqnyhwY9PGe5W2S3CJBukd9WrPinr6ApJ","14hyogTZNqGwpNhUNSXgyVQSPETkktK9cnUFto98vdBbgR7Q",424704699986]},"topics":[]},{"phase":{"applyExtrinsic":2},"event":{"index":"0x0507","data":["13UVJyLnbVp9RBZYFwFGyDvVd1y27Tt8tkntv6Q7JVPhFsTB",127200011]},"topics":[]},{"phase":{"applyExtrinsic":2},"event":{"index":"0x1306","data":[127200011]},"topics":[]},{"phase":{"applyExtrinsic":2},"event":{"index":"0x0507","data":["14d2kv44xf9nFnYdms32dYPKQsr5C9urbDzTz7iwU8iHb9az",41800003]},"topics":[]},{"phase":{"applyExtrinsic":2},"event":{"index":"0x0000","data":[{"weight":186670000,"class":"Normal","paysFee":"Yes"}]},"topics":[]}