import os

game = [
    r"C:\Users\yura3\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\New Vegas EE.lnk",
    r"D:\Games\The Callisto Protocol\TheCallistoProtocol.exe — ярлык.lnk",
    'C:\\ProgramData\\TileIconify\\SnowRunner\\SnowRunner.vbs'
]

extra_names = [
    "Dead Money", # First game
    "", # Second game
    "Мичиган", # Extra/third game
]

video = "D:/Program Files/Shadow Play"

repository = os.path.dirname(os.path.dirname(__file__)) # automacy