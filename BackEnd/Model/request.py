from pydantic import BaseModel
class WalletRequest(BaseModel):
    numbers: int

class LogsRequest(BaseModel):
    operation_type: str
    request_data: str
class TransferRequest(BaseModel):
    sender_private_key: str
    recipient_public_key: str
    amount: int