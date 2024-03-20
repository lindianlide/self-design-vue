

export namespace CForm {
  enum CustomColumnType {
    INDEX = "index",
    INPUT = "input",
    TEXTAREA = "textarea",
    SELECT = "select",
    DATE = "date",
    TIME = "time",
    DATETIME = "datetime",
    WEEK = "week",
    MONTH = "month",
    QUARTER = "quarter",
    YEAR = "year",
    RANGE = "range",
  }

  interface CustomColumnProps {
    type?: CustomColumnType;
    invisible?: boolean;
    visible?: boolean;
    required?: boolean;
    editable?: boolean;
    drag?: boolean;
    options?: Record<string, any>;
    searchInvisible?: boolean;
    formInvisible?: boolean;
    tableInvisible?: boolean;
    formatter?: () => any;
    renderFormItem?: (
      value?: any,
      record?: Record<string, any> | undefined
    ) => VNode;
    scopedSlots?: {
      customRender?: string;
      customFormRender?: string;
      customEditorRender?: string;
    };
  }
}
