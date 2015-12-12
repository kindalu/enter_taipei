for cat in 1 2 3 4 5 6 7 8 11 13 14 15 17 19
do
  wget -O ${cat}.json "http://cloud.culture.tw/frontsite/opendata/activityOpenDataJsonAction.do?method=doFindActivitiesByCategory&category=${cat}&uk=7Gbd75gM"
done


