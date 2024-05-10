# ZipCodeJSON-JP

> [!IMPORTANT]
> 郵便番号 1 つにつき 2 つ以上の住所に対応していません。現在修正中のため現行バージョンは使用しないでください

## 概要

ZipCodeJSON-JP は、日本全国の郵便番号と住所情報を JSON 形式で提供するオープンソースプロジェクトです。
日本郵便が提供する最新の CSV データを毎月自動的にダウンロードし、加工して GitHub Pages 上でアクセス可能な JSON ファイルとして公開します。
このサービスは開発者が郵便番号に基づいて簡単に住所情報を検索できるように設計されています。

## 特徴

- **自動更新**: 日本郵便のサイトから直接データをダウンロードし、最新情報を保持します。
- **簡単アクセス**: 郵便番号から直接 JSON 形式で住所情報を取得できます。
- **CORS 対応**: どのドメインからでも API にアクセス可能です。

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

## インストール

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

## コントリビューション

プロジェクトへの貢献を歓迎しています！Issue や Pull Request を通じて、機能追加やバグ修正にご協力ください。詳細は CONTRIBUTING.md をご覧ください。

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は LICENSE ファイルをご覧ください。
