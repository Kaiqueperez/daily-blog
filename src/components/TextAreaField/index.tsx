type TextAreaProps = React.ComponentProps<"textarea"> & {
  label: string;
  htmlFor: string;
};

export const TextAreaField = (props: TextAreaProps) => {
  const { htmlFor, label } = props;
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>

      <textarea {...props} cols={30} rows={6}></textarea>
    </div>
  );
};
