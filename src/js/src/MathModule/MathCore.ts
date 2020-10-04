import {IMathCore} from './typings';

/**
 * Creates an instance MathCore.
 *
 * @constructor
 * @this {Math}
 *
 */
export default class MathCore implements IMathCore{

    constructor () {}

    /**
     * Performs addition of values
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    sum ( a: number, b: number ): number {
        return a + b;
    }

    /**
     * Performs multiplication of values
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    multiple ( a: number, b: number ): number {
        return a * b;
    }

    /**
     * Performs division of values
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    division ( a: number, b: number ): number {
        return a / b;
    }

    /**
     * Performs subtraction of values
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    subtraction( a: number, b: number ): number {
        return  a - b;
    }

    /**
     * Calculates the root of a number
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     */
    sqrt ( a: number ): number {
        return Math.sqrt( a );
    }

    /**
     * Calculates the degree of number
     *
     * @public
     * @this {Math}
     * @param {Number} a First value
     * @param {Number} b Second value
     */
    pow( a: number, b: number ): number {
        return Math.pow( a, b );
    }
}
