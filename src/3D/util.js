/**
 * Factor a number by the given value and round to the nearest whole number
 */
export const factoredInteger = ( value, factor ) => (
    Math.round( value * ( 10 ** factor ) )
);
