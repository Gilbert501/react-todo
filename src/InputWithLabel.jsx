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

export default InputWithLabel;