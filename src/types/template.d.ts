export {};

declare global {
  namespace Template {
    interface Props {
      key: string;
      label: string;
      description?: string;
      data: any;
      logo?:any
      category:string
    }
  }
}
