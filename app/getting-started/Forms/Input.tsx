import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = {
  registerFn: UseFormRegister<FieldValues>;
  fieldName: string;
  required?: boolean;
  placeholder: string;
  errors: FieldErrors;
  errorMsg: string;
  type?: string;
};
const Input = ({
  registerFn,
  fieldName,
  required = true,
  placeholder,
  errors,
  errorMsg,
  type = 'text',
}: InputProps) => {
  return (
    <input
      {...registerFn(fieldName, {
        required: required,
      })}
      type={type}
      placeholder={errors[fieldName] ? errorMsg : placeholder}
      className={`bg-silverGrey py-2 px-4 text-body-sm rounded-[1000px] border-[1px]  placeholder:capitalize placeholder:text-opacity-70 ${
        errors[fieldName]
          ? 'border-red-500 placeholder:text-red-500 placeholder:text-xs'
          : 'placeholder:text-black placeholder:text-body-sm border-transparent'
      }`}
    />
  );
};

export default Input;
