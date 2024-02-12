import { ForwardRefRenderFunction, forwardRef } from "react";

type TextAreaProps = React.ComponentProps<"textarea"> & {
  label: string;
  htmlFor: string;
  datatestid: string;
};

export const TextAreaField: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = (props: TextAreaProps, ref) => {
  const { htmlFor, label, datatestid } = props;

  return (
    <div className="flex flex-col items-center">
      <label htmlFor={htmlFor} className="text-2xl">
        {label}
      </label>

      <textarea
        {...props}
        cols={30}
        rows={10}
        data-testid={datatestid}
        className="rounded-2xl p-2 "
        ref={ref}
      />
    </div>
  );
};

export default forwardRef(TextAreaField);
