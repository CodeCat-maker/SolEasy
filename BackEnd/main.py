import uvicorn
from fastapi import FastAPI
import Model.request as rq
from Utils.account import Account
from fastapi.middleware.cors import CORSMiddleware
import os
import dotenv

dotenv.load_dotenv()
RPC_ENDPOINT = os.getenv("RPC_ENDPOINT")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/wallet/create")
async def create_wallet(request: rq.WalletRequest):
    try:
        from Utils.wallet import create_solana_wallet
        wallet = create_solana_wallet(request.numbers)
        return {"code": 200, "message": "success", "result": wallet}
    except Exception as e:
        return {"code": 500, "message": str(e)}



@app.get("/logs/get")
async def get_logs():
    from Utils.logs import get_logs,add_log
    try:
        logs = get_logs()
        add_log("get_logs", "")
        return {"code": 200, "message": "success", "result": logs}
    except Exception as e:
        return {"code": 500, "message": str(e)}


@app.get("/account/balance/sol")
async def get_solana_balance(private_key: str):
    try:
        account = Account(private_key, RPC_ENDPOINT)
        balance = await account.get_solana_balance()
        return {"code": 200, "message": "success", "result": balance}
    except Exception as e:
        return {"code": 500, "message": str(e)}

@app.get("/account/balance/token")
async def get_solana_balance(private_key: str, mint: str):
    try:
        account = Account(private_key, RPC_ENDPOINT)
        balance = await account.get_token_balance(mint)
        return {"code": 200, "message": "success", "result": balance}
    except Exception as e:
        return {"code": 500, "message": str(e)}

@app.post("/transfer/sol")
async def transfer_sol(request: rq.TransferRequest):
    try:
        from Utils.transfer import send_sol
        print(request.sender_private_key, request.recipient_public_key, request.amount)
        try:
            sig = await send_sol(request.sender_private_key, request.recipient_public_key, request.amount, RPC_ENDPOINT)
            return {"code": 200, "message": "success", "result": sig}
        except Exception as e:
            return {"code": 500, "message": str(e)}
    except Exception as e:
        return {"code": 500, "message": str(e)}

@app.post("/trade/pump/buy")
async def pump_buy(request: rq.PumpBuyRequest):
    try:
        from Utils.trade import pump_buy
        await pump_buy(request.sender_private_key, request.mint, request.bonding_curve, request.associated_bonding_curve, request.amount, RPC_ENDPOINT)
        return {"code": 200, "message": "success"}
    except Exception as e:
        return {"code": 500, "message": str(e)}

@app.post("/trade/pump/sell")
async def pump_sell(request: rq.PumpSellRequest):
    try:
        # from Utils.trade import pump_sell
        # await pump_sell(request.token_data)
        return {"code": 200, "message": "success"}
    except Exception as e:
        return {"code": 500, "message": str(e)}

@app.post("/transfer/cex")
async def cex_transfer(request: rq.CEXTransferRequest):
    try:
        from Utils.transfer import cex_transfer
        await cex_transfer(request.recipient_public_key, request.amount)
        return {"code": 200, "message": "success"}
    except Exception as e:
        return {"code": 500, "message": str(e)}

