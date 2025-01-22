# Google Sheets Clone

A spreadsheet editing app built using **ReactJS**.

## Live Demo

**[Experience it Live](https://ar-uvce.netlify.app/)**
![Screenshot (3)](https://github.com/user-attachments/assets/6b22eada-43aa-4b41-800f-c9b3f530a10b)

---

## Features

1. **Editing Cells**
2. **Applying Styles to Cells**
   - Bold
   - Italic
   - Underline
   - Alignment (Left, Center, Right)
   - Font Family
   - Font Size
   - Text Color
   - Background Color
3. **Managing Sheets**
   - Create and edit multiple sheets.
4. **Formula Evaluation**
   - Dependent cell updates automatically reflect in other dependent cells.
   - Directly editing a cell removes its formula.
   - *Note*: Unary operators are not supported. For example, to calculate `10 - (-20)`, write it as `10 - (0 - 20)`.
5. **Data Import/Export**
   - Convert sheets to JSON.
   - Read from JSON.
6. **Copy-Paste Functionality**
   - Copy and paste single cells, including formulas and styles.
7. **Drag and Drop**
   - Allows copying the content of a cell by dragging it.
---


### Optimization
- Careful optimizations were made to reduce unnecessary re-renders when editing a single cell.
- State storage was restructured to achieve these optimizations.
- **React.memo** was used extensively to manage component re-renders effectively.

### CSS
- **Flexbox** was heavily utilized for layout.
- Creative techniques (e.g., using `opacity: 0` to hide components while keeping them clickable) were employed for UI elements like color pickers.

### Formula Parsing
- Formulas are evaluated using **infix-to-postfix conversion** and **postfix evaluation**.
- A **DFS-based cycle detection algorithm** ensures formulas are non-recursive.

> Overall, this project has been a valuable learning experience and an opportunity to explore advanced React concepts.
