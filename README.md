# Powercord
## For Discord Stable
This fork is only meant for those who want to use Powercord on the stable channel of Discord. This fork is not offically supported and is not recommended, you may find a few things broken in future updates.
## How to install Powercord for Discord Stable
### Windows and macOS
Step 1: Install Git and Node 12
Step 2: Open Command Prompt or Powershell on Windows, for macOS open your terminal.
Type in the following commands:
```
git clone https://github.com/dream-frame/powercord-for-discord-stable/
cd powercord-for-discord-stable
npm i
npm run plug
```
NOTE: If you're Linux and had to use this method, run the last command as sudo.

### Linux
A script has already been made for Linux users, if this doesn't work please use the Windows and macOS method.
This script has been tested on Elementary OS 5.1.2, Ubuntu 18.04 LTS and 20.04 LTS, Zorin 15.1, Deepin 15.9 15.11 and 20.
To download and run script, run this in your terminal:
```
wget "https://raw.githubusercontent.com/dream-frame/powercord-for-discord-stable/v2/install/install-powercord.sh"
sudo sh install-powercord.sh
```
The script will install Git, Node 12, NPM, Curl, and then inject Powercord for you. Once done, it will kill Discord then you'll have to re-open it and find that Powercord injected.

### What's broken in this fork
 - ~~Development channel crashes Discord~~ Development branch removed from repo
 - ~~Spotify modal is broken, controls don't show.~~ Only premium users can have this to prevent API abuse
