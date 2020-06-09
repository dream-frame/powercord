#!/bin/bash
 
while true
do
 read -r -p "Are you sure that you want to install Powercord? [Y/n] " input
 
 case $input in
     [yY][eE][sS]|[yY])
 echo "Preparing to install Powercord, checking requirements..."
 clear
 break
 ;;
     [nN][oO]|[nN])
 echo ";-; alright"
 exit
 break
        ;;
     *)
 echo "Invalid input..."
 ;;
 esac
 done

 read -r -p "Do you have git installed? [Y/n] " git

 case $git in
     [yY][eE][sS]|[yY])
 echo "Skipping Git..."
 clear
 break
 ;;
     [nN][oO]|[nN])
 echo "Installing Git, please wait..."
 sudo apt dnf git -y -q
 clear
 break
        ;;
     *)
 echo "Invalid input..."
 ;;
 esac
 
     read -r -p "Do you curl installed? [Y/n] " curl
    
     case $curl in
         [yY][eE][sS]|[yY])
     echo "Skipping curl..."
     clear
     break
     ;;
         [nN][oO]|[nN])
     echo "Installing curl, please wait..."
     sudo apt dnf curl -y -q
     clear
     break
            ;;
         *)
     echo "Invalid input..."
     ;;
     esac
 
  read -r -p "Do you have Node v12 installed? [Y/n] " node
 
  case $node in
      [yY][eE][sS]|[yY])
  echo "Skipping Node..."
  clear
  break
  ;;
      [nN][oO]|[nN])
  echo "Installing Node, please wait..."
  sudo dnf install nodejs
  clear
  break
         ;;
      *)
  echo "Invalid input..."
  ;;
  esac
  
    read -r -p "Powercord is ready to install, inject now? [Y/n] " installPowercord
   
    case $installPowercord in
        [yY][eE][sS]|[yY])
    cd ~
    git clone https://github.com/dream-frame/powercord-for-discord-stable --quiet
    sudo chmod -R 777 powercord-for-discord-stable
    cd powercord-for-discord-stable
    npm i --silent
    echo "Showing output for last command to confirm installation:"
    sudo npm run plug
    echo "Done."
    break
    ;;
        [nN][oO]|[nN])
    echo ";-; that's sad"
    exit
    break
           ;;
        *)
    echo "Invalid input..."
    ;;
    esac
