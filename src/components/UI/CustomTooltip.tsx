import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "antd";

export default function CustomTooltip({ title }: { title: string }) {
  return (
    <Tooltip
      color="#F8F8F8"
      trigger={["click"]}
      placement="topRight"
      title={title}
      overlayInnerStyle={{
        color: "#000000"
      }}
    >
      <Icon
        className="text-[#838383] min-w-[1rem] min-h-[1rem] inline-block ml-1 mb-1"
        icon="material-symbols:info-outline"
      />
    </Tooltip>
  );
}
