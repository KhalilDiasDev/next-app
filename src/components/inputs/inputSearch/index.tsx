import { Input, theme } from "antd";
import { ChangeEvent } from "react";
import Icons from "@/data/icons";

interface SearchInputProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

export default function SearchInputComponent({
  placeholder,
  onSearch,
}: SearchInputProps) {
  const {
    token: { colorBorder },
  } = theme.useToken();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Input
      size="large"
      placeholder={placeholder}
      onChange={handleChange}
      prefix={<Icons.Search className="mr-2" color={colorBorder} />}
      allowClear
    />
  );
}
