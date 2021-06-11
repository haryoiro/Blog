---
title: "radare2でaxtが使えないのはapt-getのバージョンが原因だった"
slug: "the-reason-why-axt-is-not working-in-radare2-is-because-of-the-version"
date: "2021-06-12"
tags:
    - ubuntu
    - linux
    - ctf
    - radare2
wip: false
---

CTFの勉強でハリネズミ本を勧めていると、`radare2`で`axt`コマンドを使用する箇所がありました。

`radare2`は動くものの、`axt`コマンドが動かない。調べたところ、`apt`を使用してインストールした`radare2`はバージョンが古いため、推奨されないとのこと。

一度インストールした方は、以下のコマンドでUbuntuをクリーンな状態に戻したのち、これから紹介する方法で再度インストールを行ってください。


## radare2をアンインストール

```
sudo apt-get remove --purge radare2
sudo apt-get autoremove
sudo apt autoclean
```

## Gitからクローンしてインストール

こちらのやり方は公式リポジトリを見ると書かれています。

そもそも何も確認せず`apt-get`を使って何でもかんでもインストールするのは控えるべきということを改めて感じました。

```
git clone https://github.com/radareorg/radare2
radare2/sys/install.sh
```

これで終了です。
