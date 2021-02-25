# Bitso Historical Data
Get historical data from Bitso OHLC csv format in any timeframe

## How to run
Get Node if you don't have it yet https://nodejs.org/en/download/

Install needed dependencies with the following command
`npm install`

Start downloading historical data (BTC_MXN 1 minute candles)
`node index.js BTC_MXN output.csv 60000`

This will fetch all all historical data for the BTC_MXN book from Bitso (1 minute candles = 60000ms) and save it into a file called output.csv (it will some time as there is a API rate limit of 60 calls per minute) in place. 

If you want to get 1h candles (3600000ms candles) just run 
`node index.js BTC_MXN output.csv 3600000`

Optionally you can specify a limit of how many candles it will download.

`node index.js BTC_MXN output.csv 60000 1000`



