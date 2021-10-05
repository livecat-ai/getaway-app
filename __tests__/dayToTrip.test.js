import "regenerator-runtime/runtime";

import { appendToMemberExpression, exportAllDeclaration } from '@babel/types';
import { TestScheduler } from 'jest';
import { daysToTrip } from '../src/server/dateUtils';

describe('testing if days to trip works', () => {
    test('should give us the correct number of days', () => {
        const tripDate = new Date(Date.now());
        tripDate.setDate(tripDate.getDate()+24);

        expect(daysToTrip(tripDate)).toBe(25);
    });
})