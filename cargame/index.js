// 引用 linebot 套件
import linebot from 'linebot'
// 引用 dotenv 事件
import dotenv from 'dotenv'
// 引用 request 套件
import rp from 'request-promise'

// 讀取 .env 檔
dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

let re = []
const animal = async (event) => {
  let msg = ''
  let img = ''
  try {
    const data = await rp({ uri: 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL', json: true })
    const number = Math.floor(Math.random() * data.length)
    msg = '品種：' + data[number].animal_kind + '\n' + '性別：' + data[number].animal_sex + '\n' + '毛色：' + data[number].animal_colour + '\n' + '收容所：' + data[number].animal_place
    console.log('0')

    img = {
      type: 'image',
      originalContentUrl: data[number].album_file,
      previewImageUrl: data[number].album_file
    }
  } catch (error) {
    msg = '發生錯誤'
  }
  re = [msg, img]
}
// 當收到訊息時
bot.on('message', async (event) => {
  await animal()
  event.reply(re)
})
animal()

// 在 port 啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
