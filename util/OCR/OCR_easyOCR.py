

def ocr_easyocr(img):
    import easyocr 
    reader = easyocr.Reader(['ch_sim'], gpu = False)
    result = reader.readtext(img)
    print(result)
    
# ocr_easyocr('test_page.png')
ocr_easyocr('test2.jpg')