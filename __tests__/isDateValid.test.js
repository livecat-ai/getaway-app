import "regenerator-runtime/runtime";

import { appendToMemberExpression, exportAllDeclaration } from '@babel/types';
import { TestScheduler } from 'jest';
import { isDateValid } from '../src/client/js/isDateValid';

describe('testing if date validation works', () => {
    test('the date should be in the future', () => {
        const badDate = new Date(Date.now());
        badDate.setDate(badDate.getDate()-2);

        const goodDate = new Date(Date.now());
        goodDate.setDate(goodDate.getDate()+2);
        console.log(goodDate);

        expect(isDateValid(badDate)).toBeFalsy();
        expect(isDateValid(goodDate)).toBeTruthy();
    });
})