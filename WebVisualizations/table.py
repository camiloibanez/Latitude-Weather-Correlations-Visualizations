import pandas as pd

cities_df = pd.read_csv("../../python-api-challenge/WeatherPy/cities.csv")

cities_table = cities_df.to_html()

print(cities_table)