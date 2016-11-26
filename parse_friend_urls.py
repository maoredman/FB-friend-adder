import os
os.chdir("DIRECTORY OF SAVED .HTML")

from bs4 import BeautifulSoup

soup = BeautifulSoup(open("xxx.htm"), 'lxml')
[lim]divsoup = soup.find_all("div", class_="fsl fwb fcb", [limit = 3] )
for div in [lim]divsoup:
    print div.find('a')['href']