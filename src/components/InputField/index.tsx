import { ForwardRefRenderFunction, forwardRef } from "react";

type InputFieldProps = React.ComponentProps<"input"> & {
  label: string;
  htmlFor: string;
  datatestid: string;
};

const InputField: ForwardRefRenderFunction<
  HTMLInputElement,
  InputFieldProps
> = (props: InputFieldProps, forwarRef) => {
  const { htmlFor, label, datatestid } = props;
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>

      <input {...props} data-testid={datatestid} ref={forwarRef} />
    </div>
  );
};

export default forwardRef(InputField);
