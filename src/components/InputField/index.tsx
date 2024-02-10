type InputFieldProps = React.ComponentProps<"input"> & {
  label: string;
  htmlFor: string;
  dataTestId: string;
};

export const InputField = (props: InputFieldProps) => {
  const { htmlFor, label, dataTestId } = props;
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>

      <input {...props} data-testid={dataTestId} />
    </div>
  );
};
