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
---

## はじめに

Arch Linuxには、pacmanというパッケージマネージャで管理できるリポジトリの他に、公式リポジトリに登録する前のパッケージを登録できるAURというリポジトリがあります。

MacでいうHomebrewにプラスアルファでよりゆるいパッケージを公開できる場所という認識です。

そのAURで公開されているパッケージを管理するためのツールが`AUR ヘルパー` です。

→ 参考
[Archlinux wiki | AUR_ヘルパー](https://wiki.archlinux.jp/index.php/AUR_%E3%83%98%E3%83%AB%E3%83%91%E3%83%BC)

> AUR ヘルパーは Arch User Repository をより便利に使うために書かれたものです。



AUR ヘルパーにはいくつか種類があり、yayはそのうちのひとつ。

yayはpacmanににた構文でAURを管理できるので、pacmanを使い慣れたユーザにとってとてもフレンドリーなAURヘルパーです。


## yayをインストール


 Manjaro Linuxでは公式リポジトリに`yay`が登録されているので、その他アプリと同様に`pacman`でインストールできます。
 
```bash=
sudo pacman -S yay
```

 Arch Linuxではその他AURパッケージと同様にリポジトリから手動でクローン、「PKGBUILD」があるディレクトリで`makepkg`コマンドを使用してパッケージ化してからインストールする必要があります。

```bash=
pacman -S --needed git base-devel
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## yayを更新

```bash=
$ sudo pacman -Syu
```

## yayのコマンド
yayは`yay`コマンドを打つと自動的に`-Syu`オプションが実行されAURが全て更新されます。

### インストール済みパッケージをリストを含め更新
```bash=
sudo yay
```

### パッケージリストのみ更新
```bash=
sudo yay -Sy
```

### パッケージリストを強制的に更新
```bash=
sudo yay -Syy
```

### パッケージをインストール
```bash=
sudo yay -S hoge
```

### パッケージを削除
```bash=
sudo yay -R hoge
```

### hogeの依存関係をまとめて削除
```bash=
sudo yay -Rs hoge
```

### 不要な依存関係を削除
```bash=
sudo yay -Yc
```

### パッケージを検索
```bash=
sudo yay <検索語>
```
