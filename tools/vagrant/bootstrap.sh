#!/usr/bin/env bash

# "./tools/vagrant/bootstrap.sh"

echo "Provisioning virtual machine..."

echo "Updating packages list"
apt-get update

# Git
echo "Installing Git"
apt-get install git -y

# Nginx
echo "Installing Nginx"
apt-get install nginx -y


# Nginx Configuration
echo "Configuring Nginx"
sudo cp /vagrant/tools/vagrant/nginx_vhost /etc/nginx/sites-available/nginx_vhost > /dev/null
sudo ln -sf /etc/nginx/sites-available/nginx_vhost /etc/nginx/sites-enabled/

sudo rm -rf /etc/nginx/sites-available/default

echo "Restarting Nginx"
# Restart Nginx for the config to take effect
sudo service nginx restart

# Node
# https://github.com/nodesource/distributions#debmanual
echo "Installing Node"

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Updating npm"
sudo sh -c "npm install npm -g"

echo "Installing globally: bower"
sudo npm install -g bower

cd /vagrant

echo "Install local project dependencies "
npm install -y
bower install -y


