---
title: MacでGolangの開発環境を整える
slug: setting-up-golang-environment-on-Mac
data: 2021-01-20
tags:
    - Mac
    - Golang
    - "fish shell"
wip: true
---

## 環境

- macOS Catalina version 10.15.7
- goenv 2.0.0beta11
- fish version 3.1.0

## goenvとは

[Go Version Management: goenv](https://github.com/syndbg/goenv)

goenvはGoのためのバージョン管理システム。
異なったバージョンのGoをいくつも切り替えて使いたいときに便利です。
**pyenv**や**rbenv**を使ったことがある人なら、難なく使いこなすことができるでしょう。

## githubからgoenvをクローン、インストール

Homebrewでインストールすると古いバージョンがインストールされてしまうため、リポジトリから直接クローン、インストールします。

```sh
git clone https://github.com/syndbg/goenv.git ~/.goenv
```

## 環境変数を設定

環境変数を設定するにはシェルの設定ファイルに設定を書き込む必要があります。

`~/.bash_profile`の部分をインストールする環境によって変更してからコマンドを入力してください。

bashの場合 ： **~/.bash_profile**
Ubuntuの場合は : **~/.bashrc**
zshの場合は : **~/.zshenv**

```sh
echo 'export GOENV_ROOT="$HOME/.goenv"' >> ~/.bash_profile
echo 'export PATH="$GOENV_ROOT/bin:$PATH"' >> ~/.bash_profile
```

また、fishの場合は**config.fish**に**fish構文**で環境変数を設定します。

```fish
sh -c "echo 'set -x GOENV_ROOT \$HOME/.goenv' >> ~/.config/fish/config.fish"
sh -c "echo 'set -x PATH \$GOENV_ROOT/bin \$PATH' >> ~/.config/fish/config.fish"
sh -c "echo 'eval (goenv init - | source)' >> ~/.config/fish/config.fish"
```

設定を反映させるには、設定ファイルを再読込させる必要があります。

> zsh
```sh
source ~/.zshrc
```

> fish
```fish
source ~/.config/fish/config.fish
```

```
exec $SHELL
```

## goenvがインストールされているか確認

バージョンを確認し、インストールされていれば何かしらのバージョンが表示されるはずです。

```sh
goenv -v
> goenv 2.0.0beta11
```

## Goをインストール

インストールできるバージョンを確認します。

```sh
goenv install -l
> Available versions:
  1.2.2
  1.3.0
  1.3.1
  .
  .
  1.15.4
  1.15.5
  1.15.6
  1.16beta1
```

確認できたら上に出てきた一覧から任意のバージョンを指定してインストールします。

```
goenv install 1.15.6
> Downloading go1.15.6.darwin-amd64.tar.gz...
> -> https://golang.org/dl/go1.15.6.darwin-amd64.tar.gz
> Installing Go Darwin 64bit 1.15.6...
> Installed Go Darwin 64bit 1.15.6 to /Users/haryoiro/.goenv/versions/1.15.6
```

インストールされているバージョンを確認します。

```sh
goenv versions
> * system (set by /Users/haryoiro/.goenv/version)
  1.15.6
```

先程インストールしたバージョンが表示されていれば大丈夫です。
次に、グローバルでどのバージョンを使用するかを設定します。

```sh
goenv global 1.15.6
goenv rehash
```

どのバージョンが有効化されているかを確認します。
```sh
goenv versions
>   system
> * 1.15.6 (set by /Users/dddddd/.goenv/version)
```

**1.15.6**にチェックがされていればOK。

## GOPATHを設定

> bashの場合
```sh
echo 'export PATH="$GOROOT/bin/$PATH"' >> ~/.bash_profile
echo 'export PATH="$PATH:$GOPATH/bin"' >> ~/.bash_profile
```

> fishの場合
```sh
sh -c "echo 'set -x GOPATH \$HOME/bin' >> ~/.config/fish/config.fish"
sh -c "echo 'set -x PATH \$PATH \$GOPATH/bin' >> ~/.config/fish/config.fish"
```

Goが使えるようになっていれば完了です。

```
go version
> go version go1.15.6 darwin/amd64
```


## 参考

> [syndbg/goenv/INSTALL.md](https://github.com/syndbg/goenv/blob/master/INSTALL.md)
> [[Go] MacでGo言語環境構築](https://qiita.com/koralle/items/7a16772ad1d2e2e34682)
> [goenvでgoをインストール 〜初心者向け〜](https://qiita.com/yut-kt/items/9f5ac1e788df61f64290)