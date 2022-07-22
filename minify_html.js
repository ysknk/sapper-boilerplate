// REFS: https://github.com/sveltejs/sapper/issues/348
'use strict';

var htmlMinifier = require('html-minifier');

function minify_html(html) {
    return htmlMinifier.minify(html, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        html5: true,
        ignoreCustomComments: [/^#/],
        minifyCSS: true,
        minifyJS: false,
        // removeAttributeQuotes: true,
        removeAttributeQuotes: false,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true
    });
}

exports.minify_html = minify_html;
//# sourceMappingURL=minify_html.js.map
