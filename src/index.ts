import { Client } from 'discord.js'
import http from 'http'

import { isNumber } from 'lodash-es'

import { getHentaiById } from './services/getHentaiById'

const client = new Client()
const { DISCORD_TOKEN = '' } = process.env

client.on('ready', () => {
  console.log('Ready!')
})

client.on('message', async message => {
  if (message.content?.startsWith('!tenka ')) {
    const query = message.content.substr(7)
    
    switch(query.split(' ')[0]) {
      case 'nh':
        const key = query.split(' ')[1].toLocaleLowerCase()
        
        if (key === 'rand' || key === 'random') {
          // Random nh
          try {
            const hentai = await getHentaiById((Math.floor(Math.random() * 100000000000) % 350000) - 1)

            if (message.channel !== null) message.channel.send(hentai)
          } catch {
            if (message.reply !== null) message.reply(`Could not get data properly from server`)
          }
        } else if (isNumber(key)) {
          // Get from ID
          try {
            const hentai = await getHentaiById(key)

            if (message.channel !== null) message.channel.send(hentai)
          } catch {
            if (message.reply !== null) message.reply(`Could not find hentai in NHentai with ID ${key}`)
          }
        } else {
          // Search
          if (message.reply !== null) message.reply('Sorry, search hentai by keyword feature is not available')
        }
        
        break
      default:
        if (message.reply !== null) message.reply('Command not found')
        break
    }
  }
})

client.login(DISCORD_TOKEN)

http.createServer().listen(3000)
