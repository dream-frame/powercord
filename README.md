![image](https://cdn.discordapp.com/attachments/423853422261829653/678049416875212851/unknown.png)

# Powercord
Powercord is a lightweight client mod focused on simplicity and performance.  
As of right now, Powercord is in *very* early stages of development, so feel free to join [this server](https://discord.gg/5eSH46g) for any questions. Reminder that Powercord staff will not help you if you're using the stable version of Discord.

# **DISCLAIMER / ABOUT THIS FORK**
This fork is aimed to help users install Powercord onto the stable version of Discord. Powercord and their staff does not officially support the stable version of Discord, so there may be issues while using this fork. If you do find an issue, report to the Issue tab or DM **Korbs#0001**. I'll check if it's the fork, Powercord itself, or Discord in general.

# Installation
## Requirements
Windows and OSX Users are required to install:
1. [Git](https://git-scm.com/downloads)
2. [Node](https://nodejs.org) and [NPM](https://nodejs.org)
3. Discord Stable(obviously)

NOTE: Linux users, if you plan to use the script down below to install Powercord, it will install this for you.

## Installing Powercord
### For Linux users:
```
wget "https://raw.githubusercontent.com/dream-frame/powercord-for-discord-stable/v2/install-powercord.sh"
sudo ./install-powercord.sh
```
The file will start installing git, nodejs v12, then Powercord. Make sure you're running the stable version of Discord.
### For Windows and OSX users:
Please make sure you do have git and node installed
1. Open your terminal/CMD
2. Type the following commands in:

   `git clone https://github.com/dream-frame/powercord-for-discord-stable`

   `cd powercord-for-discord-stable`

   `npm i`

   `npm run plug`

3. Quit Discord entirely, make sure all process of Discord is killed
4. Start discord and you should see that Powercord was successfully injected

## Uninstalling Powercord
Problem with this fork? Don't like Powercord? You'll still be able to uninstall Powercord without having a huge hassle. **MAKE SURE TO DO THIS BEFORE DELETING POWERCORD FILES**
1. Open command prompt if you're on Windows or open the terminal if you're using Linux/macOS
2. Type the following commands:

   `cd powercord-for-discord-stable`

   `npm run unplug` (Please use sudo if you're on Linux)

4. Quit Discord and Start Discord again and Powercord should no longer be injected

# FAQ
## How to install plugins and thems?
The themes is found in `/src/Powercord/themes/` and plugins is found in `/src/Powercord/plugins/`. 
To install a plugin and/or theme, you simply place it's folder into the plugins/themes folder.

## How to install BetterDiscord plugins?
You'll need to install the [bdCompat](https://github.com/intrnl/pc-bdCompat) plugin for Powercord first. Then you put BetterDiscord plugins into `/src/Powercord/plugins/pc-bdCompat/plugins/`. Reload Discord and you'll find a tab called **BetterDiscord Plugins** in Powercord settings.

## How to install themes that are for BetterDiscord?
Themes for Powercord are required to have a manifest file included with them. You'll need to use this [Powercord Manifest Generator](https://ghostlydilemma.github.io/powercord-manifest-generator/) and click the Theme tab. Then in the themes folder, makes sure the theme gets it's own folder and put the `.css` and `manifest.json` file in it. Reload Discord and if you did it right, the theme should load automatically.

# Is this against the ToS?
Long story short... __yes__. Powercord is against the Discord Terms of Service — but, you should keep reading:  

As of right now, __Discord is not going out of their way to detect client mods or ban client mod users__. On top of that, Powercord does not make any manual HTTP requests unlike certain client mods / plugins, so your client's user agent is the same as a legitimate client. Meaning, Discord doesn't detect a client mod like Powercord. They can go out of their way to start detecting it, but they don't.  

Hypothetically speaking - even if they somehow did detect Powercord, users are very unlikely to be banned on sight. It doesn't make sense for Discord to start banning a substantial part of it's userbase (client mod users) without any kind of warning. Not to mention it is mandatory for Powercord plugins to be fully API-compliant and ethical, implying Powercord users can't be banned for indirect ToS violations (e.g. selfbotting).
