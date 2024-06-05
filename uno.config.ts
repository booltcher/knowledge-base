import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'

export default defineConfig({
  rules: [
    ["bg-primary", { 'background-color': "#3451b2" }],
    ["border-primary", { 'border': "1px solid #3451b2" }],
    ["color-primary", { 'color': "#3451b2" }],
    ["text-spacing", { 'letter-spacing': "2px" }],
    ["text-overflow-ellipsis", { "text-overflow": "ellipsis", "white-space": "nowrap", "overflow": "hidden" }],
  ],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      warn: true,
      unit: 'em',
    }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'Inter',
      },
    }),
    presetAnimations()
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
