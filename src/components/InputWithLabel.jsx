import PropTypes from 'prop-types';
import style from './App.module.css';

const InputWithLabel = ({id,value,onChange,children}) => {
    return (
        <>
            <label htmlFor={id} className={style.label}>{children}</label>
            <input 
              type='text'
              name="title"
              id={id}
              value={value}
              autoFocus
              onChange={onChange}
             />
        </>
    );
}

InputWithLabel.propTypes = {
  
    id:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    children:PropTypes.node.isRequired
   
  }
export default InputWithLabel;