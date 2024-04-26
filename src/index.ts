import JSZip from "jszip";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";

async function downloadAndExtract() {
  // https://www.post.japanpost.jp/zipcode/dl/utf-zip.html
  const zipUrl =
    "https://www.post.japanpost.jp/zipcode/dl/utf/zip/utf_ken_all.zip";
  const response = await fetch(zipUrl);
  const zipBuffer = await response.arrayBuffer();

  return await JSZip.loadAsync(zipBuffer);
}

async function csvToJSON(csv: string) {
  // MEMO: 郵便番号毎にファイルにします
  const lines = csv.split("\n");
  // for (let i = 1; i < lines.length; i++) {
  for (let i = 1; i < 2; i++) {
    // 一旦1件だけにしておく
    const line = lines[i];
    // https://www.post.japanpost.jp/zipcode/dl/utf-readme.html
    const [
      jisCode, // 全国地方公共団体コード（JIS X0401、X0402）………　半角数字
      oldZipCode, // （旧）郵便番号（5桁）………………………………………　半角数字
      zipCode, // 郵便番号（7桁）………………………………………　半角数字
      prefectureKana, // 都道府県名　…………　全角カタカナ（コード順に掲載）　（※1）
      cityKana, // 市区町村名　…………　全角カタカナ（コード順に掲載）　（※1）
      townKana, // 町域名　………………　全角カタカナ（五十音順に掲載）　（※1）
      prefecture, // 都道府県名　…………　漢字（コード順に掲載）　（※1,2）
      city, // 市区町村名　…………　漢字（コード順に掲載）　（※1,2）
      town, // 町域名　………………　漢字（五十音順に掲載）　（※1,2）
      multipleZipCodes, // 一町域が二以上の郵便番号で表される場合の表示　（※3）　（「1」は該当、「0」は該当せず）
      numberedTown, // 小字毎に番地が起番されている町域の表示　（※4）　（「1」は該当、「0」は該当せず）
      hasChome, // 丁目を有する町域の場合の表示　（「1」は該当、「0」は該当せず）
      multipleTowns, // 一つの郵便番号で二以上の町域を表す場合の表示　（※5）　（「1」は該当、「0」は該当せず）
      updateFlag, // 更新の表示（※6）（「0」は変更なし、「1」は変更あり、「2」廃止（廃止データのみ使用））
      updateReason, // 変更理由　（「0」は変更なし、「1」市政・区政・町政・分区・政令指定都市施行、「2」住居表示の実施、「3」区画整理、「4」郵便区調整等、「5」訂正、「6」廃止（廃止データのみ使用））}
    ] = line.split(",").map((str) => str.replace(/"|\r/g, ""));
    // ファイルに保存するパスの設定
    const dirPath = join(__dirname, "../docs/zip/");
    await mkdir(dirPath, { recursive: true });
    const filePath = join(dirPath, `${zipCode}.json`);

    const addressData = {
      jisCode,
      oldZipCode,
      zipCode,
      prefectureKana,
      cityKana,
      townKana,
      prefecture,
      city,
      town,
      multipleZipCodes,
      numberedTown,
      hasChome,
      multipleTowns,
      updateFlag,
      updateReason,
    };
    // JSONファイルとして書き出し
    await writeFile(filePath, JSON.stringify(addressData, null, 2), "utf8");
    console.log(`Saved ${filePath}`);
  }
}

async function main() {
  const zip = await downloadAndExtract();
  const utfKenAllCsv = zip.file("utf_ken_all.csv");
  if (utfKenAllCsv == null) {
    console.log("utf_ken_all.csv not found");
    return;
  }
  const csv = await utfKenAllCsv.async("text");
  await csvToJSON(csv);
}

main();
