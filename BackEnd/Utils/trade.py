import asyncio
import json
import base64
import struct
import base58
import hashlib
import websockets
import os
import argparse
from datetime import datetime

from solana.rpc.async_api import AsyncClient
from solana.transaction import Transaction
from solana.rpc.commitment import Confirmed
from solana.rpc.types import TxOpts

from solders.pubkey import Pubkey
from solders.keypair import Keypair
from solders.instruction import Instruction, AccountMeta
from solders.system_program import TransferParams, transfer
from solders.transaction import VersionedTransaction

from spl.token.instructions import get_associated_token_address
import spl.token.instructions as spl_token

from config import *

# Import functions from buy.py
from Utils.trade.pump_buy import get_pump_curve_state, calculate_pump_curve_price, buy_token, listen_for_create_transaction

async def pump_buy(token_data):
    mint = Pubkey.from_string(token_data['mint'])
    bonding_curve = Pubkey.from_string(token_data['bondingCurve'])
    associated_bonding_curve = Pubkey.from_string(token_data['associatedBondingCurve'])

    # Fetch the token price
    async with AsyncClient(RPC_ENDPOINT) as client:
        curve_state = await get_pump_curve_state(client, bonding_curve)
        token_price_sol = calculate_pump_curve_price(curve_state)

    print(f"Bonding curve address: {bonding_curve}")
    print(f"Token price: {token_price_sol:.10f} SOL")
    print(f"Buying {BUY_AMOUNT:.6f} SOL worth of the new token with {BUY_SLIPPAGE*100:.1f}% slippage tolerance...")
    buy_tx_hash = await buy_token(mint, bonding_curve, associated_bonding_curve, curve_state, BUY_AMOUNT, BUY_SLIPPAGE)
    if buy_tx_hash:
        print(f"Buy transaction successful: {buy_tx_hash}")
    else:
        print("Buy transaction failed.")