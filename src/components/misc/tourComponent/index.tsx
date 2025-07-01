import { Popconfirm, Tour } from "antd";
import Icons from "@/data/icons";

interface Props {
  title: string;
  description: string;
  steps: any;
  children?: JSX.Element;
}

export default function TourComponent({
  title,
  description,
  steps,
  children = (
    <Icons.Help size={"20px"} style={{ opacity: 0.5, marginTop: 5 }} />
  ),
}: Props) {

  return (
    <>
    
    
    </>
  );
}
