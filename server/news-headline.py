import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

from webdriver_manager.chrome import ChromeDriverManager

website = 'https://www.thesun.co.uk/sport/football/'

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.get(website)

items = driver.find_elements(By.XPATH, '//div[@class="teaser-item teaser__small  theme-football"]')

# a appends, w writes and ovewrites [TEXT FILES]
w = open("db.json", "w")
w.write("[")

#writing to CSV Files
#better for excel transfer and Data Analysis.
titles=[]
subtitles=[]
links=[]

index = 0
for item in items:
    index+=1
    try:
        title = item.find_element("xpath","./div[@class='teaser__copy-container'] //h3").text
        w.write('\n\t {\n\t\t"title" : "'+title + '" ,\n')
        titles.append(title)
    except Exception as e:
        w.write('\n\t {\n\t\t"title" : "''" ,\n')
        titles.append('')
        print("error \tTITLE MISSING\n")

    try:
        subtitle = item.find_element("xpath","./div[@class='teaser__copy-container'] //p").text
        w.write('\t\t"subtitle" : "'+ subtitle + '" ,\n')
        subtitles.append(subtitle)
    except Exception as e:
        w.write('\t\t"subtitle" : "''" ,\n')
        subtitles.append('')
        print("error \tSUBTITLE MISSING\n")

    try:
        aTag = item.find_element("xpath", "./div[@class='teaser__image-container'] /a")
        link =  aTag.get_attribute("href")
        w.write('\t\t"link" : "'+ link + '" \n\t}')
        links.append(link)
    except Exception as e:
        w.write('\t\t"link" : "''" \n\t}')
        links.append('')
        print("error \tLINK MISSING\n")
    
    if(index < len(items)):
        w.write(',')

w.write("\n]")
w.close()

newsDictionary = {'title':titles,'subtitle':subtitles,'link':links}
downloadable_news = pd.DataFrame(newsDictionary)
downloadable_news.to_csv('sports_headlines.csv')

driver.quit()
