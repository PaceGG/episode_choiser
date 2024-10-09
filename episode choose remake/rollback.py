import json
import PATHS
import os
from telegramFunctions import delete_message

os.chdir(PATHS.repository)

def save_rollback():
    with open("episode choose remake/pydb.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    with open("episode choose remake/rollback.json", "w", encoding="utf-8") as f:
        json.dump(data, f)

def rollback():
    with open("episode choose remake/rollback.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    with open("episode choose remake/pydb.json", "r", encoding="utf-8") as f:
        last_message_id = json.load(f)["YT"][-1]["id"]

    delete_message(last_message_id)

    with open("episode choose remake/pydb.json", "w", encoding="utf-8") as f:
        json.dump(data, f)

if __name__ == "__main__":
    with open("episode choose remake/pydb.json", encoding="utf-8") as f:
        try:
            last_message = json.load(f)["YT"][-1]
        except:
            print('Невозможно совершить откат')
            exit(0)

    confirm_check = f"{last_message['game_name']} {last_message['ep_range'][0]}-{last_message['ep_range'][1]}"

    print(f"Подтвердите откат введя '{confirm_check}' в консоли.")
    confirm = input()
    if confirm == confirm_check:
        print("Откат...")
        rollback()
        from main import edit_tg_info_message
        edit_tg_info_message()