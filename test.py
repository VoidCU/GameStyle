import time
import pyautogui

def type_every_minute(text):
    while True:
        time.sleep(30)
        pyautogui.typewrite(text)
        pyautogui.press('enter')  # Press Enter key
          # Wait for 60 seconds (1 minute)

if __name__ == "__main__":
    text_to_type = "!gamble 10"  # Change this to the text you want to type
    type_every_minute(text_to_type)