import { t } from "elysia"
// import { Static } from "elysia"

/**
 * Typescript const assertion
 */
export const imageFormats = ["png", "jpg", "jpeg", "webp"] as const
export type ImageFormat = typeof imageFormats[number]
// alternative using typebox
// type s = Static<typeof ImageFormatSchema>

/**
 * Typebox union from array of strings
 * https://github.com/sinclairzx81/typebox/issues/105#issuecomment-917385119
 */
// export const ImageFormatSchema = t.Union(imageFormats.map((value) => t.Literal(value)))
export const ImageFormatSchema = t.Union([
    t.Literal("png"),
    t.Literal("jpg"),
    t.Literal("jpeg"),
    t.Literal("webp")
])
