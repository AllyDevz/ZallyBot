const express = require("express");
const http = require("http");  
const url = require(`url`);
const path = require(`path`);
const { Permissions } = require("discord.js");
const ejs = require("ejs");
const fs = require("fs")
const passport = require(`passport`);
const bodyParser = require("body-parser");
const Strategy = require(`passport-discord`).Strategy;
const BotConfig = require("../botconfig/config.json");
const BotFilters = require("../botconfig/filters.json");
const BotEmojis = require("../botconfig/emojis.json");
const BotEmbed = require("../botconfig/embed.json");

info = require("../Database/user.js")


module.exports = client => {
    //Start teh website
    console.log("Loading DashBoard settings".brigthGreen)
    const settings = require("./settings.json");
    
    // We instantiate express app and the session store.
    const app = express();
    const httpApp = express();
    
    const session = require(`express-session`);
    const MemoryStore = require(`memorystore`)(session);
    
 
    //(`${user.id}`,`${args2}`);
    /**
     * @INFO - Initial the Discord Login Setup!
     */
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));
    passport.use(new Strategy({
      clientID: settings.config.clientID,
      clientSecret: settings.config.secret,
      callbackURL: settings.config.callback,      
      scope: [`identify`, `guilds`, `guilds.join`]
    },
    (accessToken, refreshToken, profile, done) => { 
      process.nextTick(() => done(null, profile));
    }));

    
    /**
     * @INFO - ADD A SESSION SAVER
     */
    app.use(session({
        store: new MemoryStore({ checkPeriod: 86400000 }),
        secret: `#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n`,
        resave: false,
        saveUninitialized: false,
    }));

    // initialize passport middleware.
    app.use(passport.initialize());
    app.use(passport.session());


    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, './views'))


    //Those for app.use(s) are for the input of the post method (updateing settings)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({
      extended: true
    }));

    //LOAD THE ASSETS
    app.use(express.static(path.join(__dirname, './public')));
    //Load .well-known (if available)
    
    app.use(express.static(path.join(__dirname, '/'), {dotfiles: 'allow'}));
    
    // We declare a checkAuth function middleware to check if an user is logged in or not, and if not redirect him.
    const checkAuth = (req, res, next) => {
      if (req.isAuthenticated()) return next();
      req.session.backURL = req.url;
      res.redirect("/login");
    };

    //Login endpoint
    app.get(`/login`, (req, res, next) => {
        if (req.session.backURL) {
          req.session.backURL = req.session.backURL; 
        } else if (req.headers.referer) {
          const parsed = url.parse(req.headers.referer);
          if (parsed.hostname === app.locals.domain) {
            req.session.backURL = parsed.path;
          }
        } else {
          req.session.backURL = `/`;
        }
        next();
      }, passport.authenticate(`discord`, { prompt: `none` })
    );

    
    //Callback endpoint for the login data
    app.get(`/callback`, passport.authenticate(`discord`, { failureRedirect: "/" }), async (req, res) => {
        let banned = false // req.user.id
        if(banned) {
                req.session.destroy(() => {
                res.json({ login: false, message: `You have been blocked from the Dashboard.`, logout: true })
                req.logout();
            });
        } else {
            res.redirect(`/dashboard`)
        }
    });



    //When the website is loaded on the main page, render the main page + with those variables
    app.get("/", (req, res) => {
      if(!req.isAuthenticated() || !req.user) 
      return res.redirect("/login");
        res.render("index", {
          req: req,
          user: req.isAuthenticated() ? req.user : null,
          
          //guild: client.guilds.cache.get(req.params.guildID),
          botClient: client,
          Permissions: Permissions,
          bot: settings.website,
          callback: settings.config.callback,
          categories: client.categories, 
          commands: client.commands,
          BotConfig: BotConfig,
          BotFilters: BotFilters,
          BotEmojis: BotEmojis,
          Guild: client.guilds.cache.size,
        });
    })


    // When the commands page is loaded, render it with those settings
    app.get("/commands", (req, res) => {
      if(!req.isAuthenticated() || !req.user) 
      return res.redirect("/login");
      res.render("commands", {
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        //guild: client.guilds.cache.get(req.params.guildID),
        botClient: client,
        Permissions: Permissions,
        bot: settings.website,
        callback: settings.config.callback,
        categories: client.categories, 
        commands: client.commands, 
        BotConfig: BotConfig,
        BotFilters: BotFilters,
        BotEmojis: BotEmojis,
      })
    })


    //Logout the user and move him back to the main page
    app.get(`/logout`, function (req, res) {
      req.session.destroy(() => {
        req.logout();
        res.redirect(`/`);
      });
    });
    app.get('/dc/:url(*)', async function (req, res) {
      var url = req.params.url;
      let teste = await info.findOne({
                  userID: url
              }) || { economia: { banco: 0, money: 0}, color:"36393e",sobremim: { type: String, default: "Para Altera o Texto va no seu servidor onde esta o bot e dige /sobremim" },rep: { type: Number, default: 0 },usuario: { type: String, default: "Usuario Não Registrado" }}
      const banco = teste.economia.banco 
      const money = teste.economia.money     
      const sobre = teste.economia.sobremim 
      const total = (money + banco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      const reput = teste.economia.rep
      const nome = teste.economia.usuario
      
      console.log(teste)
      res.render("dc", {
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        //guild: client.guilds.cache.get(req.params.guildID),
        id: url, 
        bancy: banco,
        todo: total,
        wall: teste.economia.background,
        grana: money,
        rea: reput,
        usuario: nome,
        desc: sobre,
        botClient: client,
        Permissions: Permissions,
        bot: settings.website,
        callback: settings.config.callback,
        categories: client.categories, 
        commands: client.commands, 
        BotConfig: BotConfig,
        BotFilters: BotFilters,
        BotEmojis: BotEmojis,
      });
    });
    // Dashboard endpoint.
    app.get("/pfstgs", checkAuth, async (req,res) => {
      const useid = req.user.id
      const usename = req.user.username
      const userdb = await info.findOne({
        userID: useid
    }) || { economia: { banco: 0, money: 0}, color:"36393e"}
      const avatar = `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`
      async function changewallpaper(w){
        userdb.economia.background = w; userdb.save()
      } 
      if(!req.isAuthenticated() || !req.user) 
      return res.redirect("/?error=" + encodeURIComponent("Login First!"));
        res.render("config", {
          req: req,
          user: req.isAuthenticated() ? req.user : null,
          //guild: client.guilds.cache.get(req.params.guildID),
          name: usename,
          id: useid, 
          economiagrana: userdb.economia.money,
          avata: avatar,
          botClient: client,
          wall: userdb.economia.background,
          Permissions: Permissions,
          bot: settings.website,
          callback: settings.config.callback,
          categories: client.categories, 
          commands: client.commands, 
          BotConfig: BotConfig,
          BotFilters: BotFilters,
          BotEmojis: BotEmojis,
        });
    })
    app.get("/dashboard", checkAuth, async (req,res) => {
      if(!req.isAuthenticated() || !req.user) 
      return res.redirect("/?error=" + encodeURIComponent("Login First!"));
      if(!req.user.guilds)
      return res.redirect("/?error=" + encodeURIComponent("Unable to get your Guilds!"));
        res.render("dashboard", {
          req: req,
          user: req.isAuthenticated() ? req.user : null,
          //guild: client.guilds.cache.get(req.params.guildID),
          botClient: client,
          Permissions: Permissions,
          bot: settings.website,
          callback: settings.config.callback,
          categories: client.categories, 
          commands: client.commands, 
          BotConfig: BotConfig,
          BotFilters: BotFilters,
          BotEmojis: BotEmojis,
        });
    })
    // Settings endpoint.
    app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
      // We validate the request, check if guild exists, member is in guild and if member has minimum permissions, if not, we redirect it back.
      const guild = client.guilds.cache.get(req.params.guildID);
      if (!guild) return res.redirect("/dashboard?error=" + encodeURIComponent("Can't get Guild Information Data"));
      let member = guild.members.cache.get(req.user.id);
      if (!member) {
        try {
          member = await guild.members.fetch(req.user.id);
        } catch (err) {
          console.error(`Couldn't fetch ${req.user.id} in ${guild.name}: ${err}`);
        }
      }
      const user2 = (`${req.user.id}`)
      if (!member) return res.redirect("/dashboard?error=" + encodeURIComponent("Unable to fetch you, sorry!"));
      if (!member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        return res.redirect("/dashboard?error=" + encodeURIComponent("You are not allowed to do that!"));
      }
      client.settings.ensure(guild.id, {
        prefix: BotConfig.prefix,      
        defaultvolume: 50,
        defaultautoplay: false,
        defaultfilters: [`bassboost6`, `clear`],
        djroles: [],
        nsfw: [],
        botchannel: [],
        wallpaper: BotConfig.wallpaper
      })


      // We render template using the absolute path of the template and the merged default data with the additional data provided.
      res.render("settings", {
          req: req,
          user: req.isAuthenticated() ? req.user : null,
          guild: client.guilds.cache.get(req.params.guildID),
          botClient: client,
          test: user2,
          Permissions: Permissions,
          bot: settings.website,
          callback: settings.config.callback,
          categories: client.categories, 
          commands: client.commands, 
          BotConfig: BotConfig,
          BotFilters: BotFilters,
          BotEmojis: BotEmojis,
        }
      );
    });

    app.post("/pfstgs", checkAuth, async (req, res) => {
      // We validate the request, check if guild exists, member is in guild and if member has minimum permissions, if not, we redirect it back.
      const useid = req.user.id
      const usename = req.user.username
      const userdb = await info.findOne({
        userID: useid
    }) || { economia: { banco: 0, money: 0}, color:"36393e"}
      const user2 = (`${req.user.id}`)
      const avatar = `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`
      if(req.body.wallpaper) userdb.economia.background = req.body.wallpaper; userdb.save()
      if(req.body.nome) userdb.economia.usuario = req.body.nome; userdb.save()
      // We render template using the absolute path of the template and the merged default data with the additional data provided.
      res.render("config",  {
        
          req: req,
          user: req.isAuthenticated() ? req.user : null,
          //guild: client.guilds.cache.get(req.params.guildID),
          name: usename,
          id: useid, 
          economiagrana: userdb.economia.money,
          avata: avatar,
          botClient: client,
          wall: userdb.economia.background,
          Permissions: Permissions,
          bot: settings.website,
          callback: settings.config.callback,
          categories: client.categories, 
          commands: client.commands, 
          BotConfig: BotConfig,
          BotFilters: BotFilters,
          BotEmojis: BotEmojis,
        }
      );
    });


    // Settings endpoint.
    app.post("/dashboard/:guildID", checkAuth, async (req, res) => {
      // We validate the request, check if guild exists, member is in guild and if member has minimum permissions, if not, we redirect it back.
      const guild = client.guilds.cache.get(req.params.guildID);
      if (!guild) return res.redirect("/dashboard?error=" + encodeURIComponent("Can't get Guild Information Data!"));
      let member = guild.members.cache.get(req.user.id);
      if (!member) {
        try {
          member = await guild.members.fetch(req.user.id);
        } catch (err) {
          console.error(`Couldn't fetch ${req.user.id} in ${guild.name}: ${err}`);
        }
      }
      if (!member) return res.redirect("/dashboard?error=" + encodeURIComponent("Can't Information Data about you!"));
      if (!member.permissions.has("MANAGE_GUILD")) {
        return res.redirect("/dashboard?error=" + encodeURIComponent("You are not allowed to do that!"));
      }
      const user2 = (`${req.user.id}`)
      if(req.body.prefix) client.settings.set(guild.id, String(req.body.prefix).split(" ")[0], "prefix")
      if(req.body.wallpaper) client.settings.set(guild.id, String(req.body.wallpaper).split(" ")[0], `${req.user.id}wallpaper`)
      if(req.body.defaultvolume) client.settings.set(guild.id, Number(req.body.defaultvolume), "defaultvolume")
      //if autoplay is enabled set it to true
      if(req.body.defaultautoplay) client.settings.set(guild.id, true, "defaultautoplay")
      console.log(user2)
      //otherwise not
      
      if(req.body.djroles) client.settings.set(guild.id, req.body.nsfw, "nsfw")   
      //if there are new defaultfilters, set them
      if(req.body.defaultfilters) client.settings.set(guild.id, req.body.defaultfilters, "defaultfilters")
      if(req.body.djroles) client.settings.set(guild.id, req.body.djroles, "djroles")
      if(req.body.botchannel) client.settings.set(guild.id, req.body.botchannel, "botchannel")
      // We render template using the absolute path of the template and the merged default data with the additional data provided.
      res.render("settings",  {
        
          req: req,
          user: req.isAuthenticated() ? req.user : null,
          guild: client.guilds.cache.get(req.params.guildID),
          botClient: client,
          test: user2,
          Permissions: Permissions,
          bot: settings.website,
          callback: settings.config.callback,
          categories: client.categories, 
          commands: client.commands, 
          BotConfig: BotConfig,
          BotFilters: BotFilters,
          BotEmojis: BotEmojis,
        }
      );
    });





















    // Queue Dash


    //Queue Dashes
    app.get("/loginpage", checkAuth, async (req,res, message) => {
      if(!req.isAuthenticated() || !req.user) 
      return res.redirect("/loginpage");
      if(!req.user.guilds)
      res.render("loginpage", {
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        //guild: client.guilds.cache.get(req.params.guildID),
        
        botClient: client,
        Permissions: Permissions,
        bot: settings.website,
        callback: settings.config.callback,
        categories: client.categories, 
        commands: client.commands, 
        BotConfig: BotConfig,
        name: "Dashboard Slortez",
        BotFilters: BotFilters,
        BotEmojis: BotEmojis,
        Guild: client.guilds.cache.size,
        im: settings.imagem,
        comentario: top1,

      });
    })
    app.get("/profile", checkAuth, async (req,res, message) => {
      if(!req.isAuthenticated() || !req.user) 
      return res.redirect("/loginpage");
      if(!req.user.guilds)
      res.render("perfil", {
        req: req,
        user: req.isAuthenticated() ? req.user : null,
        //guild: client.guilds.cache.get(req.params.guildID),
        
        botClient: client,
        Permissions: Permissions,
        bot: settings.website,
        callback: settings.config.callback,
        categories: client.categories, 
        commands: client.commands, 
        BotConfig: BotConfig,
        name: "Dashboard Slortez",
        BotFilters: BotFilters,
        BotEmojis: BotEmojis,
        Guild: client.guilds.cache.size,
        im: settings.imagem,

      });
    })
    /**
     * @START THE WEBSITE
     */

    app.use((req, res, next) => {
        res.status(404).send(
            "<h1>Page not found on the server</h1>")
    })
    //START THE WEBSITE ON THE DEFAULT PORT (80)
    app.get('/ping', (req, res) => {
    console.log('Requests');
    express.json({extended: false})
    res.sendStatus(200);
    console.log("Received request")
});
    const http = require(`http`).createServer(app);
    const PORT = process.env.PORT || 3000;
    http.listen(PORT, () => {
        
        console.log(`[${settings.website.domain}]: HTTP-Website running on ${settings.config.http.port} port.`)
    });
}