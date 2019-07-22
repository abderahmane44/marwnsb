const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://lolfg.glitch.me/`);
}, 280000);


const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
const {TOKEN, YT_API_KEY, prefix, devs} = require('./config')
const Discord = require('discord.js');  
const db = require('quick.db');  
const hastebin = require('hastebin-gen');  
const client = new Discord.Client();    
const Canvas = require('canvas');        
const fs = require("fs"); 
const Data = {};
const dailies = require("./dailies.json")
const getYoutubeID = require('get-youtube-id'); 
const moment = require("moment");   
const UserBlocked = new Set();  
const jimp = require('jimp');
const sqlite3 = require("sqlite3");
const sql = new sqlite3.Database("./edited.sqlite");
const math = require('math-expression-evaluator'); 
const stripIndents = require('common-tags').stripIndents;
const figlet = require('figlet'); 
const queue = new Map(); 
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const dateFormat = require('dateformat'); 
const pretty = require('pretty-ms') 
,ti={}  
,spee={}; 


client.login(TOKEN);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
 client.on('message' , message => {
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "ping")) {
 message.channel.send('Pong...').then((msg) => {
      msg.edit(`\`\`\`javascript\nTime taken: ${msg.createdTimestamp - message.createdTimestamp} ms.\nDiscord API: ${Math.round(client.ping)} ms.\`\`\``);
 })
  }  
 });



client.on('message', message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "help")) {
      message.author.send(`**
❆ Informetion Commands | الأوامر التعريفية :
ㄨ \`!stats\` : معلومات عن البوت
ㄨ \`!settings\` : رؤية ما يمكن إعدادة في البوت
ㄨ \`!ping\` : رؤية سرعة البوت
ㄨ \`!invite\` : لدعوة البوت

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃**
`)


  }
});

client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === prefix + "help") {
      message.author.send(`
** ❆ Public Commands | الأوامر العامة :
ㄨ \`!colors\` : رؤية علبة الألوان
ㄨ \`!color [Number]\` : لإختيار لونك
ㄨ \`!npm\` : للحصول على بكج من (Npmjs.)
ㄨ \`!text create\` : لإنشاء ملف 
ㄨ \`!text delete\` : لمسح ملف
ㄨ \`!docs\` : للعثور على أشياء من : (Discord.js Docs.)
ㄨ \`!user\` : معلومات عن الشخص 
ㄨ \`!wiki\` : للبحث في موقع ويكيبيديا
ㄨ \`!urban\` : للبحث في موسوعه (urban)
ㄨ \`!avt\` : رؤية صورتك الشخصية + صورة شخص أخر
ㄨ \`!id\` : معلومات حسابك
ㄨ \`!members\` : لرؤية عدد الأعضاء مع فلتر خاص لكل شخص 
ㄨ \`!short\` : لاِختصار الروابط
ㄨ \`!server\` : معلومات عن السيرفر
ㄨ \`!roll\` : القرعة
ㄨ \`!donate\` : للتبرع للبوت
ㄨ \`!steam\` : معرفة تفاصيل عن لعبة في متجر ستيم
ㄨ \`!clock\` : لرؤية الساعة 
ㄨ \`!hypixel\` : لرؤية أحصائيآت في هآيبكسل 

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃**
`)
      // ❯ , »   


  }
});









client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === prefix + "help") {
      message.author.send(`
** ❆ Staff Commands | الأوامر الإدارية :
ㄨ \`!welcome\` : أوامر الولكم
ㄨ \`!points\` : للنقاط | \`\`[مسابقآت|فعاليات]\`\`
ㄨ \`!delete\` : مسح عدد ما من الرسائل  
ㄨ \`!ban\` : إعطاء حظر
ㄨ \`!kick\` : إعطاء طرد
ㄨ \`!mmove\` : لنقل أحد من روم لأخر
ㄨ \`!moveall\` : لسحب جميع الأعضاء لرومك
ㄨ \`!vkick\` : لطرد عضو من روم محدد  

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
                       **   `);


  }
});


