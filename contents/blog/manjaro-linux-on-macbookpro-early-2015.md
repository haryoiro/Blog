---
title: "Install Manjaro i3 Edition on MacBookPro early2015"
slug: manjaro-linux-on-macbookpro-early-2015
date: 2021-01-29
wip: false
tags: 
    - Manjaro
    - Arch
    - Mac
    - Linux
---

追記：2021-06-09


この記事では、**MacBookPro early2015**で**MacOS**と**Manjaro Linux**をデュアルブートするための手順。MacbookPro特有の細かな設定まで一通り説明しています。

## ダウンロードするもの

- [Manjaro Linux i3 CommunityEdition](https://manjaro.org/downloads/community/i3/)
- [belenaEtcher](https://www.balena.io/etcher/)

## 用意するもの

- MacBookPro
- 4GB以上のUSBドライブ

## 環境

- macOS Catalina 10.15.7（19H2）
- Manjaro Linux i3 CommunityEdition

## Mac側での準備

### Manjaroのイメージファイルをダウンロード

Manjaro-i3のイメージファイルは以下のサイトにあります。

[Manjaro Linux i3 CommunityEdition](https://manjaro.org/downloads/community/i3/)

URLにアクセスすると、`Download`と`Download Minimal`。２つの選択肢があります。

2つの違いは、最初から入っているソフトウェアです。容量的な違いで言えば、無印は2.2GB、 Minimalは1.8GBでした。

[![Download Manjaro](https://i.gyazo.com/a662c2028ac76834b6f5d89cc4ef0b76.png)](https://gyazo.com/a662c2028ac76834b6f5d89cc4ef0b76)

どちらかをダウンロードして、次へ進んでください。

### belenaEtcherをダウンロード

Manjaro-i3をダウンロードしている間にLiveUSB作成の準備を行います。
以下のサイトから、`Download for macOS`をクリックしてダウンロードしてください。

**[belenaEtcher](https://www.balena.io/etcher/)**

[![Image from Gyazo](https://i.gyazo.com/02c219c9718cc7c12fbb1a224f558163.png)](https://gyazo.com/02c219c9718cc7c12fbb1a224f558163)

### LiveUSBを作成

先ほどのManjaroイメージファイルがダウンロードし終わりましたら、USBをMacに差し込み、balenaEtcherを開きます。

Flash from fileを選択し、Manjaro-i3-xxxx.isoを選択します。

`Select target`を押すと、現在差し込まれているドライブが一覧表示されるので、先程差し込んだUSBを選択してください。

消えては行けない外付けドライブなどありましたら、それらを外してからこの工程を行ってください。

最後に、`Flash`を押すと、USBへのマウントが開始されます。

### ディスクユーティリティでパーティションを分割

**ディスクユーティリティでFATフォーマットのパーティションを作成**
- OSインストール用 200GB

ディスクユーティリティを開き、メインストレージにパーティションを作成。

[![ディスクユーティリティからメインストレージにパーティションを作成](https://i.gyazo.com/63c0fa8eb97c171c50b5e025d23a1e2b.png)](https://gyazo.com/63c0fa8eb97c171c50b5e025d23a1e2b)


```
$ diskutil list
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *500.1 GB   disk0
   1:                        EFI EFI                     209.7 MB   disk0s1
   2:                 Apple_APFS Container disk1         291.9 GB   disk0s2
   3:       Microsoft Basic Data MANJARO                 200.0 GB   disk0s4
```

`disk0s4`が作成したパーティションです。

### MacへManjaroをインストール

パーティションの分割とUSBへの書き込みが修了したら、Macを再起動します。

このとき、`option`キーを押しながら起動すると、起動メディアの選択画面が出てくるので、`EFI Boot`を選択してください。

うまく行けばmanjaroという文字とともに、オプション選択画面が出てきます。

tzをAsia/Tokyo
keytableをjpにして


## Manjaroでの設定

ターミナルは以下のショートカットで開きます。
`Mod + enter`

### pacmanのミラーサーバを変更

pacmanが参照するミラーサーバーを変更。`--fasttrack`フラグは一番早いミラーサーバーを自動的に探して設定してくれます。

```
sudo pacman-mirrors --fasttrack
```

### yayをインストール

yayはAURパッケージをpacmanと似た操作でインストールできるようにする`AURヘルパー`。

```
sudo pacman -Syyu
sudo pacman -S yay
yay
```

`pacman -Syyu`はパッケージリストを同期、更新してくれるオプション。

### ブラウザをインストール

メモを残すためにブラウザが必要だったのでブラウザを入れます。FirefoxでもChromeでも何でも入れれます。

```
yay -S google-chrome
```


デフォルトブラウザを変更

`.bashrc`に以下を追記
```
export BROWSER="/usr/bin/google-chrome-stable"
```

### ufsを有効化

```
sudo ufw enable
sudo systemctl enable --now ufw.service
```

## 日本語入力

### fcitxをインストール

IMEです。Google日本語入力的な

```
sudo pacman -S fcitx fcitx-im fcitx-configtool fcitx-mozc
```

`./xprofile`に以下の設定を追加します。

```
export LANG='ja_JP.UTF-8'
export XMODIFIERS='@im=fcitx'
export XMODIFIER='@im=fcitx'
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export DefaultIMModule=fcitx
```

自動的にfcitxが起動するように`~/.i3/config`に設定を追記

```
exec --no-startup-id fcitx
```

### 日本語対応フォントを導入

導入するのは**SourceHan Sans JP**。**Google**と**Adobe**が共同開発したフォントで、**源ノ角ゴシック**や**Noto Sans CJK JP**など名称にバリエーションがありますが、だいたい同じです。

**Noto Sans CJK**については**ChromeOS**や**Android**のデフォルトフォントとなっているようです。これをManjaroにも導入します。

ここでは**Adobe**からリリースされている**SourceHanSansJP**を使いますが、**Noto Sans CJK**と同等です。

```
sudo pacman -S adobe-source-han-sans-jp-fonts
```

`~/.i3/config`に`font pango:`という行がありますので、それを書き換えます。
フォントサイズも`8px`では小さいので、`12px`にしておきました。

```
# This font is widely installed, provides lots of unicode glyphs, right-to-left
# text rendering and scalability on retina/hidpi displays (thanks to pango).

font pango:Source Han Sans JP Normal 12 # <-これ
```


## その他必要な設定

### swapfileの設定

```
sudo fallocate -l 8G /swapfile
sudo chmod 0600 /swapfile
sudo swapon /swapfile
```

### ファンの設定

MacBookProにManjaroをインストールしてもファンは動作しません。ファンを動作させるために設定が必要です。`/etc/modules`に以下を追加。

```
coretemp
applesmc
```

yayで`mbpfan-git`をインストール

```
yay -S mbpfan-git
```

インストールが終わったらファンをセンサーが検出できるようにコマンドを実行

```
sudo sensors-detect
```

ファンを起動

```
sudo systemctl enable mbpfan
sudo systemctl start mbpfan
```

ファンの回転速度などは`/etc/mbpfan.conf`で設定可能です

```
min_fan1_speed = 1300 
max_fan1_speed = 6100 
low_temp = 60   
high_temp = 64   
max_temp = 80   
polling_interval = 3
```

### サウンド設定

このディストリビュージョン、インストール時にサウンド設定が正常にされていないのか、音が出ないらしい？ので、音が出るように設定します。

`/etc/modprobe.d/alsa-base.conf`に設定を追記。

```
options snd_hda_intel enable=1 index=0
options snd_hda_intel enable=1 index=1

```

**pulseaudio**と**pavucontrol**をインストール

```
sudo pacman -S pulseaudio pavucontrol
```

メディアキーでボリューム操作ができるようにします。
`~/.i3/config`に以下を追加

```
bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute 0 toggle
bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume 0 +5%
bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume 0 -5%
```

終わったら再起動します。(後でもいい)

```
systemctl reboot
```

### バックライト設定

バックライトを操作する**light**をインストール

```
yay -S light-git
```

`light`はこんな感じで使います。

- 輝度を5%上げる `light -A 5`
- 輝度を5%下げる `light -U 5`

コマンドラインで実行してみると輝度が上下します。上下幅についてはお好みで設定してください。

これをまたメディアキーで操作できるようにします。
`~/.i3/config`に以下を追加

```
# Screen brightness controls
bindsym XF86MonBrightnessUp exec light -A 5
bindsym XF86MonBrightnessDown exec light -U 5
```

### 色温度が時間で変わるように設定

**redshift**をインストール
**redshift**は太陽の位置に応じて色温度を変えてくれます。

```
sudo pacman -S redshift geoclue2
```

自動起動するために`~/.i3/config`に以下を追加します。
```
exec --no-startup-id redshift-gtk
exec --no-startup-id /usr/lib/geoclue-2.0/demos/agent
```

### 定期的なTrimを有効にする

搭載しているSSDがTrimに対応しているかどうかは`nvme`コマンドで調べられます。

`nvme`コマンドはpacmanでインストールできます

```
sudo pacman -S nvme-cli
```

trimに対応しているかを調べます。

```
sudo nvme id-ns /dev/nvme0n1 | grep nlbaf
```

nlbafが0となっていればtrimに対応しているので、次のコマンドを実行してください。

```
sudo systemctl enable --now fstrim.timer
```


## 開発環境を構築

- [Gitの基本的な設定方法とすこし使いやすくする設定をまとめた](https://www.haryoiro.com/blog/basic-git-configuration)

### inotify watchersの値を上げる

react-hot-reloadなどを使用していると、ファイル監視数上限エラーが出てくるので上限を上げておく。

```
echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system
```


### VSCodeをインストール

VSCodeは３種類のパッケージが存在します。

- visual-studio-code-bin
- code
- code-git

基本は一番上の`visual-studio-code-bin`を入れておけば大丈夫。

```
yay -S visual-studio-code-bin
```

### ターミナルエミュレータをインストール

今回は**Alacritty**をインストールします。普段、MacOSやWindows内では**kitty**というターミナルエミュレータを使用していますが、**i3**とは機能がかぶったりキーバインドが面倒だったりするため、最小限の機能しか積んでないけど超高速な**Alacritty**を使うことにします。

```
sudo pacman -S alacritty
```

i3でalacrittyを使用するときは、`window: dimensions`をコメントアウトしてください。i3とAlacrittyのウィンドウサイズが競合して表示が崩れます。



## References

- [Linux(Manjaro)をMac Book Pro(2016モデル)にinstallしたときの覚書](https://gist.github.com/atomita/61f5ddd24f8a7016f4e8cca6008f02ed)
- [How to setup Manjaro Linux i3 on a Macbook Pro](https://lobotuerto.com/blog/how-to-setup-manjaro-linux-i3-on-a-macbook-pro/)
- [Setting up Manjaro on MacbookPro](https://pswu.dev/manjaro-on-macbook-pro/)
- [Manjaro Wiki | Swap](https://wiki.manjaro.org/index.php?title=Swap)
- [Manjaro インストール直後にやること12選](https://in-my-mind.hatenablog.jp/entry/12things-to-do-after-installing-manjaro-2020-04-18)