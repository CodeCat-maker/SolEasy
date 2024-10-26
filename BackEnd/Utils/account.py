import json

import base58
from solana.rpc.async_api import AsyncClient
from solana.rpc.types import TokenAccountOpts
from solders.pubkey import Pubkey
from solana.rpc.commitment import Processed,Confirmed
from solders.keypair import Keypair
from solders.pubkey import Pubkey

async_client = AsyncClient("https://api.devnet.solana.com")


class Account:
    def __init__(self,private_key):
        self.private_key = Keypair.from_bytes(base58.b58decode(private_key))
        self.public_key = self.private_key.pubkey()

    async def get_solana_balance(self):
        response = await async_client.get_balance(self.public_key)
        sol_amount = json.loads(response.to_json())['result']['value']
        return sol_amount/1e9

    async def get_token_balance(self,tokenAC):
        token_mint_pubkey = Pubkey.from_string(tokenAC)
        response = await async_client.get_token_accounts_by_owner(
            owner=self.public_key,
            opts=TokenAccountOpts(mint=token_mint_pubkey),
            commitment=Confirmed
        )
        response = json.loads(response.to_json())


        if len(response['result']['value']) == 0:
            # print(f"No Token account found for token: {tokenAC}")
            return 0

        token_account = response['result']['value'][0]['pubkey']
        token_pubkey = Pubkey.from_string(token_account)
        token_balance = await async_client.get_token_account_balance(token_pubkey)
        token_amount = token_balance.value.ui_amount
        return token_amount

