#!/usr/bin/env bash
# Builds and uploads the site to Hostinger, with a server backup first. Server details live in .deploy.env.
set -euo pipefail
cd "$(dirname "$0")/.."
if [ ! -f .deploy.env ]; then
  echo "Missing .deploy.env. Copy .deploy.env.example and fill in the server details." >&2
  exit 1
fi
source .deploy.env
SSH="ssh -i $DEPLOY_KEY -p $DEPLOY_PORT -o BatchMode=yes"

npm run build

stamp=$(date +%Y%m%d-%H%M%S)
$SSH "$DEPLOY_HOST" "mkdir -p ~/backups && cd ~/$DEPLOY_PATH && tar czf ~/backups/rohitswerashi-public_html-$stamp.tgz public_html"
echo "backup on the server: ~/backups/rohitswerashi-public_html-$stamp.tgz"

rsync -az --delete --exclude '.DS_Store' -e "$SSH" dist/ "$DEPLOY_HOST:$DEPLOY_PATH/public_html/"
echo "uploaded"
