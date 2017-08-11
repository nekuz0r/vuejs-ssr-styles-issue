import * as fs from 'fs';
import * as path from 'path';
import { createBundleRenderer } from 'vue-server-renderer';
import * as ServerBundle from '../dist/vue-ssr-server-bundle.json';

{
  const renderer = createBundleRenderer(ServerBundle, {
    runInNewContext: true,
    template: fs.readFileSync(path.join(__dirname, 'app.template.html'), {
      encoding: 'utf8',
    }),
  });

  const context: any = {};
  const html = renderer.renderToString(context, (error, html) => {
    if (context.styles === undefined) {
      console.error('context.styles === undefined (runInNewContext: true)');
    } else {
      console.log('context.styles !== undefined (runInNewContext: true)');
    }
  });
}

{
  const renderer = createBundleRenderer(ServerBundle, {
    runInNewContext: false,
    template: fs.readFileSync(path.join(__dirname, 'app.template.html'), {
      encoding: 'utf8',
    }),
  });

  const context: any = {};
  const html = renderer.renderToString(context, (error, html) => {
    if (context.styles === undefined) {
      console.error('context.styles === undefined (runInNewContext: false)');
    } else {
      console.log('context.styles !== undefined (runInNewContext: false)');
    }
  });
}

{
  const renderer = createBundleRenderer(ServerBundle, {
    runInNewContext: 'once',
    template: fs.readFileSync(path.join(__dirname, 'app.template.html'), {
      encoding: 'utf8',
    }),
  });

  const context: any = {};
  const html = renderer.renderToString(context, (error, html) => {
    if (context.styles === undefined) {
      console.error('context.styles === undefined (runInNewContext: once)');
    } else {
      console.log('context.styles !== undefined (runInNewContext: once)');
    }
  });
}
