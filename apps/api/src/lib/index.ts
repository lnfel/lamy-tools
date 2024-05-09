import type { Sharp, Metadata, PngOptions, WebpOptions, JpegOptions } from "sharp"

export const convert = {
    png: convertToPNG,
    jpeg: convertToJPEG,
    jpg: convertToJPEG,
    webp: convertToWEBP
}

type Options = {
    "PNG": PngOptions
    "JPG": JpegOptions
    "JPEG": JpegOptions
    "WEBP": WebpOptions
}

type ConvertOptions<Format extends "PNG" | "JPEG" | "WEBP"> = {
    sharp: Sharp
    filename: string
    metadata: Metadata
    options: Options[Format]
}

async function convertToPNG({ sharp, filename, metadata, options }: ConvertOptions<"PNG">) {
    const buffer = await sharp.png(options).toBuffer()
    return new File([buffer], filename.replace(metadata.format as string, 'png'), { type: 'image/png' })
}

async function convertToJPEG({ sharp, filename, metadata, options = { quality: 100 } }: ConvertOptions<"JPEG">) {
    const buffer = await sharp.jpeg(options).toBuffer()
    return new File([buffer], filename.replace(metadata.format as string, 'jpeg'), { type: 'image/jpeg' })
}

async function convertToWEBP({ sharp, filename, metadata, options = { lossless: true } }: ConvertOptions<"WEBP">) {
    const buffer = await sharp.jpeg(options).toBuffer()
    return new File([buffer], filename.replace(metadata.format as string, 'webp'), { type: 'image/webp' })
}
