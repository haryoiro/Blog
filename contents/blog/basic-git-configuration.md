---
title: "Gitの基本的な設定方法とすこし使いやすくする設定をまとめた"
slug: "basic-git-configuration"
date: "2021-01-30"
tags:
  - git
  - Manjaro
  - Ubuntu
wip: false
---

**Manjaro Linux**ユーザの場合はGitがデフォルトでインストールされています。
**Ubuntu Linux**ユーザの場合は**apt**パッケージマネーャからインストールする必要があります。

```bash
sudo apt install git
```

Gitが自分のPCにインストールされているかどうかは以下のコマンドで確かめられます。

```bash
git --version
#> git version 2.30.0
```

## ユーザ名とメールを設定する

```bash
git config --global user.name "My Name"
git config --global user.email myname@example.com
```

これを実行すると、`.gitconfig`に以下が書き込まれます。

```bash
[user]
    name = "My Name"
    email = myname@example.com
```

## pull時、常にrebase

rebaseの説明は**asachun**さんの記事がとてもわかり易かったので勝手に載せておきます。
[git pull と git pull –rebase の違いって？図を交えて説明します！](https://kray.jp/blog/git-pull-rebase/)

```bash
git config --global pull.rebase true
```

これで、常に`git pull --rebase`されます。

## CLIをカラフルに

`git status`や`git diff`の出力がカラフルになります。

```bash
git config --global color.ui "auto"
```

## グローバルな.gitignore

OSやIDE固有のファイルはプロジェクトルートの`.gitignore`に追加すべきではありません。

`.gitignore_global`を設定しましょう。

```bash
git config --global core.excludesfile ~/.gitignore_global
```

Macの場合は`.DS_Store`などのファイルを追加すべきです。
IDEは`VSCode`を使用しているので`.vscode`を`.gitignore_global`に追加します。

```bash
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

Mac OS, Windows, SublimeTextなどのファイルもあります。

## 行末コード

core.autocrlf

- false: コミット時、チェックアウト時に改行コードを変換しない。
- true: コミット時にCRLF→LFの変換を行い、チェックアウト時にLFをCRLFに変換する。
- input: コミット時にCRLF→LFの変換を行い、チェックアウト時には変換しない。
core.safecrlf
- trueファイル内に複数の改行コードが混じっている場合に自動変換しない。|


Linux/Mac

```bash
git config --global core.autocrlf input
git config --global core.safecrlf true
```

Windows

```bash
git config --global core.autocrlf true
git config --global core.safecrlf true
git config --global core.whitespace cr-at-eol
```

## 参考

- [git pull と git pull –rebase の違いって？図を交えて説明します！](https://kray.jp/blog/git-pull-rebase/)
- [コミット、チェックアウト時に改行コードを自動変換する](https://maku77.github.io/git/settings/autocrlf.html)
- [Basic Git configuration](https://lobotuerto.com/blog/basic-git-configuration/)
