from pydantic import BaseModel
class WalletRequest(BaseModel):
    numbers: int

class LogsRequest(BaseModel):
    operation_type: str
    request_data: str
    
class TransferRequest(BaseModel):
    sender_private_key: str
    recipient_public_key: str
    amount: float
    
class CEXTransferRequest(BaseModel):
    recipient_public_key: str
    amount: float
    
class PumpBuyRequest(BaseModel):
    sender_private_key: str
    mint: str
    bonding_curve: str
    associated_bonding_curve: str

class PumpSellRequest(BaseModel):
    mint: str
    bonding_curve: str
    associated_bonding_curve: str    