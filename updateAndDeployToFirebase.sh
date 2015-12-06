cd src/app/eventData/kktix
rm *.json
sh get.sh

cd ../iCulture
rm *.json
sh get.sh

cd ../../../../
rm -rf public
npm run deploy
firebase deploy
