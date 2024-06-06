import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import MyComponent from '../src/MyComponent'; // Adjust the import path as necessary
import SearchData from '../src/SearchListData';
import { jest, describe, test, expect } from '@jest/globals';



jest.useFakeTimers(); 

describe('MyComponent', () => {
    test('renders initial data', () => {
        const { getByTestId, getByText, toJSON } = render(<MyComponent data={SearchData} />);
        const input = getByTestId('search-input');
        expect(input).toBeTruthy();
        SearchData.forEach(item => {
            expect(getByText(item.name)).toBeTruthy();
        });
        expect(toJSON()).toMatchSnapshot();
    });

    test('filters data based on search input', async () => {
        const { getByTestId, toJSON } = render(<MyComponent data={SearchData} />);
        const input = getByTestId('search-input');
        fireEvent.changeText(input, 'Ap');
        expect(toJSON()).toMatchSnapshot();
    });




});