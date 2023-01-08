# Cyber Challenge Hour
A collection of challenges to help any aspiring cyber analysts learn. All challenges are designed to take a low skilled cyber analyst approximately an hour to complete however this is just a guideline, more or less time may be required depending on the challenge and the analyst. The goal for all challenges is to either collect the flag from the challenge OR answer the series of provided questions. The goal of the project is tease the brain of defensive analysts with short, fun challenges ranging from basic scripting challenges, simple offensive techniques, malware analysis and forensic artifact analysis.

Check back periodically to see new updates and challenges as they are created. 


**Note:** Most applications displayed here are insecure by design for training purposes, **DO NOT** use code here in production applications



## The JWT Challenge
A web application that utilises *poor* JWT auth tokens to manage session authorisaton.

### Setup instructions  
Install the required node modules from the package.json file

Configure the static user/pwd/flag/secret variables manually OR set them as environmental variables (recomended)

  For most fun pick a password that is very unlikely to be guessed, this challenge is about JWT security after all
  
  Also it is recomended to set the JWT HMAC secret to be small and something that could be bruteforced on modern hardware, about 4 characters works well

Run the application with `npm run dev`, by default the app will listen on port 8000 or the PORT environmental variable

### Recomended Tooling
-- This is solveable with just a web browser

-- Burpsuite may be helpful 

-- Any common scripting or programming language can solve this challenge 

## Simple Encryption
A basic cypher/encryption with a big issue. The goal of the challenge is to recover the flag from flag.enc. The flag is in the format CCH{flag}

### How to play
Download the flag.enc and the enc.ps1 file and try to recover the flag. The enc.ps1 is the file used to encrypt the flag data. 

### Recomended Tooling
-- Your favourite scripting language should be able to solve this, however as this is written in PowerShell a good extension exercise is to solve with PowerShell.  

## Image Encoding 
A basic challenge to teach image manipulation and data recovery techniques. The goal is to recover the data from the image.png utilising whatever means.   

### How to play
Download the image.png file and recover the flag.

### Reomended Tooling
-- Any scripting/programming lanugage

## King of Monsters
A PCAP analysis challenge - A common webshell framework has been used to genorate an intrusion packet capture 

### How to play
Utilise the PCAP file to find the flag!

### Recomended Tooling
-- Some form of PCAP analysis tool, wireshark, scapy etc are all good



