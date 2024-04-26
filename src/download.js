import { download } from "bun";
import { unzip } from "fflate";

async function downloadAndExtract() {
    const zipUrl = "https://www.post.japanpost.jp/zipcode/dl/utf/zip/utf_ken_all.zip";
    const response = await download(zipUrl);
    const zipBuffer = await response.arrayBuffer();

    unzip(new Uint8Array(zipBuffer), (err, unzippedFiles) => {
        if (err) {
            console.error("Failed to unzip:", err);
            return;
        }
        for (const filename in unzippedFiles) {
            const fileData = unzippedFiles[filename];
            // ここでファイルをディスクに保存するなどの処理を行います
            console.log(`Extracted ${filename}`);
        }
    });
}

downloadAndExtract();
