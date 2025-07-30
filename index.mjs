import sharp from "sharp";
import chokidar from "chokidar";
import fs from "fs/promises";

const dir = "./tmp/";
chokidar.watch(dir).on("add", async (filename) => {
  console.log(`Detected in ${filename}`);

  try {
    const metadata = await sharp(filename).metadata();

    const isImage =
      metadata.format.includes("jpeg") ||
      metadata.format.includes("png") ||
      metadata.format.includes("jpg");

    if (isImage && filename.includes("test")) {
      console.log("sharp");
      await sharp(filename)
        .webp({ lossless: false })
        .toFile(filename.replace(/\.[^/.]+$/, ".webp"));
      await fs.unlink(filename);
    }
  } catch (e) {
    console.log(e);
  }
});
