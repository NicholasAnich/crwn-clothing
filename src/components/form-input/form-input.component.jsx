import './form-input.styles.scss';
export default function FormInput({ label, ...otherProps }) {
  return (
    <div className='group'>
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : null
          } form-input-label`}
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <input className={'form-input'} id={label} {...otherProps} />
    </div>
  );
}
