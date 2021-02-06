---
title: "MacBook Pro early 2015にManjaro Linuxをインストールしたときのメモ"
slug: manjaro-linux-on-macbookpro-early-2015
date: 2021-01-29
wip: false
tags:
    - Mac
    - DualBoot
    - Manjaro
    - Arch
---

**MacBookPro early2015**に**Mac OS**と**Manjaro Linux**をデュアルブートした際必要だった設定などをメモ。

## ダウンロードするもの

- [Manjaro Linux i3 CommunityEdition](https://manjaro.org/downloads/community/i3/)
- [belenaEtcher](https://www.balena.io/etcher/)

## 用意するもの

- MacBookPro
- 4GB以上のUSBドライブ

## 環境

- MacBook Pro (13inch early 2015)
- macOS Catalina 10.15.7（19H2）
- Manjaro Linux i3 CommunityEdition

## Macでの準備

### ディスクユーティリティでパーティションを追加

ディスクユーティリティでFATフォーマットのパーティションを作成。とりあえず200GBをManjaro用のパーティションとして割り当てました。

ディスクユーティリティを開き、メインストレージにパーティションを作成。

[![ディスクユーティリティからメインストレージにパーティションを作成](https://i.gyazo.com/63c0fa8eb97c171c50b5e025d23a1e2b.png)](https://gyazo.com/63c0fa8eb97c171c50b5e025d23a1e2b)

```bash
$ diskutil list
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *500.1 GB   disk0
   1:                        EFI EFI                     209.7 MB   disk0s1
   2:                 Apple_APFS Container disk1         291.9 GB   disk0s2
   3:       Microsoft Basic Data MANJARO                 200.0 GB   disk0s3
```

`disk0s3`が作成したパーティション。

### LiveUSBを作成

1. [Manjaro i3](https://manjaro.org/downloads/community/i3/)のイメージをダウンロード
2. [belenaEtcher](https://www.balena.io/etcher/)をインストール
3. **blenaEtcher**でUSBにイメージを書き込み

## Manjaroでの設定

ターミナルは以下のショートカットで開きます。
`Mod + enter`

### pacmanのミラーサーバを変更

pacmanが参照するミラーサーバーを変更。`--fasttrack`フラグは一番早いミラーサーバーを自動的に探して設定します。

```bash
sudo pacman-mirrors --fasttrack
```

### yayをインストール

yayはAURパッケージをpacmanと似た操作でインストールできるようにする`AURヘルパー`。

```bash
sudo pacman -Syyu
sudo pacman -S yay
yay
```

`pacman -Syyu`はパッケージリストを同期、更新してくれるオプション。

### ブラウザをインストール

メモを残すためにブラウザが必要だったのでChromeを入れます。

```bash
yay -S google-chrome
```

デフォルトブラウザを変更。

```bash
xdg-mime default google-chrome.desktop x-scheme-handler/http
xdg-mime default google-chrome.desktop x-scheme-handler/https
```

`.bashrc`に以下を追加。

```bash
export BROWSER="/usr/bin/google-chrome-stable"
```

### ufsを有効化

```bash
sudo ufw enable
sudo systemctl enable --now ufw.service
```

## 日本語入力

### fcitxをインストール

Fcitxは言わずとしれた軽量のインプットメソッドフレームワーク。様々なIMEを組み合わせて使う。Google日本語入力のオープンソース実装であるMozcのfcitx版、`fcitx-mozc`を使用する。

また、デフォルトでは**GTK+**や**Qt**プログラムでの動作が不安定になる場合があるため、専用のパッケージ`fcitx-im`をインストールする必要があります。

```bash
sudo pacman -S fcitx fcitx-im fcitx-configtool fcitx-mozc
```

`./xprofile`に以下の設定を追加します。

```bash
export LANG='ja_JP.UTF-8'
export XMODIFIERS='@im=fcitx'
export XMODIFIER='@im=fcitx'
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export DefaultIMModule=fcitx
```

自動的にfcitxが起動するように`~/.i3/config`に設定を追加。

```bash
exec --no-startup-id fcitx
```

### 日本語対応フォントを導入

導入するのは**SourceHan Sans JP**。**Google**と**Adobe**が共同開発したフォントで、**源ノ角ゴシック**や**Noto Sans CJK JP**など名称にバリエーションがありますが、だいたい同じです。

**Noto Sans CJK**については**ChromeOS**や**Android**のデフォルトフォントとなっているようです。これをManjaroにも導入します。

ここでは**Adobe**からリリースされている**SourceHanSansJP**を使いますが、**Noto Sans CJK**と同等です。

```bash
sudo pacman -S adobe-source-han-sans-jp-fonts
```

`~/.i3/config`に`font pango:`という行がありますので、それを書き換えます。
フォントサイズも`8px`では小さいので、`12px`にしておきました。

```bash
# This font is widely installed, provides lots of unicode glyphs, right-to-left
# text rendering and scalability on retina/hidpi displays (thanks to pango).

font pango:Source Han Sans JP Normal 12 # <-これ
```


## その他必要な設定

### swapfileの設定

```bash
sudo fallocate -l 8G /swapfile
sudo chmod 0600 /swapfile
sudo swapon /swapfile
```

### ファンの設定

MacBookProにManjaroをインストールしてもファンは動作しません。ファンを動作させるために設定が必要です。`/etc/modules`に以下を追加。

```bash
coretemp
applesmc
```

ARUから`mbpfan-git`をインストール。

```bash
yay -S mbpfan-git
```

インストールが終わったらファンをセンサーが検出できるようにコマンドを実行。

```bash
sudo sensors-detect
```

`mbpfan`を有効にした後、起動。

```bash
sudo systemctl enable mbpfan
sudo systemctl start mbpfan
```

ファンの回転速度などは`/etc/mbpfan.conf`で設定可能。

```bash
min_fan1_speed = 1300
max_fan1_speed = 6100
low_temp = 60
high_temp = 64
max_temp = 80
polling_interval = 3
```

### サウンド設定

**Manjaro i3 Edition**はデフォルトの環境で音が出ないバグに出会う可能性があります。その場合、次の設定をします。

`/etc/modprobe.d/alsa-base.conf`に以下を追加。

```bash
options snd_hda_intel enable=1 index=0
options snd_hda_intel enable=1 index=1

```

**pulseaudio**と**pavucontrol**をインストール。

```bash
sudo pacman -S pulseaudio pavucontrol
```

メディアキーでボリューム操作ができるようにします。
`~/.i3/config`に以下を追加。

```bash
bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute 0 toggle
bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume 0 +5%
bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume 0 -5%
```

終わったら再起動します。(後でもいい)

```bash
systemctl reboot
```

### バックライト設定

バックライトを操作する[light](https://github.com/haikarainen/light)をインストール。

```bash
yay -S light-git
```

`light`を使うとコマンドラインからかんたんに輝度を変更できます。

- 輝度を5％上げる `light -A 5`
- 輝度を5％下げる `light -U 5`

これをi3 configからメディアキーに割り当てます。
`~/.i3/config`に以下を追加。

```bash
# Screen brightness controls
bindsym XF86MonBrightnessUp exec light -A 5
bindsym XF86MonBrightnessDown exec light -U 5
```

### 色温度が時間で変わるように設定

[redshift](https://github.com/jonls/redshift)をインストール。

**redshift**は太陽の位置に応じて色温度を変えてくれます。

```bash
sudo pacman -S redshift
```

自動起動するため、`~/.i3/config`に以下を追加。

```bash
exec --no-startup-id redshift
```

### 定期的なTrimを有効にする

一昔前のSSDはTrimに対応していない場合があります。Trimに対応していないSSDでTrimを実行すると性能に悪影響を及ぼすことがあるため、注意が必要です。

MacBook ProデフォルトのSSDを使っている場合、全世代で対応しているためTrimに対応しているかどうかは考えなくて大丈夫です。

この環境では、[Crucial P1](https://www.crucial.jp/products/ssd/p1-ssd)という**非純正のNVMe SSD**に換装しているため、一応対応しているかを調べました。

搭載している**NVMe SSD**がTrimに対応しているかどうかは`nvme`コマンドで調べられます（AHCI SSDの場合は別）

[nvme](https://github.com/linux-nvme/nvme-cli)コマンドをPacmanでインストールします。

```bash
sudo pacman -S nvme-cli
```

trimに対応しているかを調べます。

```bash
sudo nvme id-ns /dev/nvme0n1 | grep nlbaf
```

nlbafが0となっていればTrimに対応しています。systemctlでTrimを有効にします。

```bash
sudo systemctl enable --now fstrim.timer
```

## 開発環境を構築

- [Gitの基本的な設定方法とすこし使いやすくする設定をまとめた](https://www.haryoiro.com/blog/basic-git-configuration)

### inotify watchersの値を上げる

react-hot-reloadなどを使用していると、ファイル監視数上限エラーが出てくるので上限を上げておく。

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system
```

### VSCodeをインストール

VSCodeは３種類のパッケージが存在します。

- visual-studio-code-bin
- code
- code-Git

一番上の`visual-studio-code-bin`を入れます。

```bash
yay -S visual-studio-code-bin
```

### ターミナルエミュレータをインストール

[Alacritty](https://github.com/alacritty/alacritty)をインストールします。

**Mac OS**や**Windows**では、[kitty](https://github.com/kovidgoyal/kitty)を使用していますが、タブ機能やウィンドウ分割機能など**kitty**に求める機能が**i3-wm**と機能が競合してしまいます。そのため、**kitty**と同様にGPUで描画機能が実装されているターミナルエミュレータである**Alacritty**を使うことにしました。

```bash
sudo pacman -S alacritty
```

**i3**と**Alacritty**のウィンドウサイズ設定が競合し、表示崩れが発生するため`alacritty.yml`の`window: dimensions`をコメントアウトしてください。

## 参考

- [Linux(Manjaro)をMac Book Pro(2016モデル)にinstallしたときの覚書](https://gist.github.com/atomita/61f5ddd24f8a7016f4e8cca6008f02ed)
- [How to setup Manjaro Linux i3 on a Macbook Pro](https://lobotuerto.com/blog/how-to-setup-manjaro-linux-i3-on-a-macbook-pro/)
- [Setting up Manjaro on MacbookPro](https://pswu.dev/manjaro-on-macbook-pro/)
- [Manjaro Wiki | Swap](https://wiki.manjaro.org/index.php?title=Swap)
- [Manjaro インストール直後にやること12選](https://in-my-mind.hatenablog.jp/entry/12things-to-do-after-installing-manjaro-2020-04-18)
