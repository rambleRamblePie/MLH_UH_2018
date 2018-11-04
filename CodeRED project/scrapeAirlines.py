import requests
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium import webdriver
from zipfile import *
from flask import Flask
from flask import request
import re





# an exception
browser = webdriver.Chrome(executable_path='/Users/henryrodriguez/Downloads/chromedriver')

browser.get("https://www.expedia.com/Flights-Search?flight-type=on&starDate=11%2F07%2F2018&endDate=11%2F10%2F2018&mode=search&trip=roundtrip&leg1=from%3AHouston%2C+TX+%28HOU-All+Airports%29%2Cto%3ANew+York+%28NYC-All+Airports%29%2Cdeparture%3A11%2F07%2F2018TANYT&leg2=from%3ANew+York+%28NYC-All+Airports%29%2Cto%3AHouston%2C+TX+%28HOU-All+Airports%29%2Cdeparture%3A11%2F10%2F2018TANYT&passengers=children%3A0%2Cadults%3A1%2Cseniors%3A0%2Cinfantinlap%3AY")
# <ul id="flightModuleList" class="segmented-list results-list price-sort basic-economy-forced-tray">
timeout = 10
try:
    graph = WebDriverWait(browser, timeout).until(EC.visibility_of_element_located((By.XPATH,"//li[@class='flight-module segment offer-listing']")))
except TimeoutException:
    print("Timed out waiting for page to load")
    browser.quit()

SCROLL_PAUSE_TIME = 1

# Get scroll height
last_height = browser.execute_script("return document.body.scrollHeight")

while True:
    # Scroll down to bottom
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
    timeout = (SCROLL_PAUSE_TIME)

    # Calculate new scroll height and compare with last scroll height
    new_height = browser.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height


# time_Delements = browser.find_elements_by_xpath("//span[@data-test-id='departure-time']")
# time_departure = [x.text for x in time_Delements]

# Written as normal for loop:
#  titles=[]
# for x in titles_element:
#     titles.append(x.text)
#
# print('time_departure')
# print(time_departure)
#
#
# time_Aelements  = browser.find_elements_by_xpath("//span[@data-test-id='arrival-time']")
# time_arrival = [x.text for x in time_Aelements]
#
# print('time_arrival')
# print(time_arrival)
#
#
# # for time_departure, time_arrival in zip(time_departure, time_arrival):
# #     print(time_departure + " - " + time_arrival)
# #
#
# airline_FName = browser.find_elements_by_xpath("//span[@data-test-id='airline-name']")
# airline_Name = [x.text for x in airline_FName]
#
#
# flightDur = browser.find_elements_by_xpath("//span[@data-test-id='duration']")
# flight_Duration = [x.text for x in flightDur]
#
#
# numStops = browser.find_elements_by_xpath("//span[@data-test-id='number-stops']")
# number_Stops = [x.text for x in numStops]


fInfo = browser.find_elements_by_xpath("//div[@data-test-id='flight-info']")
flight_Info = [x.text for x in fInfo]


re.purge()
regex1 = re.compile('(\\n)')


for x in flight_Info:
    s = regex1.sub(' ', flight_Info[])
    print(s)

regex = re.findall("\s\w(?=')")  # removes the u"s in the text
print([x.text for x in regex])
#
# optBy = browser.find_elements_by_xpath("//div[@data-test-id='operated-by']")
# operated_By =[x.text for x in optBy]
#
#
# def main(): #{
#     file_name = "strapped.zip";
#
