import os
import sqlite3
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


DB_PATH = os.path.join(BASE_DIR, "data.db")


def initialize_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()


    cursor.execute('''
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            operation_type TEXT NOT NULL,
            request_data TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()



initialize_db()