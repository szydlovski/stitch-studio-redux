export const cssStyles = `
body {
  font-family: sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.demo-container {
  background-color: #242424;
  display: flex;
  flex-direction: column;
  gap: 96px;
  justify-content: center;
  align-items: center;
  padding: 96px;

}

.paper {
  height: 1123px;
  width: 794px;
  background-color: #fff;
  padding: 36px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.columns {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.dataset-group {
  display: flex;
  gap: 12px;
}

.dataset {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dataset__label {
  font-weight: bold;
}

.dataset__value {
  font-weight: normal;
}

.copyright {
  border: 3px solid red;
  color: red;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-weight: bold;
  margin-top: auto;
}

.copyright p {
}

.pattern-page-container {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
}

.pattern-footer {
  flex: 1;
  background-color: #eee;
  padding: 12px;
  font-size: 10px;
}

.pattern-table {
  border-collapse: collapse;
  border: 2px solid #222;
  margin: 0 auto;
  td {
    width: 12px;
    height: 12px;
    border: 1px solid #222;
    position: relative;
    font-size: 2px;
    text-align: center;
    background-color: var(--c);
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
  font-size: 7px;
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
