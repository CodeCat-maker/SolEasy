import asyncio

from solana.rpc.async_api import AsyncClient
from solders.message import Message
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solana.transaction import Transaction
from solders.system_program import transfer, TransferParams
import json
async_client = AsyncClient("https://api.devnet.solana.com")



async def send_sol(sender_private_key: str, recipient_public_key: str, amount: int):
    # 使用发送者的私钥创建 Keypair
    sender_private_key = sender_private_key.strip()
    sender = Keypair.from_base58_string(sender_private_key)
    sender_pubkey = sender.pubkey()


    async with AsyncClient("https://api.devnet.solana.com") as client:


        latest_blockhash = (await client.get_latest_blockhash()).value.blockhash


        instruction = transfer(
            TransferParams(
                from_pubkey=sender_pubkey,
                to_pubkey=Pubkey.from_string(recipient_public_key),
                lamports=amount
            )
        )


        transaction = Transaction(fee_payer=sender_pubkey, instructions=[instruction])


        transaction.recent_blockhash = latest_blockhash


        transaction.sign(sender)

        serialized_tx = transaction.serialize()

        response = await client.send_transaction(serialized_tx)
        return json.loads(response.to_json())['result']
