import ts from "@wessberg/rollup-plugin-ts";

export default {
    input: 'src/js/src/CalculatorFacade/index.ts',
    output: {
        file: 'public/dist/js/bundle.js',
        format: 'es'
    },

    plugins: [
        ts({
            tsconfig: {
                allowSyntheticDefaultImports: true,
                allowJs: true
            }
        })
    ]
};