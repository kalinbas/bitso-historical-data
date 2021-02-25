# Bitso Historical Data
Get historical data from Bitso (https://bitso.com) OHLC csv format.

You can get list of available books from their API https://api.bitso.com/v3/available_books/

## How to run
Get Node.JS if you don't have it yet https://nodejs.org/en/download/

For example: Download historical data btc_mxn 1 minute candles from 01/01/2020 to 01/01/2021 and save to output.csv

`node index.js btc_mxn output.csv 1577836800000 1609459200000 60`

Start and endtime are in UNIX Timestamp Milliseconds, Candle size is in seconds (60s)

If you want for example 1h candles (3600s) just run 

`node index.js btc_mxn output.csv 1577836800000 1609459200000 3600`

In example.csv you can see an example output.

## Advice
This code uses a undocumented WS so if for some reason it won't work anymore you can use a slower version (index_slow.js) which rebuilds candles from order history.
