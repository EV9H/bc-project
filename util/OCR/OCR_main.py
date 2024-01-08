from PIL import Image
import numpy as np
import pytesseract
import os.path
import cv2
pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
script_dir = os.path.dirname(os.path.abspath(__file__))


def convert_image(filename):
    
    img = Image.open(os.path.join(script_dir, filename)).convert('L')  

    ret,img = cv2.threshold(np.array(img), 125, 255, cv2.THRESH_BINARY)

    return img 

img = convert_image('test_page.png')
result = pytesseract.image_to_string(img, lang="chi_sim")
print(result)