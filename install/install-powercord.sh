clear
cd ~

echo "Making sure git is installed."
sudo apt install git
echo "Git is installed."

echo "Making sure NodeJS v12 is installed."
sudo apt install build-essential apt-transport-https lsb-release ca-certificates curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
echo "NodeJS v12 is installed."

echo "Installing Powercord..."
git clone https://github.com/dream-frame/powercord-for-discord-stable
cd powercord-for-discord-stable
npm i
echo "Injecting into Discord..."
sudo npm run plug

echo "Closing Discord."
killall Discord

echo "If you had any issue during installation, contact Korbs#0001."
echo "Wanna install Dream Frame theme? Run this:"
echo "sh ./powercord-for-discord-stable/install-dreamframe.sh"
