// uno.config.ts
import {
    defineConfig,
    presetAttributify, presetTypography, presetUno, presetWebFonts
} from 'unocss'
import transformerCompileClass from '@unocss/transformer-compile-class'
import { presetIcons } from 'unocss'

export default defineConfig({
    theme: {
        colors: {
            primary: {
                DEFAULT: '#0c0c0d',
                50: '#14171c',
            },
        },
    },
    rules: [
        [ 'shadow-d', {'box-shadow': '0px 0px 20px 0px var(--un-shadow-color)'}],
        [ 'bg-dotted', {'background-image': 'radial-gradient(var(--un-gradient-from, white) 2px, transparent 1px)', 'background-size': '40px 40px'}],
    ],
    transformers: [
        transformerCompileClass({
            classPrefix: 'a-',

        }),
    ],
    presets: [
        presetAttributify(),
        presetUno(),
        presetTypography(),
        presetIcons({
            collections: {
                charm: () => import("@iconify-json/charm/icons.json").then((i) => i.default),
            },
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': '-0.15em',
                'fill': 'currentColor',

            }
        }),
        presetWebFonts({
            provider: 'google',
            fonts: {
                "sans": 'Lexend',
                "serif": 'Merriweather',
                "mono": 'JetBrains Mono',
            },
        })
    ],
})