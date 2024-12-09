import asyncio

from solana.rpc.async_api import AsyncClient
from solders.message import Message
from solders.keypair import Keypair
from solders.pubkey import Pubkey
from solana.transaction import Transaction
from solders.system_program import transfer, TransferParams
import json
import dotenv
import os

from Utils.config.config import *

async def send_sol(sender_private_key: str, recipient_public_key: str, amount: int):
    # 使用发送者的私钥创建 Keypair
    sender_private_key = sender_private_key.strip()
    sender = Keypair.from_base58_string(sender_private_key)
    sender_pubkey = sender.pubkey()

    dotenv.load_dotenv()
    RPC_ENDPOINT = os.getenv("RPC_ENDPOINT")

    async with AsyncClient(RPC_ENDPOINT) as client:


        latest_blockhash = (await client.get_latest_blockhash()).value.blockhash


        instruction = transfer(
            TransferParams(
                from_pubkey=sender_pubkey,
                to_pubkey=Pubkey.from_string(recipient_public_key),
                lamports=int(amount * LAMPORTS_PER_SOL)
            )
        )


        transaction = Transaction(fee_payer=sender_pubkey, instructions=[instruction])

        transaction.recent_blockhash = latest_blockhash

        transaction.sign(sender)

        serialized_tx = transaction.serialize()

        response = await client.send_transaction(serialized_tx)
        return json.loads(response.to_json())['result']

async def cex_transfer(recipient_public_key: str, amount: float):
    cex_api_key = os.getenv("CEX_API_KEY")
    cex_api_secret = os.getenv("CEX_API_SECRET")
    cex_api_url = os.getenv("CEX_API_URL")


