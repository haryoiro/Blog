---
title: "Gitの基本的な設定方法、そして少し応用的な設定をまとめた"
slug: "basic-git-configuration"
date: "2021-01-30"
tags:
  - git
  - Linux
wip: true
---

**Manjaro Linux**ユーザの場合はgitがデフォルトでインストールされています。
**Ubuntu Linux**ユーザの場合は**apt**パッケージマネーャからインストールする必要があります。

```
sudo apt install git
```

gitが自分のPCにインストールされているかどうかは以下のコマンドで確かめられます。
```
git --version
#> git version 2.30.0
```

## ユーザ名とメールを設定する

```
git config --global user.name "My Name"
git config --global user.email myname@example.com
```

これを実行すると、`.gitconfig`に以下が書き込まれます。
```
[user]
    name = "My Name"
    email = myname@example.com
```

## pull時、常にrebase

rebaseの説明は**asachun**さんの記事がとてもわかり易かったので勝手に載せておきます。
[git pull と git pull –rebase の違いって？図を交えて説明します！](https://kray.jp/blog/git-pull-rebase/)

```
git config --global pull.rebase true
```

これで、常に`git pull --rebase`されます。

## CLIをカラフルに

`git status`や`git diff`がカラフルになります
```
git config --global color.ui "auto"
```


## グローバルな.gitignore

OSやIDE固有のファイルはプロジェクトルートの`.gitignore`に追加すべきではありません。

`.gitignore_global`を設定しましょう。

```
git config --global core.excludesfile ~/.gitignore_global
```

Macの場合は`.DS_Store`などのファイルを追加すべきです。
IDEは`VSCode`を使用しているので`.vscode`を`.gitignore_global`に追加します。

```
echo ".vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

# Local History for Visual Studio Code
.history/" | sudo tee -a ~/.gitignore_global
```

Globalでignoreすべきファイルについては`github/gitignore`で確認できます。


[github/gitignore/Global](https://github.com/github/gitignore/tree/master/Global)

MacOS, Windows, SublimeTextなどのファイルもあります。

## 行末コード

core.autocrlf
- false: コミット時、チェックアウト時に改行コードの変換を行わない
- true: コミット時に CRLF→LF の変換を行い、チェックアウト時に LF→CRLF の返還を行う。
- input: コミット時に CRLF→LF の変換を行い、チェックアウト時には変換を行わない。
core.safecrlf
- true ファイル内に複数の改行コードが混じっている場合に自動変換を行わない。|


Linux/Mac

```
git config --global core.autocrlf input
git config --global core.safecrlf true
```

Windows

```
git config --global core.autocrlf true
git config --global core.safecrlf true
git config --global core.whitespace cr-at-eol
```

## Link
- [git pull と git pull –rebase の違いって？図を交えて説明します！](https://kray.jp/blog/git-pull-rebase/)
- [コミット、チェックアウト時に改行コードを自動変換する](https://maku77.github.io/git/settings/autocrlf.html)
- [Basic Git configuration](https://lobotuerto.com/blog/basic-git-configuration/)
