cd src/app/eventData/kktix
rm -f *.json
sh get.sh

cd ../iCulture
rm -f *.json
sh get.sh

cd ../../../../
rm -rf public
npm run updateEvent
npm run deploy
firebase deploy
