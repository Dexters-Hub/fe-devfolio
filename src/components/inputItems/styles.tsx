export const customStyles = {

    dropdownIndicator: () => ({
        display: 'none',
        }),

    // if not used the color should light green 73EACC with opacity as 50% and focus blue if active the default color
    control: (provided: any, state: any) => ({
        ...provided,
        padding: '1em',
        border: '1px solid #73EACC',
        borderRadius: '4px',
        boxShadow: 'none',
        '&:focus': {
            border: '1px solid #007aff',
            boxShadow: 'none',
        },
        backgroundColor: state.isFocused ? '#fff' : '#73EACC',
        margin: '0.5em 0',
        opacity: state.isFocused ? '1' : '1',
    }),

    // change color of text and background of the input field

    menu: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: '#fff',
        color: '#7d7d7d',
        borderRadius: '4px',
        boxShadow: 'none',
        '&:focus': {
            border: '1px solid #007aff',
            boxShadow: 'none',
        },
    }),

    // change color of Placeholder or text color when not active

    placeholder: (provided: any, state: any) => ({
        ...provided,
        color: state.isFocused ? '#A6A6A6' : '#073E32',
        opacity: state.isFocused ? '1' : '0.5',
    }),

    //margin between the input field

};
