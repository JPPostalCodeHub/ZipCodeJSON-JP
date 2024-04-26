# ZipCodeJSON-JP

## 概要
ZipCodeJSON-JPは、日本の郵便番号から住所情報を簡単に検索できるサービスです。
このサービスはGitHub Pagesを通じて提供され、日本郵便の公式データに基づいて毎月更新されます。

## 特徴
- **データの自動更新**: 日本郵便から直接ダウンロードしたデータを使用し、毎月自動的に更新します。
- **簡単アクセス**: 郵便番号に基づくJSONファイル形式でデータが提供され、APIとして利用可能です。
- **オープンソース**: 本プロジェクトはMITライセンスの下で公開されており、誰でも自由に使用、変更、配布することができます。

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
const response = await fetch('https://JPPostalCodeHub.github.io/ZipCodeJSON-JP/1000001.json')
response.json()
```
