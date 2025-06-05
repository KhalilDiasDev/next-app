import { EditFilled } from "@ant-design/icons";
import { Button } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface EditButtonComponentProps {
    onClick?: () => void;
    size?: SizeType;
    [x: string]: any;
}

export default function EditButtonComponentProps({
    onClick,
    size = "small",
    ...rest
}: EditButtonComponentProps) {
    return (
        <Button style={{ marginRight: '5px' }} size={size} onClick={onClick} {...rest}>
            <EditFilled rev="" />
        </Button>
    );
}
