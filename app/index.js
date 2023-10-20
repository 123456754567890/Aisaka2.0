const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js")
const fs = require("fs");
const db = require('croxydb')
const config = require("./config.json");

const Rest = require("@discordjs/rest");
const DiscordApi = require("discord-api-types/v10");

const client = new Discord.Client({
	intents:  3276543,
    partials: Object.values(Discord.Partials),
	allowedMentions: {
		parse: ["users", "roles", "everyone"]
	},
	retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

/*                         SLASH COMMANDS                               */

console.log(`[-] ${fs.readdirSync("./commands").length} komut algılandı.`)

for(let commandName of fs.readdirSync("./commands")) {
	if(!commandName.endsWith(".js")) return;

	const command = require(`./commands/${commandName}`);	
	client.commands.push({
		name: command.name.toLowerCase(),
		description: command.description.toLowerCase(),
		options: command.options,
		dm_permission: false,
		type: 1
	});

	console.log(`[+] ${commandName} komutu başarıyla yüklendi.`)
}

/*                         EVENTS                                    */

console.log(`[-] ${fs.readdirSync("./events").length} olay algılandı.`)

for(let eventName of fs.readdirSync("./events")) {
	if(!eventName.endsWith(".js")) return;

	const event = require(`./events/${eventName}`);	
	const evenet_name = eventName.split(".")[0];

	client.on(event.name, (...args) => {
		event.run(client, ...args)
	});

	console.log(`[+] ${eventName} olayı başarıyla yüklendi.`)
}

/*                     LOADING SLASH COMMANDS                     */

//

client.once("ready", async() => {
	const rest = new Rest.REST({ version: "10" }).setToken(config.token);
  try {
    await rest.put(DiscordApi.Routes.applicationCommands(client.user.id), {
      body: client.commands,  //
    });
  } catch (error) {
    throw error;
  }
});

client.login(config.token).then(() => {
	console.log(`[-] Discord API'ye istek gönderiliyor.`);
	eval("console.clear()")
}).catch(() => {
	console.log(`[x] Discord API'ye istek gönderimi başarısız.`);
});
client.on("guildCreate", async guild => {
   let entry = await guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
  let dogru = {
      NONE: "Sunucu Doğrulaması Yok.",
      LOW: "Düşük (E-posta Doğrulaması)",
      MEDIUM: "Orta (5 Dk Üyelik)",
      HIGH: "Yüksek (10 Dk Üyelik)",
      VERY_HIGH: "Çok Yüksek (Telefon Doğrulamalı)"
};
  var aylar = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
};
  let ses =
              guild.channels.cache.filter(chan => chan.type === "voice").size
let kanalsayı = guild.channels.cache.size
  let yazısayı = guild.channels.cache.filter(chan => chan.type === "text").size;
let duyurusayı = guild.channels.cache.filter(chan => chan.type === "news").size;
let cotegory = guild.channels.cache.filter(chan => chan.type === "category").size
let zoom = guild.createdAt.getTime()
let hey = moment(zoom).fromNow()  

const embed = new Discord.MessageEmbed()
.setColor("40ff00")
.setAuthor("Sunucuya Eklendim!", guild.iconURL())
.addField("Sunucu İsmi", guild.name, true)
.addField("Sunucu ID", guild.id, true)
.addField("Sunucu Bölgesi", guild.region, true)
.addField("Sunucu Oluşturma Tarihi",`${moment(guild.createdAt).format("DD")} ${aylar[moment(guild.createdAt).format("MM")]} ${moment(guild.createdAt).format("YYYY")} (${hey})`, true)
.addField("Sunucu Doğrulama Seviyesi", `${dogru[guild.verificationLevel]}`, true)
.addField("Sunucudaki Üye Sayısı", `${guild.members.cache.size}`, true)
.addField("Sahip ID", guild.owner.id, true)
.addField("Sahip Etiket", `<@!${guild.owner.id}>`, true)
.addField("Botu Ekleyen", `<@!${entry.executor.id}>`, true)
.addField("Botu Ekleyen ID", entry.executor.id, true)
.addField("Sunucudaki Rol Sayısı", guild.roles.cache.size, true)
.addField("Sunucudaki Emoji Sayısı", guild.emojis.cache.size, true)
.addField("Sunucudaki Kanal Sayısı", guild.channels.cache.size, true)
.addField(`**Kanallar:** [${kanalsayı}]`,`\n<a:twitchbit:801155287842947133> **${ses}** Sesli \n **${yazısayı}** Metin \n **${duyurusayı}** Duyuru \n: **${cotegory}** Kategori`, true)
client.channels.cache.get("1152995424261652550").send(embed)
})
client.on("guildDelete", async guild => {
  let dogru = {
      NONE: "Sunucu Doğrulaması Yok.",
      LOW: "Düşük (E-posta Doğrulaması)",
      MEDIUM: "Orta (5 Dk Üyelik)",
      HIGH: "Yüksek (10 Dk Üyelik)",
      VERY_HIGH: "Çok Yüksek (Telefon Doğrulamalı)"
};
  var aylar = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
};
let zoom = guild.createdAt.getTime()
let hey = moment(zoom).fromNow()  
const embed = new Discord.MessageEmbed()
.setColor("ff0000")
.setAuthor("Sunucudan Atıldım!", guild.iconURL())
.addField("Sunucu İsmi", guild.name, true)
.addField("Sunucu ID", guild.id, true)
.addField("Sunucu Bölgesi", guild.region, true)
.addField("Sunucu Oluşturma Tarihi",`${moment(guild.createdAt).format("DD")} ${aylar[moment(guild.createdAt).format("MM")]} ${moment(guild.createdAt).format("YYYY")} (${hey})`, true)
.addField("Sunucu Doğrulama Seviyesi", `${dogru[guild.verificationLevel]}`, true)
.addField("Sunucudaki Üye Sayısı", `${guild.members.cache.size}`, true)
.addField("Sahip ID", guild.owner.id, true)
.addField("Sahip Etiket", `<@!${guild.owner.id}>`, true)
.addField("Sunucudaki Rol Sayısı", guild.roles.cache.size, true)
.addField("Sunucudaki Emoji Sayısı", guild.emojis.cache.size, true)
.addField("Sunucudaki Kanal Sayısı", guild.channels.cache.size, true)
client.channels.cache.get("1152995424261652550").send(embed)
});