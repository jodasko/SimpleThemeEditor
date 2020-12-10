/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { render, fireEvent, cleanup, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Editor from '../editor';

afterEach(cleanup)

test('Make sure that this works', async () => {
    const {getByPlaceholderText, getByTestId, debug, getByText } = render(
        <Editor />
    );
    
    const valueInput = getByPlaceholderText('Use { } to variable references, e.g : {sizes.borderWidth}px solid {colors.primary}');
    const submitBtn = getByTestId('set-value-button');
    fireEvent.click(submitBtn)
    
    getByText('OK')

    debug()
});
