import { useState } from "react";
import RuleGroup from "../RuleGroup/RuleGroup";
import LogicalSelect from "../LogicalSelect/LogicalSelect";
import "./RuleBuilder.css";

export type FieldName = "age" | "name";

export type Field = {
  type: "string" | "number";
  name: FieldName;
};

export type Operator = "==" | "!=" | ">" | "<" | ">=" | "<=";

export type RuleType = {
  id: string;
  field?: Field;
  operator?: Operator;
  value?: string | number;
  rules?: RuleType[];
  logicalOperator?: "AND" | "OR";
};

const RuleBuilder = () => {
  const [rootRule, setRootRule] = useState<RuleType>({
    id: "root",
    rules: [
      {
        id: "root-group-1",
        rules: [],
        logicalOperator: "AND",
      },
    ],
    logicalOperator: "AND",
  });

  const addRootGroup = () => {
    const newGroup: RuleType = {
      id: String(Date.now()),
      rules: [],
      logicalOperator: "AND",
    };
    setRootRule({ ...rootRule, rules: [...(rootRule.rules || []), newGroup] });
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRootRule({
      ...rootRule,
      logicalOperator: e.target.value as "AND" | "OR",
    });
  };

  const handleGroupChange = (index: number, group: RuleType) => {
    const newGroups = [...(rootRule.rules || [])];
    newGroups[index] = group;

    setRootRule({ ...rootRule, rules: newGroups });
  };

  const handleDeleteGroup = (index: number) => {
    const newGroups = (rootRule.rules || []).filter((_, i) => i !== index);

    setRootRule({ ...rootRule, rules: newGroups });
  };

  return (
    <div className="rule-builder">
      <div className="rule-builder_root-group">
        <div className="rule-builder_controls">
          <div className="rule-builder_title">Root group operator</div>
          <LogicalSelect
            value={rootRule.logicalOperator}
            onChange={handleOperatorChange}
          />
          <button className="button" onClick={addRootGroup}>
            + Add Root Group
          </button>
        </div>
        {rootRule.rules?.map((group, index) => (
          <RuleGroup
            key={group.id}
            ruleGroup={group}
            onChange={(newGroup) => handleGroupChange(index, newGroup)}
            onDelete={() => handleDeleteGroup(index)}
          />
        ))}
      </div>
      <pre className="json">{JSON.stringify(rootRule, null, 2)}</pre>
    </div>
  );
};

export default RuleBuilder;
