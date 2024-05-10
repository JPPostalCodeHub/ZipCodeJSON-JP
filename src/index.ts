import JSZip from "jszip";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";

const TARGET_CSV = "utf_ken_all.csv";
const UPDATE_LOG = "updateLog-UTC.json";

interface AddressData {
  /** 全国地方公共団体コード（JIS X0401、X0402） */
  jisCode: string;
  /** 旧）郵便番号（5桁） */
  oldZipCode: string;
  /** 郵便番号（7桁）半角数字 */
  zipCode: string;
  /** 都道府県名 全角カタカナ（コード順に掲載） （※1） */
  prefectureKana: string;
  /** 市区町村名 全角カタカナ（コード順に掲載） （※1） */
  cityKana: string;
  /** 町域名 全角カタカナ（五十音順に掲載） （※1） */
  townKana: string;
  /** 都道府県名 漢字（コード順に掲載） （※1 */
  prefecture: string;
  /** 市区町村名 漢字（コード順に掲載） （※1 */
  city: string;
  /** 町域名 漢字（五十音順に掲載） （※1 */
  town: string;
  /** 一町域が二以上の郵便番号で表される場合の表示 （※3） （「1」は該当、「0」は該当せず） */
  multipleZipCodes: string;
  /** 小字毎に番地が起番されている町域の表示 （※4） （「1」は該当、「0」は該当せず） */
  numberedTown: string;
  /** 丁目を有する町域の場合の表示 （「1」は該当、「0」は該当せず） */
  hasChome: string;
  /** 一つの郵便番号で二以上の町域を表す場合の表示 （※5） （「1」は該当、「0」は該当せず） */
  multipleTowns: string;
  /** 更新の表示（※6）（「0」は変更なし、「1」は変更あり、「2」廃止（廃止データのみ使用）） */
  updateFlag: string;
  /** 変更理由（「0」は変更なし、「1」市政・区政・町政・分区・政令指定都市施行、「2」住居表示の実施、「3」区画整理、「4」郵便区調整等、「5」訂正、「6」廃止（廃止データのみ使用）） */
  updateReason: string;
}
interface JsonSchema {
  // 住所情報が入った配列
  entries: AddressData[];
}

async function downloadAndExtract() {
  // https://www.post.japanpost.jp/zipcode/dl/utf-zip.html
  const zipUrl =
    "https://www.post.japanpost.jp/zipcode/dl/utf/zip/utf_ken_all.zip";
  const response = await fetch(zipUrl);
  const zipBuffer = await response.arrayBuffer();

  return await JSZip.loadAsync(zipBuffer);
}
function getUpdateLogPath() {
  const dirPath = join(__dirname, "../docs/");
  const filePath = join(dirPath, UPDATE_LOG);
  return filePath;
}
async function writeUpdateLog(zipObject: JSZip.JSZipObject) {
  const updateLog = zipObject.date;
  await writeFile(getUpdateLogPath(), String(updateLog.getTime()), "utf8");
}
async function loadUpdateLog() {
  try {
    const updateLog = await readFile(getUpdateLogPath(), "utf8");
    return parseInt(updateLog);
  } catch (e) {
    return null;
  }
}
async function writeZipCodeFile(filePath: string, json: JsonSchema) {
  await writeFile(filePath, JSON.stringify(json, null, 2), "utf8");
}

async function csvToJSON(csv: string) {
  // MEMO: 郵便番号毎にファイルにします
  const lines = csv.split("\n");
  const processedZipCodes = new Set<string>(); // 郵便番号を記録するためのセット

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // https://www.post.japanpost.jp/zipcode/dl/utf-readme.html
    const [
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
    ] = line.split(",").map((str) => str.replace(/"|\r/g, "")) as [
      AddressData["jisCode"],
      AddressData["oldZipCode"],
      AddressData["zipCode"],
      AddressData["prefectureKana"],
      AddressData["cityKana"],
      AddressData["townKana"],
      AddressData["prefecture"],
      AddressData["city"],
      AddressData["town"],
      AddressData["multipleZipCodes"],
      AddressData["numberedTown"],
      AddressData["hasChome"],
      AddressData["multipleTowns"],
      AddressData["updateFlag"],
      AddressData["updateReason"]
    ];
    // ファイルに保存するパスの設定
    const dirPath = join(__dirname, "../docs/zip/");
    await mkdir(dirPath, { recursive: true });
    const filePath = join(dirPath, `${zipCode}.json`);

    const addressData: AddressData = {
      jisCode,
      oldZipCode,
      zipCode,
      prefectureKana,
      cityKana,
      townKana: townKana?.replace("イカニケイサイガナイバアイ", "") || '',
      prefecture,
      city,
      town: town?.replace("以下に掲載がない場合", "") || '',
      multipleZipCodes,
      numberedTown,
      hasChome,
      multipleTowns,
      updateFlag,
      updateReason,
    };
    if (processedZipCodes.has(zipCode)) {
      // 郵便番号が既に処理された場合、ファイルを読み込み、データを追記
      const fileContent = await readFile(filePath, "utf8");
      const existingData: JsonSchema = JSON.parse(fileContent);
      existingData.entries.push(addressData);
      await writeZipCodeFile(filePath, existingData);
    } else {
      // 郵便番号がまだ処理されていない場合、新しいファイルを作成
      const newData: JsonSchema = { entries: [addressData] };
      await writeZipCodeFile(filePath, newData);
      processedZipCodes.add(zipCode); // 処理した郵便番号をセットに追加
    }
  }
  console.log("Finish");
}

async function main() {
  const zip = await downloadAndExtract();
  const utfKenAllCsv = zip.file(TARGET_CSV);
  if (utfKenAllCsv == null) {
    console.log(TARGET_CSV, "not found");
    return;
  }
  const update = await loadUpdateLog();
  if (update === utfKenAllCsv.date.getTime()) {
    console.log("No update");
    return;
  }
  console.log("Update", update, "=>", utfKenAllCsv.date);
  await writeUpdateLog(utfKenAllCsv);

  const csv = await utfKenAllCsv.async("text");
  await csvToJSON(csv);
}

main();
