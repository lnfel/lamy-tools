import { t } from "elysia"
import { ElysiaType } from "elysia/type-system"
import { TypeSystem } from '@sinclair/typebox/system'
import { TUnsafe, TSchema } from '@sinclair/typebox'

export const FormDataType = TypeSystem.Type('FormData', (options, value) => value instanceof FormData)

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
    t.Literal("png", { default: 'png' }),
    t.Literal("jpg", { default: 'jpg' }),
    t.Literal("jpeg", { default: 'jpeg' }),
    t.Literal("webp", { default: 'webp' })
])
