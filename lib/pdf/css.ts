export const cssStyles = `
body {
  font-family: Inter, sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings: "slnt" 0;
  font-size: 14px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.demo-container {
  background-color: #242424;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
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
  justify-content: flex-start;
  gap: 24px;
  height: 100%;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header .logo {
  max-width: 100px;
  margin-bottom: 12px;
}

.title {
  font-weight: 600;
  font-size: 24px;
}

.subtitle {
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.columns {
  display: grid;
  gap: 36px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.page-bottom {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: auto;
}

.hoop-container {
  display: flex;
  justify-content: center;
}

.hoop {
  max-width: 100%;
}

.details table {
  font-size: 14px;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  td {
    border: 2px solid #ddd;
    padding: 6px 9px;
  }
  td:first-child {
    width: 30%;
    font-weight: bold;
    border-left: 0;
  }
  td:nth-child(2) {
  }
  td:last-child {
    border-right: 0;
  }
  tr:last-child td {
    border-bottom: 0;
  }
  tr:first-child td {
    border-top: 0;
  }
}

tr.aida {
  td span {
    display: block;
  }
  td span:nth-child(2) {
    font-size: 12px;
    opacity: 0.75;
  }
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}


.details p {
  font-size: 14px;
}

.details h2 {
  text-transform: uppercase;
  font-size: 18px;
  padding-bottom: 3px;
  border-bottom: 2px solid #222;
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
  border: 3px solid #dc2626;
  color: #dc2626;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: bold;
  margin-top: auto;
  font-size: 12px;
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
  position: relative;
  display: flex;
}

.pattern-footer-logo {
  max-height: 40px;
  opacity: 0.25;
}

.loop {
  max-width: 100%;
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
