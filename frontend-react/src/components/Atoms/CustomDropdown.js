import React, { useState } from 'react';
import {Dropdown} from 'react-bootstrap';

const CustomToggle = React.forwardRef(({ text, onClick, clear, onClear }, ref) => (
    <a
      href=""
      ref={ref}
      className="dropdown d-block text-left p-1"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {text}
      <div className="float-right">
        {clear ? <span onClick={onClear} className="pr-2"> <i className="fa fa-times text-dark  clear-type-list fa-lg"></i></span> : ""}
        <span className="pr-2"><i className="fa fa-caret-down text-info fa-lg"></i></span>
      </div>
    </a>
  ));
  

const CustomDropdown = (props) => {
    const [title, setTitle] = useState('Type');

    const onClearType = () => {
      setTitle('Type');
      props.selectTypeHandler('');
    }

    const onClick = (e) => {
      setTitle(e.target.text);
      props.selectTypeHandler(e.target.text);
    }
    return (
        <Dropdown  className="flex-fill text-center" data-testid="CustomDropdown">
            <Dropdown.Toggle as={CustomToggle} variant="secondary" text={title} clear={title !== 'Type'} onClear={onClearType} id="dropdown-basic" />

            <Dropdown.Menu className="w-100">
            {props.data.map((type) => {
                if (type) {
                return (
                    <Dropdown.Item key={type} eventKey="{type}" onClick={onClick} data-testid={'DropdownItem' + type}>{type}</Dropdown.Item>
                )}
            }
            )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropdown;