import { Button, Divider, FloatButton, theme, Tooltip } from "antd";

interface FloatButtonGroupComponentProps {
  items: Flow.ControlProps[][];
  position?: { left?: number; right?: number; top?: number };
}

export default function FloatButtonGroupComponent({
  items,
  position = { left: 1, top: 1 },
}: FloatButtonGroupComponentProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function getBorderRadius(index: number, itemIndex: number) {
    if (index === 0 && itemIndex === 0) {
      return "18px 18px 0 0";
    }

    if (
      index === items.length - 1 &&
      itemIndex === (items.at(-1)?.length || 0) - 1
    ) {
      return "0 0 18px 18px";
    }

    return 0;
  }

  return (
    <Button.Group
      className="flex flex-col shadow-md items-center absolute z-[100] scale-75 origin-top-right rounded-lg py-4 px-2"
      style={{
        backgroundColor: colorBgContainer,
        left: position.left !== undefined ? `${position.left}rem` : undefined,
        right:
          position.right !== undefined ? `${position.right}rem` : undefined,
        top: `${position?.top !== undefined ? position?.top : 1}rem`,
      }}
    >
      {items.map((group, index) => (
        <div key={`group-${index}`} className="flex flex-col gap-1">
          {index !== 0 && (
            <div className="mx-1">
              <Divider className="my-2" />
            </div>
          )}
          {group.map((item, itemIndex) => (
            <Tooltip title={item.tooltip} key={`${index}-${itemIndex}`}>
              <Button
                type="text"
                style={{
                  opacity: item.disabled ? 0.5 : 1,
                  cursor: item.disabled ? "not-allowed" : "pointer",
                }}
                onClick={item.disabled ? undefined : item.onClick}
                icon={item.icon}
              />
            </Tooltip>
          ))}
        </div>
      ))}
    </Button.Group>
  );
}
