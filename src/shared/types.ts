export interface Category {
  id: string;
  name: string;
  widgets?: Widget[];
}

export interface Widget {
  id: string;
  name: string;
  text?: string;
  isChecked: boolean;
}

export type BaseWidgetProps = {
  categoryId: string;
  widgetId: string;
};

export type AddWidgetProps = BaseWidgetProps & {
  name: string;
  text?: string;
};

export type DeleteWidgetProps = BaseWidgetProps;

export type UpdateWidgetProps = BaseWidgetProps & {
  name: string;
  text?: string;
};

export type IncludesWidgetNameProps = {
  categoryId: string;
  widgetName: string;
};

export type IncludesWidgetIdProps = BaseWidgetProps;

export type CheckWidgetProps = BaseWidgetProps;
