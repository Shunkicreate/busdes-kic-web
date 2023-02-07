# 今回Reactを選んだ理由。
Next.jsだと、今回作るウェブページにはオーバースペックになってしまうと判断。  
今回の開発規模、開発人数、機能面からReactを用いてSPAにして開発する方がいい。  
開発規模が小さいのと、開発人数も少ない。機能的には画面が切り替わった時にロードするよりも素早く切り替わる方が今回のアプリケーションに向いていると判断。  

# データの保存先は最初はCookieにする。
保存するデータは2種類。
- 時刻表のデフォルトの出発地点、到着地点  
- 次のバスのカードに追加してある場所の出発地点、到着地点  

# 時刻表で一度読みこんだデータはリロードしない限り保持。
これは型定義で解決する。一つ目のキーは出発地点。一つネストされた次のキーは到着地点。それと出来れば軽量化のために平日、休日のどちらかはデータを捨てるようにしたい。  
```
{
  "立命館大学 衣笠キャンパス": {
    "四条河原町": {河原町のデータ}
    "東山二条・岡崎公園口": {岡崎公園のデータ}
  }
}
```

# 開発時のルール(Git, GitHub編)
- ブランチはmain, develop, feature-buscard, feature-timeTable, feature-settings, feature-layout, feature-atomとする。
- 基本的にはdevelopに対してfeatureブランチからPRでマージする。
- PRの時にはただしゅんきがコードレビューする。
- PRを出すときにはissueとつなげる。
- issueに書いてある機能をそれぞれのブランチで作ってPRを出してdevelopブランチにマージするというのが一つの機能を開発する流れ。
- できればissueにこれやりますって報告お願いします。

# その他のルール
- 命名規則について
  - 今回は規則としては設けないが、何をする変数なのか、何をするコンポーネントなのかをどれだけ長くなってもいいからちゃんと書くように。
- スタイルシートとしてはtailwind cssを用いる。 
  - [よく使っているチートシートのリンク](https://nerdcave.com/tailwind-cheat-sheet)
  - 色はyellow-300をとりあえず用いる。[参考までに](https://tailwindcss.com/docs/customizing-colors)
  - フォントはひとまずデフォルトで。
- 絶対に同じコードを2回書かないように！！PRの受け入れしません。
  
 # atomとして作っておきたいもの
 - タブバーの丸いボタン
 - 行先切り替えボタン
 - バスの路線追加ボタン
 # layoutとして作っておきたいもの
 - ヘッダー
 - タブバー
 - next busのカード
 - 時刻表
 カードと時刻表はデータが渡されたらそれをそのまま表示するだけで、JavaScriptは動かさない。  
 ヘッダーも同様。  
 タブバーのみ切り替えのためにJavaScriptが動く。  
