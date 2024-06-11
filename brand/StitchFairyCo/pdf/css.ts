export const stitchTableCss = `
.pattern-table {
  border-collapse: collapse;
  border: 2px solid #222;
  margin: 0 auto;
  width: 100%;
  td {
    width: 12px;
    height: 12px;
    border: 1px solid #222;
    position: relative;
    text-align: center;
  }
  td a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--c);
    color: var(--t);
    position: absolute;
    font-size: 9px;
  }
  td:nth-child(5n) {
    border-right: 2px solid #222;
  }
  tr:nth-child(5n) {
    border-bottom: 2px solid #222;
  }
}

/* grid number */
.gn {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* column number in first row */
.cnf {
  top: calc(-100% - 2px);
  left: 0;
}

/* column number in last row */
.cnl {
  top: calc(100% + 2px);
  left: 0;
}

/* row number in first column */
.rnf {
  top: 0;
  left: calc(-100% - 2px);
}

/* row number in last column */
.rnl {
  top: 0;
  left: calc(100% + 2px);
}
`;
