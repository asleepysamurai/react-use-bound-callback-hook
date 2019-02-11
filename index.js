/**
 * useBoundCallback hook for React
 *
 * What it does:
 *     1. Memoizes a callback function based on arguments array and context passed
 *     2. If callback function is not previously bound, binds it to passed in arguments and context
 *     3. If callback function is previously bound, checks if passed in arguments and context differ from last bound ones.
 *     4. If they differ, rebinds and returns rebound callback.
 *     5. Else returns previously bound callback.
 */

import { useRef } from 'react';

function useBoundCallback(callback, bindArgs = [], boundThis = null) {
    const boundMethodsRef = useRef(new Map());

    bindArgs = [boundThis, ...bindArgs];

    const { boundMethod, args: previousBindArgs = [] } = (boundMethodsRef.current.get(callback) || {});

    const changedBoundArgs = previousBindArgs.filter((prevArg, i) => bindArgs[i] !== prevArg);
    const isBoundArgsChanged = changedBoundArgs.length > 0 || bindArgs.length !== previousBindArgs.length;

    if (!isBoundArgsChanged && boundMethod)
        return boundMethod;

    const newBoundMethod = callback.bind(...bindArgs);
    boundMethodsRef.current.set(callback, { boundMethod: newBoundMethod, args: bindArgs });

    return newBoundMethod;
};

export { useBoundCallback };
