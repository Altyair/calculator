import ts from "@wessberg/rollup-plugin-ts";
import serve from 'rollup-plugin-dev-server';

export default {
    // input: 'src/CalculatorFacade/index.ts',
    input: 'public/src/js/index.js',
    output: {
        file: 'public/dist/js/bundle.js',
        format: 'es'
    },

    watch: {
        chokidar: {},
        exclude: ['node_modules/**']
    },

    plugins: [
        ts({
            tsconfig: {
                allowSyntheticDefaultImports: true,
                allowJs: true
            }
        }),

        serve({
            open: true,
            host: 'localhost',
            port: 8080,
            contentBase: __dirname + '/public'
        })
    ]
};