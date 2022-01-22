import React from 'react';
import Button from './Button';
const Header = ({ title, onAdd, propShowAdd }) => {

    return (
        < header className='header'>
            <h1>{title}</h1>
            <Button
                color={propShowAdd ? 'red' : 'green'}
                text={propShowAdd ? 'Close' : 'Add'}
                onClick={onAdd} />
        </header >)
};

Header.defaultProps = {
    title: 'Aplicatie Note Curs',
}
export default Header;