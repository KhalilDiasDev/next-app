import {
  Form,
  FormItemProps,
  Input,
  InputNumber,
  InputNumberProps,
  InputProps,
  Select,
  SelectProps,
  Switch,
  SwitchProps,
} from "antd";
import { TextAreaProps } from "antd/es/input";

type InputOptionProps =
  | InputProps
  | InputNumberProps
  | TextAreaProps
  | SwitchProps
  | SelectProps;

export interface FormInputItemProps {
  name: string;
  label: string;
  type: string;
  props?: InputOptionProps;
  rules?: FormItemProps["rules"];
  defaultValue?: any;
}

const renderInputElement = (
  type: string,
  props?: InputOptionProps,
  onChange?: (value: any) => void
) => {
  switch (type) {
    case "number":
      return (
        <InputNumber
          style={{ width: "100%" }}
          onChange={onChange}
          {...(props as InputNumberProps)}
        />
      );
    case "textarea":
      return (
        <Input.TextArea
          rows={4}
          {...(props as TextAreaProps)}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      );
    case "boolean":
      return <Switch {...(props as SwitchProps)} onChange={onChange} />;
    case "select":
      return <Select {...(props as SelectProps)} onChange={onChange} />;

    default:
      return (
        <Input
          {...(props as InputProps)}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      );
  }
};

function DynamicFormItem({
  item: { name, label, type, props, rules, defaultValue },
  onChange,
}: {
  item: FormInputItemProps;
  onChange?: (value: any) => void;
}) {
  let extraProps: { [x: string]: FormItemProps } = {
    boolean: { valuePropName: "checked" },
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      initialValue={defaultValue}
      {...(extraProps[type] || {})}
    >
      {renderInputElement(type, props as InputOptionProps, onChange)}
    </Form.Item>
  );
}

export function FormattedInputComponent(
  this: any,
  {
    items,
    onChange,
  }: {
    items?: FormInputItemProps[];
    onChange?: (field: string, value: any) => void;
  }
) {
  return (
    <>
      {items?.map((item) => (
        <DynamicFormItem
          item={item}
          key={item.name}
          onChange={onChange?.bind(this, item.name)}
        />
      ))}
    </>
  );
}
