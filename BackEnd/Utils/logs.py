import os
import sqlite3
from datetime import datetime
# 获取项目根目录路径
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


DB_PATH = os.path.join(BASE_DIR, "data.db")


def add_log(operation_type: str, request_data: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    cursor.execute('''
        INSERT INTO logs (timestamp, operation_type, request_data) 
        VALUES (?, ?, ?)
    ''', (timestamp, operation_type, request_data))

    conn.commit()
    conn.close()

def get_logs():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('''
        SELECT * FROM logs
    ''')

    logs = cursor.fetchall()
    conn.close()

    return logs