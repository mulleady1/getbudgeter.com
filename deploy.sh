#! /usr/bin/env bash

echo "[deploy.sh] rsyncing files..."
rsync -avz --exclude='*.pyc' --exclude='__pycache__/' manage.py requirements.txt static app project UI_VERSION wwa:/var/www/getbudgeter.com.2/
echo "[deploy.sh] rsyncing files... done"

if [ "$1" = "--init" ]; then
    echo "[deploy.sh] initializing..."
    ssh wwa "cd /var/www/getbudgeter.com.2 && python3 -m venv env && source env/bin/activate && pip install -r requirements.txt"
    echo "[deploy.sh] initializing... done"
    echo "[deploy.sh] starting..."
    ssh wwa "sudo service getbudgeter.com restart"
    echo "[deploy.sh] starting... done"
else
    echo "[deploy.sh] restarting..."
    ssh wwa "cd /var/www/getbudgeter.com.2 && source env/bin/activate && pip install -r requirements.txt && ./restart.sh"
    echo "[deploy.sh] restarting... done"
fi
