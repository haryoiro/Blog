---
slug: "docker-compose-up-port-is-already-allocated-windows-linux"
title: "DockerComposeに「port is already allocated」と怒られたときにやること"
date: "2020-12-29"
---

## 原因

「port is already allocated」直訳すると「ポートはすでに割り当てられています」となり、
起動しようとしているコンテナが使用するポートと他のプロセスが使っているポートが競合しています。

ポートには一つにつき1プロセスしか割り当てられません。なので二つ目を割り当てようとするとエラーを履きます。  


### 対処法

大体、以下の流れですすめていくと解決できます。

- ポートがどのプロセスで使われているのかを調べる
- 調べたものを元にプロセスを終了する
- プロセスが終了したかの確認

順に説明します。  


### ポートがどのプロセスで使われているのかを調べる

特定のポートを使用しているプロセスはターミナルから確認可能です。
PowerShellとBashでは使用するコマンドが異なります。対応したコマンドを参照してください。

```powershell
 netstart -ano | findstr :[port]
```

```bash
 lsof -i :[port]
```

`[port]`には競合しているポートを入れます。

`port:80`がどのプロセスに占有されているのか調べたい場合はこのようになります。
```powershell
 netstart -ano | findstr :80
```

```bash
 lsof -i :80
```

### 調べたものを元にプロセスを終了する

プロセスにはPIDと言う一つ一つ異なる識別子が割り当てられており、プロセスを強制終了するにはこのPIDを使います。
先程のコマンドでPIDが表示されるので、それをコピーしておきます。

今回も同様にPowerShellとBashで使用するコマンドが異なります。以下のコマンドに先程コピーしたPIDを組み合わせて実行してください。

```powershell
 tskill [PID]
```

```bash
 kill -9 [PID]
```

### プロセスが終了したかの確認

```windows
 netstart -ano | findstr :[port]
```

```bash
 lsof -i :[port]
 ```

一つ目と同じ手順で確認できます。
lsof or netstartを実行して何も表示されなければポートが使えるようになっているはずです。

これでも使えない場合は`Docker Compose`の設定が不正など、実行ファイル側の問題である可能性があります。
ex. 異なるイメージが一つのポートにまとめてポートフォワードしている

Dockerだけの問題であればlsofやnetstartを使わずdocker psを使用するだけでいいかもしれません。

### ポートがかぶっているコンテナをストップ

$ docker ps
$ docker stop [name]

dockerのコンテナ一覧からPORTSがかぶっていそうなものを探してNAMEをコポー
直接コンテナをストップ

### ポートがかぶっているプロセスを探して kill

$ lsof -i :[port]
$ kill -9 [PID]

ポートを占拠しているのがdockerだけとは限りません。
lsofでポートを指定することで、そのポートを使っているプロセスを特定できます。
特定できたらPIDをコピーしてプロセスをキルします。

### まとめ
