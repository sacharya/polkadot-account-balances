import {SubstrateBlock} from "@subql/types";
import {EventRecord} from "@polkadot/types/interfaces/system";

export async function getBlockAccounts(block: SubstrateBlock): Promise<string[]> {    
    let accountsInBlock: string[] = [];

    let especialAccountsOnly = true

    if (especialAccountsOnly==true) {
        let blockNumber = block.block.header.number.toNumber()
        if(blockNumber%10000==0) {
            let espAccounts = await readEspecialAccounts()
            for (const account of espAccounts) {
                accountsInBlock.push(account)
            }
            return accountsInBlock
        } else {
            return []
        }
    }

    let events = block.events;

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

//cat accounts.txt  | awk '{ print "\""$0"\","}'
async function readEspecialAccounts(): Promise<string[]>{
    return ["12xtAYsRUrmbniiWQqJtECiBQrMn8AypQcXhnQAc6RB6XkLW",
    "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK",
    "16ZL8yLyXv3V3L3z9ofR1ovFLziyXaN1DPq4yffMAZ9czzBD",
    "13UVJyLnbVp77Z2t6rZ2mGqgqgyRvTu9GbDaaxonzJ1UDQPi",
    "13UVJyLnbVp77Z2t6rXwoAfLPiGe6FVeKuTYPC4T8zWZ8vTS",
    "13UVJyLnbVp9RBZYFwFGyDvVd1y27Tt8tkntv6Q7JVPhFsTB",
    "18GSww8t2iZdejY4nLAJX7q7AcS52VzsjziHXUNPezrsFwu",
    "1743nDTMZisPgBCYSAgkUn1kVG7MePc9rvMEjoRNf4ipVkF",
    "14Ns6kKbCoka3MS4Hn6b7oRw9fFejG8RH5rq5j63cWUfpPDJ",
    "16DGiP6jDwAfkAeqGfkUCtheKgUzTy7UeaiFFBAv8BwX3RhN",
    "11uxhjMSBpFKisDMg36WPVZrqELeGVteeq1eoQKhqHbXVta",
    "12Z6FSvMFRjno881i1qpFndrtZtcVCLs5v4nR92McQNX31CT",
    "14NEHDwc5PPQfEjzLVDbVbi4djQLQZ9u7mMU3BPhTFJf4cD6",
    "15DD5dzKfshzivTzFHy293Em14aqfu7qmD24RGXu6LqzFEyR",
    "15qhQde3g7t8MyTqZ1pLtJzyw4zxM87myKkvjgKv5VYQWrPW",
    "12ouvKSvKnXAdXFR5oCL1vXimWrkDWG3joMNw3ETupTRs1ab",
    "16GMHo9HZv8CcJy4WLoMaU9qusgzx2wxKDLbXStEBvt5274B",
    "15zFju56Eb1frUBfB6KJg6NN7dst61mZAAjywZyrHZCuoqoh",
    "13UVJyLnbVp77Z2t6rbChVCPjeP1ati99xjezWJUgu1JN8LD",
    "13UVJyLnbVp77Z2t6rZaFKvs4gKpqa6tjw6bgrBTuwkvkc9M",
    "13UVJyLnbVp77Z2t6rYVHDkWchd31MhPoFLZV5S84eG1g26x",
    "14Vaks6esicg9ULNa1VceQuRWCWLMKVuvYrLoUnucFXpQL63",
    "1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu",
    "14ticRRPLVkeWSarb3U6Q5HX858QJ46GcCWWSrWwRowB9nra",
    "12imiRFgMGpPPVRiXLhQixuk1jMeTrQbzSJcZ4Bj7a3idmWT",
    "14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR",
    "14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA",
    "14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX",
    "1tZzPmcq8Auisttygmg9g6tPMtrh9i3b22D3tKXvde7ibRB",
    "12pMRYu1yWmdKDQLo9mWcjJYRPwfcnWBWLYh8tKpuJsCi2yF",
    "11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS",
    "13Xo4xYdMRQQoWD7TA9yCDHG1BXqQFvnjeGvU6LHhRhUsBhQ",
    "14etN8LW2YB2WA7yBYDecyLFPpxMSaeV1nhxYbJi8uMJcfkD",
    "13UVJyLnbVp77Z2t6rdeNj6gk6Tnhsd1n1CEwzUzrKsro4Kc",
    "12UCSRxm3sCoX6tCkycf5TMgA3xY7Uyp44NjqFEHM6gRbcxL",
    "13UVJyLnbVp77Z2t6rd6tg1WX77PnmRGJfKDr77Kvg8QFo1T",
    "12Gu7eXAuWDkoDwrHbP8t5sKTcV9wdCzCtvgEu8rA8hpiFSK",
    "13z6tqM18GgaeVD6H9ciwfyQp5dogD58hWJThu5iXKtHfixb",
    "1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB",
    "15H2G13XawYeBH8S2CnBStoYtPC3uApkcnBLEBorEPbywZoC",
    "1qnJN7FViy3HZaxZK9tGAA71zxHSBeUweirKqCaox4t8GT7",
    "16hp43x8DUZtU8L3cJy9Z8JMwTzuu8ZZRWqDZnpMhp464oEd",
    "13Fv7btqKR2NQVZSaJAK1DhxKpxgjzE8twaWnwDk8B1u6voR",
    "13Th6PcjJ468fy2cQeVDDdHE6ycJ3sFQ5S9wHiQRDkCKR6Tz",
    "13UVJyLnbVp77Z2t6rgMnzYZs3DmHQdm8ibLTRMMUad9V5zB",
    "166JJ1tU9JsjsjvKQ6shhvv54L46BDJq2G6HXmauzwu4AvJh",
    "13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF",
    "16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm",
    "14646qB34KV6FFnQmJr6u3Ju91QyqQXxMKR93JkbP5ayKnXw",
    "15FZotswrG9r6KQvBPb5Y3ybs6CA5FLbFbyzhk4ABfgDup22",
    "13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M",
    "11gqpAyU17G9EFW5n5MNngh824F3Y2as72V2rgc7Wq5JVRd",
    "16fttU3nadc7KgFwxUqLyyryUiqW5VMbVMpTQ18GzNtbK9Tz",
    "12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL",
    "13c1FsantxSuaNocA6pUsAxiinHSVp2m7hUVg1EJSwxf2L2j",
    "16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp",
    "13iVNghf2zS3gnSc8KEZP7JMyQwxscu1XmAH7TZUXvMLeB26",
    "1REEV3CUqiMMfRdeTy9apQwXVabcg2TcQhvsVFtusByZ6ga",
    "14B3z6xL9vGgKz8WptoZabPrgH6adH1ev2Ven4SiTcdznfqd",
    "13yk62yQYctYsRPXDFvC5WzBtanAsHDasenooLAxKvf5bNkK",
    "14NSRugu2B7XPwcyPTFsDsBodZb72NgrhMih6ith8dSSGmfc",
    "14NSRugu2B7XPwcyPTFsDsBodZb72NgrhMih6ith8dSSGmfc",
    "15a6HKkoBaLwAUTbmN1WqVXKeGZJ9yCUkWqc6BBbvmTB3MAN",
    "136GehDWrz4tqL7ivAT53VeS3PweRZDSHyrbnWLdWJpchW8M",
    "13E7LXW3NGYAJGKugiEitKZ4XjR4MXBs4ZhE1bkwBAaAoBCn",
    "14gAowz3LaAqYkRjqUZkjZUxKFUzLtN2oZJSfr3ziHBRhwgc",
    "12TpxxQ9QkXHHnE5DdGRkwhgPAk8ewqEdt479eVHTDUFw1mT",
    "1kyH6C7sivf9Q6r1ahZqKDywH1jkSY7uvCkhB1zwLVYgtsg",
    "14kSBrg1gB8Q8xsTymzQjhvsaLSP6VscPoCfsXArfpAvcbHF",
    "1626DFYAYv5UGwSy6dz3yiGExMxxik68RqQbusnb4MCHEY6e",
    "14gV6s4whdfezXgnT6tJ79nCKLy2GutDpnEVSMBR9TmDpw5m",
    "16E6FVYMaaYs5KNy7cPZp2KsN9Aj7M7vPnoB5VtDPCsiUuSr",
    "1243tzEb446NSpWzPcaeMGpJh2YZ4TwMb4B85yVCt4275fD8",
    "12R2Xsw9PJwncYpTFhQQX1MRJTcsxWZKE3GATwGgCuHhRqkS",
    "12wJqyreWd7FNnhWWNRggVcqGw63mtB4vuyBCwas6YmzpCQf",
    "12wr1Z5L28eXq8hQ36J8XYLai8eMnKxxHNyW165dZ2iLz9Nr",
    "126gbZceb2LfgCpQodK8suxBoc48tgpK4vFcvDo9WuL2RsZr",
    "14uNF4i4TGzr1LpDSUHxemRowgV2ivNw2pT3HMqrHW2jSjZh",
    "1QsSZ2AigyGUGRiHCVfE3GLRyddbf6mui4iYmtPUjF1MMVT",
    "14pcqiAn55rx8vccGuHp4DUcbnjFWUtL1Q9MBfWrJFmJWiRr",
    "13UVJyLnbVp77Z2t6rgdY269yXtxjxjdsPXr1N3BwQVsktTK",
    "16exbdjFr5x9CfPXHztZA3HUzQGNiFggfZFLM1k33QZW8gK7",
    "12dfEn1GycUmHtfEDW3BuQYzsMyUR1PqUPH2pyEikYeUX59o",
    "13UVJyLnbVp77Z2t6rf15rpdJZqmze8PTMtnhhvBATFW962g",
    "13UVJyLnbVp77Z2t6rhB25BLCXFMf4wPLjQs7FQrs4FLJ9eX",
    "13AE11jLvxcxsjqaSoWFXCTGUfbjXb1gmZTY8x3TXJzWutmf",
    "1odhHWsddwRnDQLpyKypBSNhqQbFi43RuHxVaCgeTVEcQv7",
    "15krc9n21DNmYu79p7XeF6dtvphHxjt5W89Hp7Hqe2tvMYYb",
    "143VKnUS6QyPRngaciPoHLMDWRARZNRZg1X7ovk8nJWnyo51",
    "12uZhfbXmB9ZQHVhjytbvNcJFw5be8NghqtSx1JL9rfFJmt2",
    "13GqChUjYkddXifBoQEa1cVvsGNzyjj8vbaQfYcfUY8ySYv9",
    "12RYJb5gG4hfoWPK3owEYtmWoko8G6zwYpvDYTyXFVSfJr8Y",
    "13VxGL29iCHbmJuaCAhJKVxq7L6XQf2EGqrN2bdJYSnwBTFe",
    "126p7YRuTKaBpyLyb7EiuQsKG5kbqhnGmnuCgAFumFrASNkr",
    "123LeWBmpg2YKR8CGez2u94CXQ5jx6FjoCQigCGrXe6sQ6Xk",
    "147UVPkuBAjL7tZpqqgM4JEVJMtZEaUvSwoiDVpf4wyELB1",
    "16BPfNA5pVPs9KDWML4cds1dHrUxtRLeozMWqXEwHjqTn6YU",
    "16GGq3LSZPGXf6bNeK4B6rBjLfHm9AQge6fEveaZf7ecnzJd",
    "15apmbkc2npDETihZUfNwsGyXmgfeYDBPj1zJ48WkyP5TEKL",
    "13uvqQ1zjWaJtbXgC9ssNX1jA7D27RUUoBMzUn33jypocE8Z",
    "14aQYZRTztRcrCtq5dDSSnW7SAfJ9AV2Pa46mnck74XxoMa7",
    "13DFdjj2mqBgSBwMJXdvhRhVPnMeKJByULNHDeySBXbiXA29",
    "16AGX9MvKjnraLWeJPTFA5YGwRPbDTuigcq86eAmu99tYAyH",
    "12sFJzHz9Xkkua5vnv9rAUMLMgLPMUd8SZx61tBZGmEnqUUJ",
    "15Q7LRbAKrVExHs9xtrhDKuNmPApo4iBQdJp3k11YMDjTF2f",
    "1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L",
    "1xKjsPUd2MJSSucTbXL5BknBy1nnpGSH3zFCcUXiC7gFFyP",
    "12GNzjjQvLFixiz9cJ8v1tvBvua6RFMeRtU1dfdyQFM5gvKC",
    "12fW46TcQBwNWhbKdS2vwE4CCHydRtjhiYAXcH6mb6szsRJ6",
    "1PDHLovMTdXeQXPWRAEnHXcoqoDEJegCyTa1aX7G3RYn4ZH",
    "16X6fA9y2kPoUDN3wo2Y5PhAfYCd7R8b8soH9jKo754TEoHh",
    "12x2JzNyvQsRkKF6dG8FS5rtXMYatGT74ro6kW6AVdXdL8u9",
    "16MbsDpnL3WtpPGkF4peSi4zxVNqtJSLvDdjbCHAcSh6tvAo",
    "13xwYeNv9vwsRSwYG2eUmbDn5qBsNSNW6EUMoBXDaXnQB8tX",
    "12WLDL2AXoH3MHr1xj8K4m9rCcRKSWKTUz8A4mX3ah5khJBn",
    "12sdWJCE8xTncZMfj2eAhzX3yD3iDyZ5aTU3ciz7GSMWjs4s",
    "13mXyFxnmuNKAAy2aVbx4xvm8LUNPb9oqteYa52kCikYyL9G",
    "1H1aMkpYrkjtcQHXc5Zqd2jXxMQqBh7ZnkkRSu62Yz2vEbK",
    "13QrZfUHZMDByjFx4qJ4xNuS8Cgc81TzMbx8eMtyfEmWmMCP",
    "13j98WqDwBZ4V9r8vBxtthepRcUPTyg7NimDwb1joJKmfhgt",
    "13YMK2eYoAvStnzReuxBjMrAvPXmmdsURwZvc62PrdXimbNy",
    "14LPktAnKHGDy4aFz1rcuSq71FN5osbx1WSHPht2vmLdH74X",
    "16GitWrCRnWJKQmeSGi5kUzCreeHQYSc8AWNm4LHZgNT6WNh",
    "1W6f6T5mxz2ATndjakXBRvDzX36B7eDurbHEcDKMhnRH2Zx",
    "13a6JAbZpMQYsMEfgJnLM36twAMHPLfbjY5YMmXNRS5WugM5",
    "15CEhNHSpW2vBnwaPWNg5gvKWonNNaoLLJZP7WEUzXFM2183",
    "12P66SEjRHsyqfggxALH9WGSWNB8xUbqzBMATr9TefqVqWvX",
    "124Xmmo5dn4CStgvkwnmvBX9sYTPaJRYRCCsZ4CDfA1J8F7d",
    "14SSXadJt4tQGPu3em75qzPDX6yMgmHrt6LHiN2mLrHUMHR2",
    "14ni4zwjUrdFKfQp2j5mwrjcQmr8moCzWBJFAyJqbn2TUf18",
    "123tA7zfH9XdqHX5v9W4mB4VfmrjE95yJvdvMbpWv5V851rX",
    "1351MM8FXyrnf6fZaSwVdbY46qEectB4Y5AnHTqeyGGXq87m",
    "13oRgXk8cHVxpi6FHxycniEz4ggRzt7K3rr8P2D79UC8abE2",
    "14gnFLBCge3GsgZuWjCUhUABf1MxUupptLc34nhhJjMbWKN5",
    "15PwtbJzVWXTB3YJ8wZogjHPgVdTMnYfCjjBeeXGTRYpAkH7",
    "12f5HZqjcoDPaPyaaJH7ptCqz1i4r3LanFZPE7jPZYYt26JC",
    "138gCeHtfU6zpmVB7SiCyyVd25CyLXmVMrbQDCN7uSB8Dq62",
    "138NUUJ24QAWgvfZg4DemGiYRhi1ACkVf9htBSb1ymAN7PJW",
    "138NUUJ24QAWgvfZg4DemGiYRhi1ACkVf9htBSb1ymAN7PJW",
    "12vGYXHLrNhXnvnDU2VL9HxkxVtEr3V3AAYrLfBh5jP5UgFs",
    "12vGYXHLrNhXnvnDU2VL9HxkxVtEr3V3AAYrLfBh5jP5UgFs",
    "15d6rmJdNnxswwkaECKtRFHcpw7VeLCkQFVDr12pBn4Dro76",
    "138wMZrWGeJt7zbvUdh73rAxQthrzPZSfnj6WR4WaBetKdwe",
    "12G1TaAHobt2qZ1zAPVmF122NrTMCDpC4nXuubddkQjTiScD",
    "15MWAdxaSibGv9N45miDANVizyHDj1NvMk91aGeJHL2GMnvM",
    "16ccyj8JqnP8d2DSaifgek6kSSBAu5cGtd4mu2uXTg4H6mSU",
    "16b62F7xofsahTC97Fum57FB3fHRrCsakzFLRzKzyK4tPRGh",
    "13MLdtCJdSbyojwjiBMxti4tQ7qVZN2XgNfGcfSDck84tFnd",
    "16iFT9xPerb9uetnE6YxUuhewzXZiiNED73A5GC6qF8sF1Qr",
    "13KJ3t8w1CKMkXCmZ6s3VwdWo4h747kXE88ZNh6rCBTvojmM",
    "14wfaNL5xvTjSzQaohJok1iX2zhJyhqcT4fRxM39Kbt5ahqS",
    "14gUmUjQooUqAgbkP8zEdz5tkLyCqPSz8GZ41AnLLyFzhVw2",
    "13vTR85V1mHBCWB5Rf9VwDRcrvzXWev2G8vCX1K5DvYFDnXk",
    "13UVJyLnbVp9RBZYFwHYxa65mTwsMPui797yx5GdkvPw6wUd",
    "1maegxnwYXc5koZ8EiQK158cNR9zaX9LCwrT55x8yuo88kE",
    "12po4e2aQTD78ABKuRpxLrnWiFpx5hP5b4brXEYNKtMfyfX5",
    "14Sq6wesb3BEmiWkSgC1CrRwEeXMqdxNbVSqev33DV78wrxD",
    "14EUWKYqdG5sY2obLr6Shtk1zGDTC8fRmvw5JKu88nT72N3T",
    "1539XW8b9aXyHteehiD2Kno5gJ4nLKBj43MX2P1BZ9SRNJSL",
    "15o4BQzgejG1MH4JynNRchC425Ehhn2X6JYUQRdwJ6L9TqWq",
    "16U1ofqoHVwX6FTWi5cWZzdwt1hDrth25n4LNH4t6XXjRFZG",
    "12DEpb9ZfeeUaFXCjZPHjakfkB5nhE3FttHjebRMkYf2y5bP",
    "1unbkRdPEBQNo2Mk3Sew65RGo4jkgDqTFheCDbjvFe1zw4H",
    "13bX5LJa8TvnfLbiNsqU7eorMy6usuusCrEGuGgegBCwarhH",
    "13VfEQKqPsvYJtVxDZpGSe5wxfwL8MskZR4bF18JBofsZfoo",
    "1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih",
    "15GADXLmZpfCDgVcPuLGCwLAWw3hV9UpwPHw9BJuZEkQREqB",
    "12dqqmJ8Uq4ftaitoKG1Hap9ZBikbcrf1929Q4SHvQojnGS1",
    "13Tn9etJrjb9Csm8uv7895wTQQudQo4AJV7abthtWbdkgsnP",
    "1UUGJNBkhbGVontkDxqpjUnpBvwGmpsxjNMRDuTgXFQjaFz",
    "17Mw1AzwYKJitF2aXgBPieX1XegG2HAkxQjnjQg9hrNmtb8",
    "13SisGeRWGofqSdSXSuzrqmiiVQRYpdZGrJJ3FRJxuzGe8EW",
    "12iYicZtf7sAkAs7Xn1bkpmGUiR5rDqmd6coxtE7LBWRfKkP",
    "12ktyKrYoPFfNQnEUzM9Voj9aj14vq43tn4UEhwR6RhWgN51",
    "14fiiHfQjMRdMpEyF18Fj9ASvqs9juYAmobbwDwQ4cuYTceN",
    "16CfBoW4ZYPnwPG4EFjvzQaMnaBmNGP2rMB2D8ByBPEDLYHW",
    "16fM2nc4mxA65FLsCqxxpJthdh8f79KYC5V9QeC3YL6EEYG2",
    "15iQ2TeSxjNdE5bdTYHrG71p9XQbVQcNCRKHutCUPJVLS7Rn",
    "15Q33K9DZQgDLJXEpgdrdHkJWKyPXqXgaEaqYMtq8FMP79X3",
    "15RFQgBTLPsZp3CfDFQKsSHPbZoLsQrodYsVPwE3WNmxCtBH",
    "124BaHGGCNSZSLTsyEuEaZjpVNfDpe9SGfEk2PYwBSrFPW1t",
    "12gneUo33SvJu2dSRxJgpgfdbygekDJ8ghqkTXv9tzPA47ao",
    "12mvRSJUwpf6VfWLmgEJjcQgzzh2bCTSvFDwrykmijdzqS5m",
    "12Ea3kSFDH3Meg5Br63o5BXZh4ELvhapCj96ygaXiTtpVhUM",
    "15DCxXpLTA3SDbNTdPBNxQP214w574sWEhEUqGPjuL7Njk7U",
    "135nxuMsA8riU5vcLt7fG3xnEGaJg2Kds93seRqEXmH4Be46",
    "14aU6hmz1dxXtDe2Z7pttJcQ43ApAeZQnjN7YhMyRQPESXFE",
    "12d3ks4ngYhaSn7VW715XVMYrRRMFnhoRo5Yw9E1ttYtQZd",
    "14AMy7J61P7BfyRMdCh1L9Wp31GLCcqrWaeidqLZTheeuNSp",
    "13DgQui1kL9uGG5vPEJgb1zNf9mP6KrbzBudeQnG8AfsvQkJ",
    "11yLs2qzU15AhxnH1d7Koqcf83AwutKkDaGbqsJJ6yDWQjc",
    "15V25oBZGu7wAfV7LPP8YBwaWRgBAyfiVUtVywGHAcDAw9cD",
    "15CT5xki64PBzWUqrDe53scqzp2WEB2GiqeEzoCdpgZfmKXA",
    "16SWEqB5qHed6ogWjgmEBbgs5TkR9vxVwvGRmghdGsvVnZWn",
    "16SFFxbzw1QRuG6eTdnCa3HqXv7ySXEKJnP48bXxZzZ1E4Kk",
    "163HXb6fNGtbStL4t5dMinFMYSWjXiotw7yfkdgFXMd7gb1M",
    "14d68gtshxUJLZopL29MKNyuxaSPdkZ4U1nbJTroB8Li6eZN",
    "12VBgHiDdRNe2zL891tukVZvEd5TfXbQEbtQiLkeWvHcgjkt",
    "16G9TNhc8TjuJonZ9u79iPvtXjKWyk5HwaC3VMfbGCsEyL2u",
    "128eW1Hh4d16yJWq2KHaoSGvZXEeQtZPBZbvveWoTHz7UJW2",
        ]
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