const os = require('os');
client.on('message', message => {

  if (message.content.startsWith(prefix + "stats") || message.content.startsWith(prefix + "bot")) {
      message.channel.send({
          embed: new Discord.RichEmbed()
              .setColor('RANDOM')
              .setTitle('❆ | Stats.')
              .addField('ㄨ Ping:',       `**\`${client.ping}\`ms.**`)
              .addField('ㄨ RAM Usage:',  `**\`${(process.memoryUsage().rss / 1048576).toFixed()}\`MB.**`)
              .addField('ㄨ Guilds:',     `**\`${client.guilds.size}\`**`)
              .addField('ㄨ Channels:',   `**\`${client.channels.size}\`**`)
              .addField('ㄨ Users:',      `**\`${client.users.size}\`**`)
              .addField('ㄨ Name/Tag:',   `**\`${client.user.tag} | (${client.user.id})\`**`)
              .addField('ㄨ Platform:',   `**\`${os.platform()}\`**`)
              .addField('ㄨ Host:',       `**\`The Devs Do not let me show you this\`**`)
              .addField('ㄨ WebSite:',    `**\`Need a web designer\`**`)
              .addField('ㄨ Developers:', `**<@575791868948774934> , <@592443572066713601> **`)
      })
  }
})


client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === prefix + "help") {
      message.author.send(`
** ❆ Profile & Games Commands | أوامر البروفايل والألعاب :
                                                  
                                      
ㄨ \`!credit\` : رؤية رصيدك
ㄨ \`!profile\` : رؤية بروفايلك
ㄨ \`!background [1-27]\` : لرؤية الخلفيات
ㄨ \`!buy\` : للحصول خلفية
ㄨ \`!rep\` : لإعطاء ريب 
ㄨ \`!note\` : لوضع وصف عنك في بروفايلك
ㄨ \`!daily\` : اخذ مكافئتك اليومية
ㄨ \`!fa\` : لعبة اسرع كتابة
ㄨ \`!le\` : لعبة فكك
ㄨ \`!ma\` : لعبة رياضيات

▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃
                                  **    `);


  }
});


client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === prefix + "invite" || message.content === prefix + "inv") {
      message.author.send(`**https://discordapp.com/oauth2/authorize?client_id=602099351979819024&permissions=8&scope=bot**`);


  }
});

client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === prefix + "help") {
      message.channel.send(`**:information_source: | Help Menu in DM , رسالة المساعدة في الخاص .**`);


  }
});

client.on('message', msg => {
  if (msg.content === (prefix + "settings")) {
      const embed = new Discord.RichEmbed()
          .setAuthor('❆ Settings:', 'https://labs-public-dl.xda-cdn.com/images/af6aef8c-4d0a-41f4-8afb-5b8572aa3697.png')
          .addField(`❆ Values: `, `ㄨ \`limitsban\`, \`limitskick\`, \`limitsroleD\`, \`limitsroleC\`, \`limitschannelD\`, \`limitstime\`, \`setMedia\`, \`infoMedia\`, \`toggleMedia\`, \`setwel\`, \`setrole\`, \`AntiFake\`, \`SetFake\`, \`SetSug\`, \`AntiBots\``)
          .addField(`❆ Commands: `, `ㄨ !settings [limitsban/limitschannelD/...] [vlaue]\nㄨ !settings [AntiFake/AntiFake/...] [On/Off]`)
      msg.channel.send(embed)

  };
});

