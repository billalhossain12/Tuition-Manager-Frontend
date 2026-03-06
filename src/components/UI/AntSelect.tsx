import { Icon } from "@iconify/react/dist/iconify.js";
import { Select } from "antd";
type TOption = {
  label: string;
  value: string;
};
const selectOptions: TOption[] = [
  { value: "1", label: "Annually" },
  { value: "2", label: "Semi-Annually" },
  { value: "12", label: "Monthly" },
  { value: "52", label: "Weekly" },
  { value: "26", label: "Bi-weekly" },
  { value: "4", label: "Quarterly" },
];

export default function AntSelect() {
  return (
    <Select
      defaultValue="12"
      size="large"
      style={{ height: 45 }}
      className="rounded-[9px] md:w-[130px] w-[90px] hover:border-gray-400 border-[1px] border-gray-400 md:text-[1rem] text-[12px]"
      options={selectOptions}
      suffixIcon={
        <Icon
          className="md:text-[1.5rem] text-[1rem] text-gray-600"
          icon="iconamoon:arrow-down-2"
        />
      }
    ></Select>
  );
}
