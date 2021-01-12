import Typography from 'typography'
import FairyGatesTheme from 'typography-theme-fairy-gates'

const opt = {
  title: 'Haryoiros',
  baseFontSize: '16px',
  baseLineHeight: 1.414,
  // Moduler Scaleの基準値
  // > 参考リンク https://www.modularscale.com/
  scaleRatio: 1.414,
  includeNormalize: true,
  headerFontFamily: [
    'YakuHanJPs_Noto',
    'Noto Sans JP',
    'Hiragino Sans',
    'Hiragino Kaku Gothic ProN',
    'Meiryo',
    'sans-serif',
  ],
  bodyFontFamily: [
    'YakuHanJPs_Noto',
    'Noto Sans JP',
    'Hiragino Sans',
    'Hiragino Kaku Gothic ProN',
    'Meiryo',
    'sans-serif',
  ],
}

const ath = {
  ...FairyGatesTheme.overrideThemeStyles = ({ rhythm }) => ({
    p: {
      marginBottom: rhythm(-1),
    },
  }),
  ...opt,
}

const typography = new Typography(ath)
const { scale, rhythm } = typography

typography.injectStyles()

export { scale, rhythm, typography as default }
