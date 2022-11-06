git init
heroku buildpacks:clear
heroku buildpacks:set heroku/nodejs
heroku git:remote -a zallybot
git add .
git commit -am "make it better"
git push heroku master