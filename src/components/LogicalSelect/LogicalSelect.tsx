import { SelectHTMLAttributes } from "react";
import "./LogicalSelect.css"

interface LogicalSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const LogicalSelect = (props: LogicalSelectProps) => {
  const { ...rest } = props;

  return (
    <select className="logical-select" {...rest}>
      <option value="AND">AND</option>
      <option value="OR">OR</option>
    </select>
  );
};

export default LogicalSelect;
