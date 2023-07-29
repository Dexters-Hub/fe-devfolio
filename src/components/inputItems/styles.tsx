export const customStyles = {
    dropdownIndicator: () => ({
      display: 'none',
    }),
  
    control: (provided: any, state: any) => {
        const defaultStyles = {
          ...provided,
          
          padding: '1em',
          border: '1px solid #73EACC',
          borderRadius: '4px',
          boxShadow: 'none',
          '&:focus': {
            border: '1px solid #007aff',
            boxShadow: 'none',
          },
          backgroundColor: state.isFocused ? '#fff' : state.hasValue ? '#73EACC' : '#fff', 
          margin: '0.5em 0',
          
        };
    
        const opacityStyles = {
          opacity: state.isFocused || (!state.selectProps.menuIsOpen && state.hasValue) ? '1' : '1',
        };
    
        return {
          ...defaultStyles,
          ...opacityStyles,
        };
      },
    
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

    placeholder: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#A6A6A6' : '#073E32',
      opacity: state.isFocused ? '1' : '1',
    }),
  

    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#A6A6A6' : '#073E32',
      opacity: state.isFocused ? '1' : '1',
    }),
  

    option: (provided: any, state: any) => ({
      ...provided,
      cursor: 'pointer',
      color: state.isSelected ? '#fff' : '#7d7d7d',
      backgroundColor: state.isSelected ? '#007aff' : '#fff',
      '&:hover': {
        backgroundColor: state.isSelected ? '#007aff' : '#fff',
        color: state.isSelected ? '#fff' : '#7d7d7d',
      },
    }),
  };
  