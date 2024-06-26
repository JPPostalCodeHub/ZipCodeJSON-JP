# ZipCodeJSON-JP

## 概要

ZipCodeJSON-JP は、日本全国の郵便番号と住所情報を JSON 形式で提供するオープンソースプロジェクトです。
日本郵便が提供する最新の CSV データを毎月自動的にダウンロードし、加工して GitHub Pages 上でアクセス可能な JSON ファイルとして公開します。
このサービスは開発者が郵便番号に基づいて簡単に住所情報を検索できるように設計されています。

## 特徴

- **自動更新**: 日本郵便のサイトから直接データをダウンロードし、最新情報を保持します。
- **簡単アクセス**: 郵便番号から直接 JSON 形式で住所情報を取得できます。

## 使い方

各郵便番号に対応した JSON ファイルを以下の URL から取得できます。

```
https://jppostalcodehub.github.io/ZipCodeJSON-JP/zip/[郵便番号].json
CORS対応: https://zip-code-cors-jp.vercel.app/api/zipcode/[郵便番号]
```

例えば、`1000001`の情報を取得するには、以下の URL にアクセスします。

```
https://jppostalcodehub.github.io/ZipCodeJSON-JP/zip/0010000.json
CORS対応: https://zip-code-cors-jp.vercel.app/api/zipcode/0010000

```

**Javascript**

```Javascript
const response = await fetch('https://jppostalcodehub.github.io/ZipCodeJSON-JP/zip/0010000.json')
const { entries } = await response.json()

// CORS対応
const response = await fetch(
  'https://zip-code-cors-jp.vercel.app/api/zipcode/0010000',
  {
    mode: 'cors',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
)
const { entries } = await response.json()

```

## 開発

### インストール

このプロジェクトはウェブサービスとして直接利用可能ですが、ローカルでのセットアップ方法は以下の通りです。

```bash
git clone git@github.com:JPPostalCodeHub/ZipCodeJSON-JP.git
cd ZipCodeJSON-JP
```

依存関係のインストールなど、必要なコマンドを実行

**_郵便番号を更新_**

```
bun run src/index.ts
```

### CORS 対応

[ZipCodeCORS-JP](https://github.com/JPPostalCodeHub/ZipCodeCORS-JP)
上記のリポジトリで対応しています。

### Q&A

- VSCode で出力したファイルが見れない
  - 出力ファイル数が多すぎるため見えなくしています。`code docs/zip/xxx.json`で直接開いてください

## コントリビューション

プロジェクトへの貢献を歓迎しています！Issue や Pull Request を通じて、機能追加やバグ修正にご協力ください。詳細は CONTRIBUTING.md をご覧ください。

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は LICENSE ファイルをご覧ください。
