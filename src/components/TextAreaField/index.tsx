import { ForwardRefRenderFunction, forwardRef } from "react";

type TextAreaProps = React.ComponentProps<"textarea"> & {
  label: string;
  htmlFor: string;
  datatestid: string;
};

export const TextAreaField: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = (props: TextAreaProps, forwardRef) => {
  const { htmlFor, label, datatestid } = props;
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>

      <textarea
        {...props}
        cols={30}
        rows={6}
        data-testid={datatestid}
        ref={forwardRef}
      />
    </div>
  );
};

export default forwardRef(TextAreaField);
