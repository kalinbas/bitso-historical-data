const https = require('https')
const fs = require('fs')

async function run() {

  const args = process.argv.slice(2)

  // process command line arguments
  const book = args[0]
  const fileName = args[1]
  const timeFrame = Number(args[2])  
  const limit = args[3] ? Number(args[3]) : null

  let finished = false
  let currentTime = null
  let marker = null
  let lines = ["Time UTC,Open,High,Low,Close,Volume"]

  let open = null, high = null, low = null, volume = 0, close = null

  while (!finished) {
      const data = await getData(book, marker)

      if (data && data.success) {
        if (currentTime === null && data.payload.length > 0) {
          const time = new Date(data.payload[0].created_at).getTime()
          currentTime = time - (time % timeFrame)
        }

        console.log(new Date(currentTime).toISOString())

        for (let i = 0; i < data.payload.length; i++) {
          const order = data.payload[i]
          const price = Number(order.price)
          const time = new Date(data.payload[i].created_at).getTime()
          if (time >= currentTime) {
            if (high === null || high < price) high = price
            if (low === null || low > price) low = price
            if (close === null) close = price
            if (time === currentTime) open = price
            volume += Number(order.amount)
          } else {
            const line = `${new Date(currentTime).toISOString()},${open || price},${high},${low},${close},${volume.toFixed(8) }`
            lines.push(line)
            currentTime -= timeFrame
            while(time < currentTime) {
              const line = `${new Date(currentTime).toISOString()},${price},${price},${price},${price},0`
              lines.push(line)
              currentTime -= timeFrame
            }
            open = null, high = null, low = null, volume = 0, close = null
            i--
          }
          marker = order.tid
        }

        // if no more data is delivered - finish
        if (data.payload.length === 0 || (limit && lines.length > limit)) {
          finished = true
        }

        // wait 1 second for bitso rate limit
        await delay(1000)

      } else {
        console.log("Error fetching data", data)
        finished = true
      }    
  }

  fs.writeFileSync(fileName, lines.join('\n'))
}

async function getData(book, marker) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.bitso.com',
      path: `/v3/trades/?book=${book}&limit=100${marker ? '&marker=' + marker : ''}`,
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
