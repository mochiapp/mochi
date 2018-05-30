var fs = require('fs');
var chalk = require('chalk');

module.exports = {
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      extensions: ['.js', '.jsx', '.vue'],
      fallbackKey: function (ns, value) {
        // Returns a hash value as the fallback key
        return sha1(value);
      }
    },
    lngs: ['en', 'nl'],
    ns: [
      'common', 'topbar'
    ],
    defaultLng: 'en',
    defaultNs: 'common',
    // defaultValue: '__STRING_NOT_TRANSLATED__',
    defaultValue: '',
    resource: {
      loadPath: 'static/i18n/{{lng}}/{{ns}}.json',
      savePath: 'static/i18n/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    }
  },
  transform: function customTransform(file, enc, done) {
    "use strict";
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(content, { list: ['\\$t'] }, (key, options) => {
      parser.set(key, Object.assign({}, options, {
        nsSeparator: ':', // '.',
        keySeparator: false
      }));
      ++count;
    });

    if (count > 0) {
      console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`);
    }

    done();
  }
};