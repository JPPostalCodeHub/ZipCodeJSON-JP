# ZipCodeJSON-JP

## 概要
ZipCodeJSON-JPは、日本全国の郵便番号と住所情報をJSON形式で提供するオープンソースプロジェクトです。
日本郵便が提供する最新のCSVデータを毎月自動的にダウンロードし、加工してGitHub Pages上でアクセス可能なJSONファイルとして公開します。
このサービスは開発者が郵便番号に基づいて簡単に住所情報を検索できるように設計されています。

## 特徴
- **自動更新**: 日本郵便のサイトから直接データをダウンロードし、最新情報を保持します。
- **簡単アクセス**: 郵便番号から直接JSON形式で住所情報を取得できます。
- **CORS対応**: どのドメインからでもAPIにアクセス可能です。

## 使い方

各郵便番号に対応したJSONファイルを以下のURLから取得できます。

```
https://JPPostalCodeHub.github.io/ZipCodeJSON-JP/api/[郵便番号].json
```


例えば、`1000001`の情報を取得するには、以下のURLにアクセスします。

```
https://JPPostalCodeHub.github.io/ZipCodeJSON-JP/api/1000001.json
```

```Javascript
const response = await fetch('https://JPPostalCodeHub.github.io/ZipCodeJSON-JP/api/1000001.json')
response.json()
```


## インストール
このプロジェクトはウェブサービスとして直接利用可能ですが、ローカルでのセットアップ方法は以下の通りです。

```bash
git clone git@github.com:JPPostalCodeHub/ZipCodeJSON-JP.git
cd ZipCodeJSON-JP
```

依存関係のインストールなど、必要なコマンドを実行

## コントリビューション
プロジェクトへの貢献を歓迎しています！IssueやPull Requestを通じて、機能追加やバグ修正にご協力ください。詳細はCONTRIBUTING.mdをご覧ください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細はLICENSEファイルをご覧ください。

