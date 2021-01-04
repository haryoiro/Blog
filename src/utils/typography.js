import Typography from "typography"
import FairyGatesTheme from "typography-theme-fairy-gates"

const opt = {
    // テーマのタイトル
    title: 'CloudGazeller',
    // ピクセルによる基本となるフォントサイズ
    baseFontSize: '16px',
    // 基本の line height の大きさ。単位なしの数値で定義。 デフォルトは 1.45
    baseLineHeight: 1.414,
    // Moduler Scaleの基準値
    // > 参考リンク https://www.modularscale.com/
    scaleRatio: 1.414,
    includeNormalize: true,
    headerFontFamily: [
        "YakuHanJPs Noto",
        "Avenir Next",
        "Helvetica Neue",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
    ],
    bodyFontFamily: [
        "YakuHanJPs Noto",
        "--apple-system",
        "Helvetica Neue",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
    ],
}

const ath = { ...FairyGatesTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    'h2,h3': {
        marginBottom: rhythm(1/2),
        marginTop: rhythm(2),
    },
    p: {
        marginBottom: rhythm(-1),
    } 
  }), ...opt }
  

const  typography = new Typography(ath)
const { scale, rhythm } = typography

typography.injectStyles()

export { scale, rhythm, typography as default }