client.on('message', message => {
    if (message.content == ('!clock')) {
        const w = ['./img/wc4.png'];

        let Image = Canvas.Image,
            canvas = new Canvas.Canvas(400, 400),
            ctx = canvas.getContext('2d');
        var radius = canvas.height / 2;
        var currentTime = new Date(),
            hours = currentTime.getHours(),
            minute = currentTime.getMinutes();
        var second = currentTime.getSeconds();
        ctx.translate(radius, radius);
        radius = radius * 0.90

        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 400, 169);
        })


        ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;

        })
        let user = message.mentions.users.first();
        var men = message.mentions.users.first();
        var heg;
        if (men) {
            heg = men
        } else {
            heg = message.author
        }
        var mentionned = message.mentions.members.first();
        var h;
        if (mentionned) {
            h = mentionned
        } else {
            h = message.member
        }
        var ment = message.mentions.users.first();
        var getvalueof;
        if (ment) {
            getvalueof = ment;
        } else {
            getvalueof = message.author;
        } //ما خصك ,_,
        let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
        jimp.read(url, (err, ava) => {
            if (err) return console.log(err);
            ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                if (err) return console.log(err);


                function drawFace(ctx, radius) {
                    var grad;
                    ctx.beginPath();
                    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
                    grad.addColorStop(0, '#333');
                    grad.addColorStop(0.5, 'black');
                    grad.addColorStop(1, '#333');
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = radius * 0.1;
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
                    ctx.fillStyle = '#333';
                    ctx.fill();
                }
                drawClock();

                function drawClock() {
                    drawFace(ctx, radius);
                    drawNumbers(ctx, radius);
                    drawTime(ctx, radius);
                }

                function drawNumbers(ctx, radius) {
                    var ang;
                    var num;
                    ctx.font = radius * 0.15 + "px arial";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    for (num = 1; num < 13; num++) {
                        ang = num * Math.PI / 6;
                        ctx.rotate(ang);
                        ctx.translate(0, -radius * 0.85);
                        ctx.rotate(-ang);
                        ctx.fillText(num.toString(), 0, 0);
                        ctx.rotate(ang);
                        ctx.translate(0, radius * 0.85);
                        ctx.rotate(-ang);
                    }
                }

                function drawTime(ctx, radius) {

                    if (hours > 12) {
                        hours -= 12;
                    } else if (hours == 0) {
                        hours = "12";
                    }
                    if (minute < 10) {
                        minute = '0' + minute;
                    }
                    //hour
                    hours = hours % 12;
                    hours = (hours * Math.PI / 6) +
                        (minute * Math.PI / (6 * 60)) +
                        (second * Math.PI / (360 * 60));
                    drawHand(ctx, hours, radius * 0.5, radius * 0.07);
                    //minute
                    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
                    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
                }

                function drawHand(ctx, pos, length, width) {
                    ctx.beginPath();
                    ctx.lineWidth = width;
                    ctx.lineCap = "round";
                    ctx.moveTo(0, 0);
                    ctx.rotate(pos);
                    ctx.lineTo(0, -length);
                    ctx.stroke();
                    ctx.rotate(-pos);
                }






                var currentTime = new Date(),
                    hours2 = currentTime.getHours(),
                    minutes2 = currentTime.getMinutes(),
                    seconds2 = currentTime.getSeconds();

                if (hours2 > 12) {
                    hours2 -= 12;
                } else if (hours2 == 0) {
                    hours2 = "12";
                }
                if (minutes2 < 10) {
                    minutes2 = '0' + minutes2;
                }

                message.channel.send((`**:clock: | الساعة الحالية : ${hours2}:${minutes2}:${seconds2}**`));



                message.channel.sendFile(canvas.toBuffer());




            })
        })
    }
});



