import { ChevronDown } from "lucide-react";
import { Dropdown } from "rsuite";
import { TypeAttributes, WithAsProps } from "rsuite/esm/internals/types";
import { JSX, memo } from "react";

interface IProps {
  value: string;
  placement?: TypeAttributes.Placement8;
  items: {
    label: string;
    onClick: () => void;
  }[];
  className?: string;
  customRender?: boolean;
  renderToggle?: ((props: WithAsProps, ref: React.Ref<HTMLButtonElement>) => JSX.Element) | undefined;
}

const defaultRenderToggle = (
  props: WithAsProps,
  ref: React.Ref<HTMLButtonElement>,
  value: string,
  className?: string
) => (
  <button {...props} ref={ref} className={className ?? "flex items-center gap-2 text-sm"}>
    <span className="capitalize">{value?.toLowerCase()}</span>
    <ChevronDown size={18} className="text-primary-neutral-500 edit" />
  </button>
);

const DropdownList: React.FC<IProps> = ({ value, placement, items, className, customRender = false, renderToggle }) => {
  return (
    <Dropdown
      title="leftStart"
      className="w-full"
      placement={placement ?? "bottomStart"}
      renderToggle={(props, ref) =>
        customRender ? renderToggle?.(props, ref) : defaultRenderToggle(props, ref, value, className)
      }>
      {items.map((item, idx) => (
        <Dropdown.Item key={idx} onClick={item.onClick} className="w-full">
          <span className="text-sm font-satoshi font-normal text-primary-neutral-800 leading-5 tracking-7">
            {item.label}
          </span>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default memo(DropdownList);
