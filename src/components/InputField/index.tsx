type InputFieldProps = React.ComponentProps<"input"> & {
  label: string;
  htmlFor: string;
};

export const InputField = (props: InputFieldProps) => {
  const { htmlFor, label } = props;
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>

      <input {...props} />
    </div>
  );
};
