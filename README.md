# UI5 Fiori Dashboard

A comprehensive SAP UI5 Fiori dashboard application with date filtering capabilities, featuring modern design patterns and responsive layouts.

## Features

### 📅 Date Filtering
- **From Date** and **To Date** pickers for filtering dashboard data
- Default date range set to last 30 days
- Real-time validation and data refresh
- Date format: `MMM dd, yyyy` (e.g., "Jan 15, 2024")

### 📊 Key Performance Indicators (KPIs)
- **Total Sales** - Revenue metrics with trend indicators
- **Total Orders** - Order count with growth percentage
- **Average Order Value** - Per-order revenue calculation
- **Customer Count** - Unique customer metrics

### 📈 Dashboard Components
- **Interactive KPI Cards** - Hover effects and visual indicators
- **Chart Placeholders** - Ready for integration with charting libraries
- **Data Table** - Sortable transaction history with status indicators
- **Export Functionality** - Ready for Excel export implementation

### 🎨 Design Features
- **Fiori 3 Theme** - SAP's latest design language
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Accessibility Compliant** - WCAG guidelines followed
- **Smooth Animations** - Enhanced user experience

## Project Structure

```
ui5-fiori-dashboard/
├── webapp/
│   ├── controller/
│   │   ├── App.controller.js
│   │   └── Dashboard.controller.js
│   ├── view/
│   │   ├── App.view.xml
│   │   └── Dashboard.view.xml
│   ├── model/
│   │   └── models.js
│   ├── css/
│   │   └── style.css
│   ├── i18n/
│   │   └── i18n.properties
│   ├── Component.js
│   └── manifest.json
├── index.html
├── ui5.yaml
├── package.json
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install -g @ui5/cli
   npm install
   ```

2. **Run the Application**
   ```bash
   npm start
   # or
   ui5 serve
   ```

3. **Access the Dashboard**
   - Open your browser to `http://localhost:8080`
   - The dashboard will load with sample data

### Building for Production

```bash
npm run build
# or
ui5 build
```

## Usage Guide

### Date Filtering
1. **Set Date Range**: Use the "From Date" and "To Date" pickers in the filter panel
2. **Apply Filters**: Click the "Apply Filters" button or dates will auto-update
3. **Validation**: System prevents invalid date ranges (from > to)

### Dashboard Interaction
- **KPI Cards**: Hover to see enhanced visual effects
- **Data Table**: 
  - View recent transactions
  - Status indicators with color coding
  - Export functionality (click Excel icon)
- **Responsive**: Layout adapts to screen size automatically

## Technical Details

### Technology Stack
- **SAP UI5 1.120.0** - Latest LTS version
- **OpenUI5** - Open source version of UI5
- **Fiori 3 Theme** - SAP's design system
- **JavaScript ES6+** - Modern JavaScript features

### Key Libraries Used
- `sap.m` - Main control library
- `sap.f` - Fiori controls (cards, grids)
- `sap.ui.core` - Core framework
- `sap.suite.ui.commons` - Advanced controls

### Data Model
- **JSON Model** - Client-side data binding
- **Sample Data Generation** - 50 transactions with random data
- **Date Formatting** - Consistent date display across components

### Responsive Breakpoints
- **Phone**: < 768px - Single column layout
- **Tablet**: 768px - 1024px - Optimized grid
- **Desktop**: > 1024px - Full grid layout

## Customization

### Adding Real Data Source

Replace the sample data generation in `Dashboard.controller.js`:

```javascript
// Replace _generateSampleData with OData service call
_loadDashboardData: function () {
    var oModel = this.getOwnerComponent().getModel();
    oModel.read("/DashboardData", {
        filters: [/*date filters*/],
        success: this._onDataReceived.bind(this),
        error: this._onDataError.bind(this)
    });
}
```

### Integrating Charts

Add charting library (e.g., SAP VizFrame):

```javascript
// In manifest.json dependencies
"sap.viz": {}

// In view XML
<viz:VizFrame id="salesChart" 
              vizType="line" 
              width="100%" 
              height="300px"/>
```

### Custom Styling

Modify `webapp/css/style.css` for custom themes:

```css
/* Custom color scheme */
.kpiValue {
    color: #your-brand-color;
}

.kpiCard {
    border: 2px solid #your-accent-color;
}
```

## Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions  
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Internet Explorer**: 11+ (with polyfills)

## Performance Considerations

- **Lazy Loading**: Components load on-demand
- **Data Pagination**: Table grows incrementally
- **Optimized Rendering**: Virtual scrolling for large datasets
- **Caching**: Browser caching for static resources

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues:
- Create an issue in the repository
- Check SAP UI5 documentation: https://ui5.sap.com/
- SAP Community: https://community.sap.com/

---

**Built with ❤️ using SAP UI5 and Fiori Design Guidelines**
