# Bitso Historical Data
Get historical data from Bitso (https://bitso.com) OHLC csv format in any timeframe.

You can get list of available books from their API https://api.bitso.com/v3/available_books/

## How to run
Get Node if you don't have it yet https://nodejs.org/en/download/

Start downloading historical data (btc_mxn 1 minute candles)

`node index.js btc_mxn output.csv 60000`

This downloads all historical data for the btc_mxn book from Bitso (1 minute candles = 60000ms) and save it into a file called output.csv (it will take a lot of time as there is a API rate limit of 60 calls per minute) in place. This means it will only process 60 * 100 orders per minute.

If you want for example 1h candles (3600000ms) just run 

`node index.js btc_mxn output.csv 3600000`

Optionally you can specify a limit of how many candles it should download.

`node index.js btc_mxn output.csv 60000 1000`

In example.csv you can see an example output.



