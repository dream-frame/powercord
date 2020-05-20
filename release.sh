###
# Powercord, a lightweight @discord client mod focused on simplicity and performance
# Copyright (C) 2018-2020  aetheryx & Bowser65
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
###

# Quick utility script to merge v2-dev to v2 and push
# aka me being too lazy to do it manually
git checkout v2
git merge v2-dev
git push origin v2
git checkout v2-dev
