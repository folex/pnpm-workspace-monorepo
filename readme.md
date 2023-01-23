# repro libp2p issue

To repro

```
pnpm i
pnpm -r build
cd web
pnpm preview
```

then open the browser, open console. You'll see the following error:

```
Uncaught (in promise) TypeError: cluster.on is not a function
    at node$1 (index-f4fc8d3e.js:48849:15)
    at lib$3.exports (index-f4fc8d3e.js:49728:25)
    at new PersistentStore (index-f4fc8d3e.js:49794:19)
    at new DefaultPeerStore (index-f4fc8d3e.js:50009:21)
    at new Libp2p (index-f4fc8d3e.js:51877:22)
    at Libp2p.create (index-f4fc8d3e.js:51842:14)
    at testLibp2p (index-f4fc8d3e.js:84102:34)
```
