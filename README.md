# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

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
- branchを作るときはdevelopから分ける。
- できればissueにこれやりますって報告お願いします。

# その他のルール
- 命名規則について
  - コンポーネント名はパスカルケースで書いてください。
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

