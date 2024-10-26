import base58
from solders.keypair import Keypair

def create_solana_wallet(numbers: int):
    t = numbers
    wallets = []
    while t > 0:
        t -= 1
        account = Keypair()
        privateKey = base58.b58encode(account.secret() + base58.b58decode(str(account.pubkey()))).decode('utf-8')
        publicKey = account.pubkey()
        wallets.append({
            "privateKey": privateKey,
            "publicKey": str(publicKey)
        })
    return str(wallets)
