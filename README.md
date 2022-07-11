# Cyber Challenge Hour
A collection of challenges to help any aspiring cyber analysts learn. 

**Note:** Most applications displayed here are insecure by design for training purposes, **DO NOT** use code here in production applications



## The JWT Challenge
A web application that utilises *poor* JWT auth tokens to manage session authorisaton.

### To Play 
Install the required node modules from the package.json file
Configure the static user/pwd/flag/secret variables manually OR set them as environmental variables (recomended)
  For most fun pick a password that is very unlikely to be guessed, this challenge is about JWT security after all
  Also it is recomended to set the JWT HMAC secret to be small and something that could be bruteforced on modern hardware, about 4 characters works well
Run the application with `npm run dev`, by default the app will listen on port 8000 or the PORT environmental variable


