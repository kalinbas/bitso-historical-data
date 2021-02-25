// this code uses undocumented /v3/ohlc WS to directly download candles from api.bitso.com

const https = require('https')
const fs = require('fs')

async function run() {

  const args = process.argv.slice(2)

  // process command line arguments
  const book = args[0]
  const fileName = args[1]
  const from = new Date(args[2]).getTime()
  const to = new Date(args[3]).getTime()
  const tf = Number(args[4])

  const tfms = tf * 1000

  const pageSize = 1000

  let currentTime = from - (from % tfms)

  let lines = ["Time UTC,Open,High,Low,Close,Volume,Trades"]

  while (currentTime < to) {

      // log progress
      console.log(new Date(currentTime).toISOString())

      const data = await getData(book, currentTime, Math.min(to, currentTime + (tfms * (pageSize - 1))), tf)

      currentTime += tfms * pageSize

      if (data && data.success) {        

        for (let i = 0; i < data.payload.length; i++) {
          const p = data.payload[i]
          const line = `${new Date(p.bucket_start_time).toISOString()},${p.first_rate},${p.max_rate},${p.min_rate},${p.last_rate},${p.volume},${p.trade_count}`
          lines.push(line)
        }

        // wait 1 second for bitso rate limit
        await delay(1000)

      } else {
        console.log("Error fetching data", data)
        break
      }    
  }

  fs.writeFileSync(fileName, lines.join('\n'))
}

async function getData(book, currentTimeFrom, currentTimeTo, tf) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.bitso.com',
      path: `/v3/ohlc?book=${book}&time_bucket=${tf}&start=${currentTimeFrom}&end=${currentTimeTo}`,
      port: 443,
      method: 'GET'
    }, (res) => {
      let str = ''
      res.on('data', function (chunk) {
        str += chunk
      })
      res.on('error', (err) => {
        reject(err)
      })
      res.on('end', function () {
        resolve(JSON.parse(str))
      })
    })
    req.end()
  })
}

async function delay(millis) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, millis)
  })
} 

run()
