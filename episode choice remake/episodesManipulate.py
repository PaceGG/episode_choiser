import json
from time import time
from moviepy.video.io.VideoFileClip import *
from pydata import pydata_load, pydata_save

def get_old_name(data_key):
    data = pydata_load()
    with open("react-remake/db.json", encoding="utf-8") as f:
        showcase = json.load(f)["showcase"]
        actual_names = [game["name"] for game in showcase]
    old_names = [name for name in list(data[data_key].keys()) if name != "SnowRunner"]

    if old_names==actual_names or old_names == reversed(actual_names): return None

    for name in old_names:
        print("time: ", time() - start_time)
        if name not in actual_names:
            return name

    return None

def replace_game_data(new_name, data_key):
    old_name = get_old_name(data_key)

    if old_name is None:
        return new_name
    
    data = pydata_load()
    if data_key == "episodes_time":
        default_value = {"time": 120, "my_time": "", "add_by_console": "False"}
    elif data_key == "episodes_log":
        default_value = [0, 0]

    data[data_key].pop(old_name)
    data[data_key][new_name] = default_value

    pydata_save(data)
    return new_name

def count_dir_time(check_name):
    data = pydata_load()

    game_names = [name for name in data["episodes_time"].keys()z    ]

    for game_name in game_names:
        dir = os.path.join("D:/Program Files/Shadow Play", game_name.replace(":", ""))
        if os.path.exists(dir) and game_name == check_name and data["episodes_time"][game_name]["add_by_console"] == "False":
            dir_duration = get_total_duration(dir)//60
            if dir_duration > 0:
                print(f"В {game_name} есть видео продолжительностью {dir_duration} минут. Хотите добавить их к сумме?")
                my_time = input(f"Введите время для {game_name}: ")
                os.system("cls")
                data["episodes_time"][game_name]["my_time"] = my_time
                data["episodes_time"][game_name]["add_by_console"] = "True"
                pydata_save(data)

def get_time(name):
    count_dir_time(name)
    data = pydata_load()
    try:
        time_data = data["episodes_time"][replace_game_data(name, "episodes_time")]
    except KeyError:
        time_data = {"time": 120, "my_time": "", "add_by_console": "False"}

    time = time_data["time"]
    my_time = time_data["my_time"]

    if my_time == "": return time

    # Сумма времени
    if "," in my_time or ":" in my_time:
        total_time = 0
        my_time.split(",")
        for t in my_time:
            if ":" in t:
                t = t.split(":")
                t = int(t[0]) * 60 + int(t[1])
            else:
                t = int(t)
            total_time += t
        my_time = total_time
    else:
        my_time = int(my_time)

    extra_time = my_time - time
    time = 120 - extra_time

    time_data["time"] = time
    time_data["my_time"] = ""

    data["episodes_time"][name] = time_data
    if name != "SnowRunner": equalize_time()
    elif name == "SnowRunner": equalize_time_sr()

    pydata_save(data)
    return time_data["time"]

#not optimized!
def get_episodes(name):
    data = pydata_load()
    try:
        return data["episodes_log"][replace_game_data(name, "episodes_log")][:2]
    except KeyError:
        return [0, 0]

def equalize_time():
    data = pydata_load()
    times_to_equalize = {name: time["time"] for name, time in data["episodes_time"].items() if name != "SnowRunner"}
    times_list = list(times_to_equalize.values())
    e0 = times_list[0]
    e1 = times_list[1]
    p1 = 120 - e0
    p2 = 120 - e1
    pmin = min(p1, p2)
    e0 += pmin
    e1 += pmin
    equalized_times = {name: (e0 if i == 0 else e1) for i, name in enumerate(times_to_equalize.keys())}
    for name, new_time in equalized_times.items():
        if name in data["episodes_time"]:
            data["episodes_time"][name]["time"] = new_time

    pydata_save(data)

def equalize_time_sr():
    data = pydata_load()

    sr_time = data["episodes_time"]["SnowRunner"]["time"]

    if sr_time <= 0:
        data["episodes_time"]["SnowRunner"]["time"] = 120 + sr_time
        data["games_for_sr_counter"] += 5

    pydata_save(data)

def reset_console_flag(name):
    data = pydata_load()
    data["episodes_time"][name]["add_by_console"] = "False"
    pydata_save(data)

if __name__ == "__main__":

    start_time = time()
    print("start time: ", time() - start_time)
    print(get_episodes("Fallout: New Vegas"))
    print("end time: ", time() - start_time)
    pass