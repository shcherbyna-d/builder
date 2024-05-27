import React, { SelectHTMLAttributes } from "react";
import { Field, FieldName, Operator, RuleType } from "../RuleBuilder/RuleBuilder";
import "./Rule.css"

const fields: Field[] = [
  {
    name: "age",
    type: "number",
  },
  {
    name: "name",
    type: "string",
  },
];

type RuleProps = {
  rule: RuleType;
  onChange: (rule: RuleType) => void;
  onDelete: () => void;
};

const Rule: React.FC<RuleProps> = ({ rule, onChange, onDelete }) => {
  const isGroup = rule.rules !== undefined;

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fieldType = fields.find(
      (field) => field.name === e.target.value
    )?.type;

    if (!fieldType) return;

    onChange({
      ...rule,
      field: {
        name: e.target.value as FieldName,
        type: fieldType,
      },
      value: "",
    });

    //Also, need to change Operator according to the field type
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...rule, operator: e.target.value as Operator });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      rule.field?.type === "number" ? Number(e.target.value) : e.target.value;

    onChange({ ...rule, value });
  };

  if (isGroup) {
    return null;
  }

  return (
    <div className="rule">
      <div className="rule_title">Rule</div>
      <div className="rule_content">
        <div className="rule_controls">
          <FieldSelect value={rule.field?.name} onChange={handleFieldChange} />
          <OperatorSelect
            value={rule.operator}
            onChange={handleOperatorChange}
          />
          <input
            type={rule.field?.type === "number" ? "number" : "text"}
            value={rule.value}
            onChange={handleValueChange}
          />
        </div>
        <div className="rule_delete">
          <button className="delete-button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rule;

interface OperatorSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const OperatorSelect = (props: OperatorSelectProps) => {
  const { ...rest } = props;

  return (
    <select {...rest}>
      <option value="==">==</option>
      <option value="!=">!=</option>
      <option value=">">{">"}</option>
      <option value="<">{"<"}</option>
      <option value=">=">{">="}</option>
      <option value="<=">{"<="}</option>
    </select>
  );
};

interface FieldSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const FieldSelect = (props: FieldSelectProps) => {
  const { ...rest } = props;

  return (
    <select {...rest}>
      {fields.map((field) => {
        return (
          <option key={field.name} value={field.name}>
            {field.name}
          </option>
        );
      })}
    </select>
  );
};
