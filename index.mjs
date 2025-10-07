import sharp from "sharp";
import chokidar from "chokidar";
import fs from "fs/promises";

const dir = "./tmp/";
chokidar.watch(dir).on("add", async (filename) => {
  if (filename.includes(".fuse_hidden")) return;

  try {
    const metadata = await sharp(filename).metadata();
    const isImage =
      metadata.format.includes("jpeg") ||
      metadata.format.includes("png") ||
      metadata.format.includes("jpg");

    if (isImage) {
      const a = await sharp(filename)
        .webp({ lossless: false })
        .toFile(filename.replace(/\.[^/.]+$/, ".webp"));
      const stats = await fs.stat(filename);

      console.log(
        `sharp ${new Date()} ${filename} before: ${stats.size} after: ${a.size}`,
      );

      // Give some time for the uploaded file to be processed by autosync on android
      setTimeout(() => {
        fs.unlink(filename);
      }, 1000);
    }
  } catch (e) {
    console.log(e.message, filename);
  }
});
