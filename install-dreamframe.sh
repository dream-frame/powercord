#!/bin/bash
clear
echo "Downloading Dream Frame..."
cd ./src/Powercord/themes/
wget -q "https://github.com/dream-frame/Dream-Frame/raw/master/Downloads/Powercord/Dream-Frame.zip"
echo "Extracting theme..."
unzip -q -o Dream-Frame.zip
echo "Done."
rm Dream-Frame.zip
