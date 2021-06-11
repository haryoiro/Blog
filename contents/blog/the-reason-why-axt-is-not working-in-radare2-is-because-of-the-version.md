---
title: "radare2でaxtが使えないのはバージョンが原因だった"
slug: "the-reason-why-axt-is-not working-in-radare2-is-because-of-the-version"
date: "2021-06-12"
tags:
    - ubuntu
    - linux
    - ctf
    - radare2
wip: false
---

CTFの勉強でハリネズミ本を勧めていると、`radare2`で`axt`コマンドをつかうかしょがありました。

`radare2`は動くものの、`axt`コマンドが動かない。調べたところ、`apt`を使用してインストールした`radare2`はバージョンが古いため、推奨されないとのこと。



一度入れてしまった方は、以下のコマンドでUbuntuをクリーンな状態に戻したのち、これから紹介する方法で再度インストールを行ってください。


## radare2をアンインストール

この方の記事を参考にさせていただきました。ありがとうございます。

[radare2 でaxt が使えない。　新しいバージョンを入れたら　symbol lookup error](http://hsmtblue.hateblo.jp/entry/2019/11/10/032902)

```
sudo apt-get remove --purge radare2
sudo apt-get autoremove
sudo apt autoclean
```

## Gitからクローンしてインストール

こちらのやり方は公式リポジトリを見ると書かれています。

そもそも何も確認せず`apt-get`を使って何でもかんでもインストールするのはだめですね、、、ということを改めて感じました。

```
git clone https://github.com/radareorg/radare2
radare2/sys/install.sh
```

これで終了です。
