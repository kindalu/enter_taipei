# enter_taipei
A Project for Hackthon.Taipei 2015

用極簡風的UI列出台北的活動列表，致敬今年被換掉的[舊小七ibon購票介面](http://www.ghfff.org.tw/images/ibon/ticket_step7.jpg )。

懷念以前無聊時就會去戳戳樂 --- 看看有什麼新的獨立樂團表演。(ps: [新的介面](http://www.ticket.com.tw/infor/ibon/ibon07.jpg)把時間拿掉了)


執行方法：

npm install

到src/app/eventData/kktix 和 src/app/eventData/iCulture 下執行 get.sh (會抓最新活動的json)

到專案目錄下跑 npm run updateEvent (會整理格式、抓台北市一個月內的活動)

npm run dev (local 測試) or

npm run deploy (包成靜態檔案到 /public folder 下，然後放到 CDN 去:p)

---
活動來源是：KKTIX API、文化部 iCulture API (年代、寬宏、兩廳院、iNDIEVOX、Legacy、河岸留言、台北市文化快遞 等)。
