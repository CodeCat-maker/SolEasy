from mexc_sdk import Spot
import time
import hashlib
import hmac
import requests
api_key = "mx0vgluKK4fkUEUNOy"
api_secret = "12c6698db0c64aa5a2a5063faed90ff3"
spot = Spot(api_key=api_key, api_secret=api_secret)
# get a signiture     $ echo -n "symbol=BTCUSDT&side=BUY&type=LIMIT&quantity=1&price=11&recvWindow=5000&timestamp=1644489390087" | openssl dgst -sha256 -hmac "45d0b3c26f2644f19bfb98b07741b2f5"
timestamp = str(int(time.time() * 1000))
params = {
    "coin":"SOL",
    "address":"TMebA8UtC6g2XhkNm4uzQaLyRK1tm6EjMnigboiwATL",
    "amount":"0.05",
    "timestamp": timestamp}
# 将字典转换为查询字符串
query_string = '&'.join([f"{key}={value}" for key, value in params.items()])
signature = hmac.new(api_secret.encode(), query_string.encode(), hashlib.sha256).hexdigest()
print(signature)
response = requests.get(f"https://api.mexc.com/api/v3/capital/withdraw?{query_string}&signature={signature}",headers={"X-MEXC-APIKEY":api_key})
print(response.json())
