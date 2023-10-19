import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import json

df = pd.read_csv('report.csv')
df['Order Date'] = pd.to_datetime(df['Order Date'], format='%d-%m-%Y')

product_forecasts = {}

for product_name in df['Product Name'].unique():
    product_data = df[df['Product Name'] == product_name]
    product_data.set_index('Order Date', inplace=True)

    model = ExponentialSmoothing(product_data['Quantity'], trend='add', seasonal=None)
    model_fit = model.fit()

    forecast = model_fit.forecast(steps=3)

    product_forecasts[product_name] = forecast.astype(int)

for product_name, forecast in product_forecasts.items():
    print(f"Product: {product_name}")
    print(f"Forecast for the next 3 months: {forecast.tolist()}\n")
