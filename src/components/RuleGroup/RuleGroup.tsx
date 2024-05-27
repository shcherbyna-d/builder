import React from "react";
import Rule from "../Rule/Rule";
import LogicalSelect from "../LogicalSelect/LogicalSelect";
import { RuleType } from "../RuleBuilder/RuleBuilder";
import "./RuleGroup.css"

type RuleGroupProps = {
  ruleGroup: RuleType;
  onChange: (ruleGroup: RuleType) => void;
  onDelete: () => void;
};

const RuleGroup: React.FC<RuleGroupProps> = ({
  ruleGroup,
  onChange,
  onDelete,
}) => {
  const addRule = () => {
    const newRule: RuleType = {
      id: String(Date.now()),
      field: { name: "age", type: "number" },
      operator: "==",
      value: 0,
    };
    onChange({ ...ruleGroup, rules: [...(ruleGroup.rules || []), newRule] });
  };

  const addGroup = () => {
    const newGroup: RuleType = {
      id: String(Date.now()),
      rules: [],
      logicalOperator: "AND",
    };

    onChange({ ...ruleGroup, rules: [...(ruleGroup.rules || []), newGroup] });
  };

  const handleRuleChange = (index: number, rule: RuleType) => {
    const newRules = [...(ruleGroup.rules || [])];
    newRules[index] = rule;

    onChange({ ...ruleGroup, rules: newRules });
  };

  const handleDeleteRule = (index: number) => {
    const newRules = (ruleGroup.rules || []).filter((_, i) => i !== index);
    
    onChange({ ...ruleGroup, rules: newRules });
  };

  const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...ruleGroup, logicalOperator: e.target.value as "AND" | "OR" });
  };

  return (
    <div className="rule-group">
      <div className="rule-group_header">
        <div className="rule-group_title">Group operator</div>
        <LogicalSelect
          value={ruleGroup.logicalOperator}
          onChange={handleOperatorChange}
        />
        <div className="rule-group_button-group">
          <button className="button" onClick={addRule}>
            + Add Rule
          </button>
          <button className="button" onClick={addGroup}>
            + Add Group
          </button>
          <button className="delete-button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
      {ruleGroup.rules?.map((rule, index) =>
        rule.rules ? (
          <RuleGroup
            key={rule.id}
            ruleGroup={rule}
            onChange={(newGroup) => handleRuleChange(index, newGroup)}
            onDelete={() => handleDeleteRule(index)}
          />
        ) : (
          <Rule
            key={rule.id}
            rule={rule}
            onChange={(newRule) => handleRuleChange(index, newRule)}
            onDelete={() => handleDeleteRule(index)}
          />
        )
      )}
    </div>
  );
};

export default RuleGroup;
