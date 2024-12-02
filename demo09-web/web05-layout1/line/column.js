// 通过给一个元素添加 column-count 或 column-width, 使得该元素变成`multicol`容器
// column-count指最大列数, column-width指最小宽度.
const Column = (props = {}) => {
  const {
    minWidth = 1,
    maxCount = 1,
    gap = 0,
    colRule = { lineColor: "gray", lineStyle: "solid", lineWidth: "1px" },
    fill = "balance",
  } = props;
  const { lineStyle, lineColor, lineWidth } = colRule;

  const column = document.createElement("div");
  // 最大列数
  column.style.setProperty("column-count", maxCount); // n
  // 最小列宽
  column.style.setProperty("column-width", minWidth); // % rem px
  // 列间隙
  column.style.setProperty("column-gap", gap); // % rem px
  // 列与列分割线 - 线宽
  column.style.setProperty("column-rule-width", lineWidth); // px rem
  // 列与列分割线 - 形状
  column.style.setProperty("column-rule-style", lineStyle); // dotted solid
  // 列与列分割线 - 颜色
  column.style.setProperty("column-rule-color", lineColor); // color
  // 均匀填充空间 / 自动填充空间
  column.style.setProperty("column-fill", fill); // balance / auto
  return column;
};

const column = Column();

const Col = (props = {}) => {
  const { span, breakBefore, breakAfter, breakInsider, ...value } = props;
  const { id, content } = value;
  const col = document.createElement("div");
  // 是否跨列显示
  column.style.setProperty("column-span", "all"); // none / all
  // 强制分列
  column.style.setProperty("break-before", breakBefore); // column
  // 强制分列
  column.style.setProperty("break-after", breakAfter); // column
  // 避免分列
  column.style.setProperty("break-inside", breakInsider); // avoid
  if (id) {
    col.id = id;
  }
  if (content) {
    col.textContent = content;
  }
  return col;
};

const col = Col();

column.appendChild(col);
