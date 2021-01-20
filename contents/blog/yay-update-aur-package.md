---
title: AURパッケージをyayで更新する
slug: yay-update-aur-package
date: "2020-12-31"
tags:
  - linux
  - arch
  - pacman
  - yay
category: archlinux
wip: false
---

## yayとは

Arch Linuxには、pacmanというパッケージマネージャで管理できるリポジトリの他に、公式リポジトリに登録する前のパッケージを登録できるAURというリポジトリがあります。

MacでいうHomebrewにプラスアルファでよりゆるいパッケージを公開できる場所という認識です。

そのAURで公開されているパッケージを管理するためのツールが`AUR ヘルパー` です。

→ 参考
[Archlinux wiki | AUR_ヘルパー](https://wiki.archlinux.jp/index.php/AUR_%E3%83%98%E3%83%AB%E3%83%91%E3%83%BC)

> AUR ヘルパーは Arch User Repository をより便利に使うために書かれたものです。




AURヘルパーにはいくつか種類があり、yayはそのうちのひとつ。

yayはpacmanに似た構文でAURを管理できるので、pacmanを使い慣れたユーザにとってとてもフレンドリーなAURヘルパーです。


## yayをインストール


 Manjaro Linuxでは公式リポジトリに`yay`が登録されているので、その他アプリと同様に`pacman`でインストールできます。

```sh
sudo pacman -S yay
```

 ArchLinuxでは、その他AURパッケージと同様に**PKGBUILD**があるディレクトリで`makepkg`コマンドを使用してパッケージ化してからインストールする必要があります。

```sh
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## yayを更新

```sh
sudo pacman -Syu
```

## yayのコマンド

yayでは`yay`コマンドを打つと自動的に`-Syu`オプションをつけた時と同様の動きをします。つまり、全てのAURパッケージが更新されます。

### インストール済みパッケージをリストを含め更新

```sh
sudo yay
```

### パッケージリストのみ更新

```sh
sudo yay -Sy
```

### パッケージリストを強制的に更新

```sh
sudo yay -Syy
```

### パッケージをインストール

```sh
sudo yay -S hoge
```


#### パッケージを削除

```sh
sudo yay -R hoge
```


#### hogeの依存関係をまとめて削除

```sh
sudo yay -Rs hoge
```


#### 不要な依存関係を削除

```sh
sudo yay -Yc
```


#### パッケージを検索

```sh
sudo yay <検索語>
```

### 参考サイト

[yay – Best AUR Helper for Arch Linux / Manjaro](https://computingforgeeks.com/yay-best-aur-helper-for-arch-linux-manjaro/)
[yayでよく使いそうなコマンドのメモ](https://tiridukano-yagigame.hatenablog.jp/entry/2019/12/01/200921)

