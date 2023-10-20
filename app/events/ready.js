const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")
const db = require("croxydb")

module.exports = {
  name: Discord.Events.ClientReady,

  run: async(client, message) => {
    console.log(`${client.user.tag} Aktif!`);
    const activities = [
      "🎫 | Destek sistemi ile sunucuna destek sistemi kur!",
      
      "👮🏽‍♂️ | Captcha sistemi ile sunucunu güvene al!",
      "🌟 | Deneme aşamasında !",
      "💙 | 72 Adet komut !",
      "/yardım"
    ]
    
    setInterval(async() => {
      client.user.setPresence({ activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}` }], status: 'idle' });
    }, 1000 * 15);
	db.set(`botAcilis_`, Date.now())


  }
}