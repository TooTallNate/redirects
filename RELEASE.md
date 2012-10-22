# RELEASE #

```
git fetch
git rebase origin/master
```

Then -> add domains to redirects.js.

And -> increment version in package.json.

Then:

```
git commit -m 'Add new domains to redirects.json' redirects.json
node build.js
git commit -m 'Commit new built version of package.json' _package.json package.json
jitsu deploy
```

(Ends)

