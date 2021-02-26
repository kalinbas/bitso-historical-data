# Bitso Historical Data
Get historical data from Bitso (https://bitso.com) OHLC csv format.

You can get list of available books from their API https://api.bitso.com/v3/available_books/

## How to run
Get GIT if you don't have it yet https://git-scm.com/downloads

Get Node.JS if you don't have it yet https://nodejs.org/en/download

Download source code and enter directory

`git clone https://github.com/kalinbas/bitso-historical-data.git`

`cd bitso-historical-data`

For example: Download all historical data btc_mxn 1h candles from 2020-01-01 to 2021-01-01 and save to output.csv (candle size in seconds 3600s)

`node index.js btc_mxn output.csv 2020-01-01 2021-01-01 3600`

Valid values for timeframe
- 60 (1 min)
- 300 (5 min)
- 900 (15 min)
- 1800 (30 min)
- 3600 (1 h)
- 14400 (4 h)
- 21600 (6 h)
- 43200 (12 h)
- 86400 (1 d)
- 259200 (3 d)
- 604800 (7 d)

In example.csv you can see an example output.

## Advice
This code uses an undocumented WS so if for some reason it won't work anymore you can use a slower version (index_slow.js) which rebuilds candles from order history.
