---
title: "asdfで面倒な言語のバージョン管理をかんたんに！"
slug: "asdf-makes-tedious-language-version-control-easy"
date: "2021-01-30"
tags:
  - asdf
  - Golang
  - Java
  - Python
  - pyenv
  - Node.js
---

バージョン管理システムって何使ってますか？

プログラミングをしていると、言語バージョン毎に仕様が異なる場合が多く、いくつもの言語バージョンを切り替えるために、バージョン管理システムを使っている人も多いと思います。

`nodejs`は`nvm`や`n`、`python`なら`pyenv`など、バージョン管理のためにそれぞれの言語向けに開発されたソフトウェアをインストールしていました。

しかし、それぞれのバージョン管理システム毎に独特の操作方法やインストール方法があったり、特定のOSには対応していないなどというハマリポイントがいくつもあり、正直なところバージョン管理システムを管理するのが面倒といった問題があります。

今回インストールする`asdf`は、そんな面倒臭さに一石を投じるバージョン管理システムとなっています。


## asdfとは？

ざっくりいうと、いろんな言語を一つのバージョン管理システムだけで管理するソフトウェアです。

これからの時代、`pyenv`や`goenv`を入れるなどという面倒なことをする必要がなくなります。
`asdf`一つ入れればすべての言語で複数のバージョンを入れ替えて使うことができるようになります。

Go言語に入門したいけど、環境構築で時間を取られてしまう、、、
なんていう悩みの一部を`asdf`で解消することができるでしょう。

## インストール

インストール方法は、公式のチュートリアルに沿って勧めていきます。

[asdf-vm](https://asdf-vm.com/#/core-manage-asdf)

gitリポジトリから最新版をクローンします。
```
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.0
```

次のコマンドを実行します。
```
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.profile
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bashrc
```

変更を有効化します。
```
source ~/.profile
exec $SHELL
```

## asdfをアップデート

```
asdf update
```

## 必要な言語をインストール

今回インストールする言語は以下です。

- Node.js
- Golang
- Java

これ以外にも大抵の言語環境は揃っているので、各自調べてみてください。
なお、それぞれの言語のバージョンはこの記事を書いている時点での最新版なので、目的のバージョンとは異なる場合があります。

バージョン番号だけはしっかり確認してから実行してください。

### Node.js

```sh
asdf plugin-add nodejs
export GNUPGHOME="${ASDF_DIR:-$HOME/.asdf}/keyrings/nodejs" && mkdir -p "$GNUPGHOME" && chmod 0700 "$GNUPGHOME"
bash ~/.asdf/plugins/nodejs/bin/import-release-team-keyring

# 使用可能なバージョンを一覧
asdf list-all nodejs
asdf install nodejs 14.15.4
asdf global nodejs 14.15.4
```

### Golang

```sh
asdf plugin add golang

asdf list-all golang
asdf install golang 1.15.7
asdf global golang 1.15.7
```

### Java

```sh
asdf plugin add java

asdf list-all java
# adoptopenjdk-8.0.162+12.openj9-0.8.0
# adoptopenjdk-8.0.181+13
# adoptopenjdk-8.0.181+13.openj9-0.9.0
# adoptopenjdk-8.0.192+12
# ....

asdf install java openjdk-15.0.2
asdf global java openjdk-15.0.2
java --version
# openjdk 15.0.2 2021-01-19
# OpenJDK Runtime Environment (build 15.0.2+7-27)
# OpenJDK 64-Bit Server VM (build 15.0.2+7-27,  mixed mode, sharing)
```

### Python

```sh
asdf plugin add python
asdf plugin list

asdf install python 3.x.x
asdf global python 3.x.x

python --version

asdf current

```

## 参考サイト

[公式ドキュメント](https://asdf-vm.com/#/core-manage-asdf)