# ZipCodeJSON-JP

## 概要

ZipCodeJSON-JP は、日本の郵便番号から住所情報を簡単に検索できるサービスです。
このサービスは GitHub Pages を通じて提供され、日本郵便の公式データに基づいて毎月更新されます。

## 特徴

- **データの自動更新**: 日本郵便から直接ダウンロードしたデータを使用し、毎月自動的に更新します。
- **簡単アクセス**: 郵便番号に基づく JSON ファイル形式でデータが提供され、API として利用可能です。
- **オープンソース**: 本プロジェクトは MIT ライセンスの下で公開されており、誰でも自由に使用、変更、配布することができます。

## 使い方

各郵便番号に対応した JSON ファイルを以下の URL から取得できます。

```
https://jppostalcodehub.github.io/ZipCodeJSON-JP/zip/[郵便番号].json
```

例えば、`1000001`の情報を取得するには、以下の URL にアクセスします。

```
https://jppostalcodehub.github.io/ZipCodeJSON-JP/zip/0010000.json
```

```Javascript
const response = await fetch('https://jppostalcodehub.github.io/ZipCodeJSON-JP/zip/0010000.json')
response.json()
```