client.on('message', message => {
  if (message.channel.type == "dm") return console.log(message.author.username + ` => type this (${message.content}) in Dm`);
  if (message.author.bot) return;


  // T E X T - S Y S T E M //
  function getUserData(id) {
    sql.get(`select * from scores where userId = "${id}"`).then(row => {
      return row;
    }).catch(e => {
      sql.run(`INSERT INTO scores (
      userId, winNu ,
      loseNu,gamesNu,
      pointsFkk,points3oasm,
      pointslogo,pointsimoje,
      pointssr3h,pointsa3lam,
      xp , credit,
      level , like,
      ane , background,
      vcpoints, vclevel,
      guildId, xpguild
      ) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,?,?,?,?,?,?,?,?, ?, ? , ?)`, [message.author.id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, '$عني', 'default', 1, 0, message.guild.id, 0]);
      return sql.get(`select * from scores where userId = "${id}"`);
    });
  }
  client.on('message', async message => {
    if (message.channel.type == "dm") return console.log(message.author.username + ` => type this (${message.content}) in Dm`);
    if (message.author.bot || message.system) return;
    /* T E X T - S Y S T E M */
    if (message.content.startsWith(prefix + "daily") || message.content.startsWith(prefix + "هدية")) {
      let cooldown = 8.64e+7;
      let lastDaily = dailies[message.author.id]
      if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = (cooldown - (Date.now() - lastDaily));
        message.channel.send(`**:stopwatch: |  ${message.author.username}, هناك مدة زمنية محددة للحصول علي هدية جديدة :  \`${pretty(timeObj, {verbose:true})}\`**`)
      } else {
        const amount = 500;
        dailies[message.author.id] = Date.now();
        sql.run(`UPDATE scores SET credit = ${.credit + amount} WHERE userId = ${message.author.id}`);
        message.channel.send(`**:atm: | ${message.author.username}, لقد أستلمت : \`${amount}\` كـهدية يومية **`)
        fs.writeFile("./dailies.json", JSON.stringify(dailies, null, 2), (err) => {
          if (err) console.log(err);
        });
      };
    };
    if (message.content.startsWith(prefix + "credits") || message.content.startsWith(prefix + "credit")) {
      let row = getUserData(message.author.id);
      if (message.mentions.users.size < 1) {
        return message.channel.send(`**:credit_card:  | ${message.author.username}, لديك :  ` + "``$" + `${row.credit} ` + "``" + ` من الكريديت **`).catch(error => message.channel.send(`**:white_check_mark: | تم تفعيل حسابك البنكي **`));
      } else {
        let transferto = message.mentions.users.first();
        if (transferto.bot) return message.channel.send(`**:robot:  |  ${message.author.username}, البوتات لا تمتلك ليفيل وكريديت . :wink:**`);
        if (transferto.id === message.author.id) return message.channel.send(`من جدك ؟`);
        let transfer = message.content.split(" ").slice(2).join("");
        if (row.credit < transfer) return message.channel.send(`**:thinking: | ${message.author.username}, ليس لديك المال الكافي لذلك**`)
        //getting data from database for the target
        let transfertoRow = getUserData(transferto.id);
        if (!transfer) return message.channel.send(`**:credit_card:  |  ${transferto.username}, لديك : ` + "``$" + `${transfertoRow.credit} ` + "``" + ` من الكريديت**`);
        if (isNaN(transfer) || transfer < 1) return message.channel.send("**:x: | يرجي أدخال رقم صحيح **");
        //awaiting for the confirm message
        function codeGen() {
          return Math.floor(Math.random() * (9 - 0 + 1) + 0);
        }
        let code = `${codeGen()}${codeGen()}${codeGen()}${codeGen()}`;
        message.channel.send(`➡  | لتحويل مبلغ : ${transfer}
      الى : ${transferto}
      يرجاء كتابة الرقم التالي: \`\`\`${code}\`\`\``).then(codeMessage => {
          message.channel.awaitMessages(m => m.author.id === message.author.id, {
            time: 20000,
            max: 1,
            errors: ["time"]
          }).then(messages => {
            let msg = messages.first();
            codeMessage.delete();
            if (msg.content !== code) return message.channel.send(`خطأ`);
            //transfering the money 
            sql.run(`UPDATE scores SET credit = credits - ${parseInt(transfer)} WHERE userId = ${message.author.id}`);
            sql.run(`UPDATE scores SET credit = credits + ${parseInt(transfer)} WHERE userId = ${transferto.id}`);
            //sending messages
            message.channel.send(` **➡  |  تمت عملية التحويل  
          🕊 |  ${transferto} : ${message.author.username}, لقد قمت بأرسال  ` + "$`" + transfer + "`" + ` لـ ** `)
            transferto.send(`**:atm: | تمت عملية التحويل** \`\`\`\n لقد حولت : ${transfer}  لـ  ${message.author.username} . (ID: ${message.author.id})\`\`\``)
            .channels.get("550305753488031764").send(`ايدي المرسل : \`${transferto.id}\`
          اسم المستقبل : \`${transferto.username}\`
          ايدي المستقبل : \`${message.author.id}\`
          اسم المرسل : \`${message.author.username}\`
          المبلغ : \`${transfer}\`
          `);
          })
        });
      };
    };
  });
})