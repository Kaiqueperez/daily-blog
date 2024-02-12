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
    <div className="flex flex-col items-center">
      <label htmlFor={htmlFor} className="text-2xl">
        {label}
      </label>

      <input
        {...props}
        data-testid={datatestid}
        className="rounded-2xl p-2"
        ref={forwarRef}
      />
    </div>
  );
};

export default forwardRef(InputField);
