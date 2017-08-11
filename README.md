# VueJS issue repro

context.styles getter is not set on the new context created when
`runInNewContext` is equal to `false` or `once`.

`vue-style-loader` is defining a getter for `context.styles` property
(https://github.com/vuejs/vue-style-loader/blob/master/lib/addStylesServer.js#L9)

When `runInNewContext` is `false` or `once`, VueJS is copying the `_styles`
property in `userContext` from `initialContext` but the `styles` getter is not.
(https://github.com/vuejs/vue/blob/8ff77a243cae0627a651fe852a6c07f7bcfce2a3/src/server/bundle-renderer/create-bundle-runner.js#L131)

Adding the following line after that one fixes the issue

```javascript
Object.defineProperty(userContext, 'styles',
  Object.getOwnPropertyDescriptor(initialContext, 'styles')
)
```

## Run the repro

```shell
npm run build
npm run start
```

Current output should be:

```
context.styles !== undefined (runInNewContext: true)
context.styles === undefined (runInNewContext: false)
context.styles === undefined (runInNewContext: once)
```

Expected output should be:

```
context.styles !== undefined (runInNewContext: true)
context.styles !== undefined (runInNewContext: false)
context.styles !== undefined (runInNewContext: once)
```
