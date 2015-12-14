# [enter_taipei](https://enter.taipei)
A Project for Hackthon.Taipei 2015

用極簡風的UI列出台北的活動列表，致敬今年被換掉的[舊小七ibon購票介面](http://www.ghfff.org.tw/images/ibon/ticket_step7.jpg )。

懷念以前無聊時就會去戳戳樂 --- 看看有什麼新的獨立樂團表演。(ps: [新的介面](http://www.ticket.com.tw/infor/ibon/ibon07.jpg)把時間拿掉了)

#執行方法：

npm install

npm run updateAndDeployToFirebase (抓最新活動、編檔案到 /public 下，然後 deploy 到我的 Firebase CDN 去 :p)

or

npm run dev (for 開發測試)


活動來源是：
  * 文化部 iCulture API (年代、寬宏、兩廳院、iNDIEVOX、Legacy、河岸留言、台北市文化快遞 等)
  * KKTIX API
  * Meetup API


License: MIT
