import { MessageEmbed } from 'discord.js'

import { upperFirst } from 'lodash'

import { fetch } from '../core/fetch'

import { IAPIResponse } from '../@types/IAPIResponse'
import { IHentai } from '../@types/IHentai'

export const getHentaiById = async (id: string | number): Promise<MessageEmbed> => {
  try {
    const out = await fetch<IAPIResponse<IHentai>>(
      `https://h.api.rayriffy.com/v1/gallery/${id}`
    )

    const hentai = out.response.data

    const payload = new MessageEmbed()
      .setTitle(hentai.title.pretty)
      .setDescription(hentai.title.japanese)
      .addField('Page', hentai.images.pages.length)
      .addField('Language', hentai.tags.filter(o => o.type === 'language')[0] ? upperFirst(hentai.tags.filter(o => o.type === 'language')[0].name) : 'Unknown')
      .setImage(`https://t.nhentai.net/galleries/${hentai.media_id}/cover.${hentai.images.cover.t === 'p' ? 'png' : 'jpg'}`)
      .setURL(`https://h.rayriffy.com/g/${hentai.id}`)

    return payload
  } catch (e) {
    throw e
  }
}
