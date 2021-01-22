---
title: Dockerに"port is already allocated"と怒られたときの対処法
slug: docker-compose-up-port-is-already-allocated-windows-linux
date: "2020-12-29"
tags:
  - docker
  - linux
  - windows
category: docker
wip: false
---

## "port is already allocated"エラーの原因

port is already allocatedは、直訳すると「ポートはすでに割り当てられています」。
起動しようとしているコンテナが使用しようとしているポートと、すでに起動している他のプロセスが使っているポートが競合しており、Dockerコンテナを立ち上げることができなくなっています。

## 対処するには

以下の流れですすめていくと解決できます。

- 同じポートを使っているDockerコンテナがないか確認する
- ポートがどのプロセスで使われているのかを調べる
- 調べたものを元にプロセスを終了する
- プロセスが終了したかの確認

順に説明します。

## 同じポートを使っているDockerコンテナがないか確認する。

Dockerコンテナが使用しているポートは**docker ps**をつかって確認可能です。

```bash
docker ps
> CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

実行するとコンテナ一覧が表示されます。**PORTS**という列に実行しようとしているポートと同じポート番号を見つけたらその行の**NAMES**をコピーしてください。

**NAMES**を次のコマンドに当てはめて実行すると、そのコンテナを終了できます。

```bash
docker stop [NAMES]
```

この手順を実行して解決できない場合は次の手順へ進んでください。

## ポートがどのプロセスで使われているのかを調べる

ポートを占拠しているのはDockerコンテナだけとは限りません（むしろそれ以外の方が多い）。
特定のポートを使用しているプロセスはターミナルから探すことができます。
**Powershell**では**netstart**、**bash**では**lsof**を使います。

> PowerShell
```powershell
 netstart -ano | findstr :[port]
```

> Bash
```bash
 lsof -i :[port]
```

**[port]**には競合しているポートを入れます。

**port:80**がどのプロセスに占有されているのか調べたい場合はこのようになります。

> PowerShell
```powershell
 netstart -ano | findstr :80
```

> Bash
```bash
 lsof -i :80
```

## 調べたものを元にプロセスを終了する

プロセスにはPIDと言う1つ1つ異なる識別子が割り当てられており、プロセスを強制終了するにはこのPIDを使います。
先程のコマンドでPIDが表示されるので、それをコピーしておきます。

今回も同様にPowerShellとBashで使用するコマンドが異なります。以下のコマンドに先程コピーしたPIDを組み合わせて実行してください。

> PowerShell
```powershell
 tskill [PID]
```

> Bash
```bash
 kill -9 [PID]
```

## プロセスが終了したかを確認

> PowerShell
```powershell
 netstart -ano | findstr :[port]
```

> Bash
```bash
 lsof -i :[port]
 ```

1つ目と同じ手順で確認できます。
lsof or netstartを実行して何も表示されなければポートが使えるようになっているはずです。
