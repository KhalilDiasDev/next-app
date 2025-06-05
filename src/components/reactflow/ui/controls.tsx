import FloatButtonGroupComponent from "@/components/buttons/floatButtonGroup";
import Icons from "@/data/icons";

import { useReactFlow } from "reactflow";

interface Props {
  onClose?: () => void;
  extraButtons?: Flow.ControlProps[][];
}

export default function FlowControlsComponent({
  onClose,
  extraButtons,
}: Props) {
  const { fitView, zoomIn, zoomOut } = useReactFlow();

  const handleFitView = () => fitView({ padding: 1 });

  const groups: Flow.ControlProps[][] = [
    onClose
      ? [
          {
            tooltip: "Close editor",
            icon: <Icons.Close />,
            id: "close-editor-btn",
            onClick: onClose,
          },
        ]
      : [],
    [
      {
        tooltip: "Zoom in",
        icon: <Icons.ZoomIn />,
        id: "zoom-in-btn",
        onClick: () => zoomIn(),
      },
      {
        tooltip: "Zoom out",
        icon: <Icons.ZoomOut />,
        id: "zoom-out-btn",
        onClick: () => zoomOut(),
      },
      {
        tooltip: "Fit view",
        icon: <Icons.Screen />,
        id: "fit-view-btn",
        onClick: handleFitView,
      },
      // {
      //   tooltip: "Fullscreen",
      //   onClick: handle.active ? handle.exit : handle.enter,
      //   id: "fullscreen-btn",
      //   icon: handle.active ? <Icons.MaximizeOff /> : <Icons.Maximize />,
      // },
    ],
    ...(extraButtons || []),
  ];

  return (
    <FloatButtonGroupComponent
      items={groups.filter((group) => group.length > 0)}
    />
  );
}
