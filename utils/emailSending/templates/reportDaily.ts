const template = (data: any) => {
  `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Report</title>
        <style>
          table.steelBlueCols {
            border: 5px solid #555555;
            background-color: #555555;
            width: 400px;
            text-align: center;
            border-collapse: collapse;
          }
          table.steelBlueCols td,
          table.steelBlueCols th {
            border: 1px solid #555555;
            padding: 5px 10px;
          }
          table.steelBlueCols tbody td {
            font-size: 12px;
            font-weight: bold;
            color: #ffffff;
          }
          table.steelBlueCols td:nth-child(even) {
            background: #398aa4;
          }
          table.steelBlueCols thead {
            background: #398aa4;
            border-bottom: 10px solid #398aa4;
          }
          table.steelBlueCols thead th {
            font-size: 15px;
            font-weight: bold;
            color: #ffffff;
            text-align: left;
            border-left: 2px solid #398aa4;
          }
          table.steelBlueCols thead th:first-child {
            border-left: none;
          }
    
          table.steelBlueCols tfoot td {
            font-size: 13px;
          }
          table.steelBlueCols tfoot .links {
            text-align: right;
          }
          table.steelBlueCols tfoot .links a {
            display: inline-block;
            background: #ffffff;
            color: #398aa4;
            padding: 2px 8px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <table class="steelBlueCols">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>create At</th>
            </tr>
          </thead>
          <tbody>
            ${data.map((row: any) => {
              return `<tr>
                  <td>${row.id}</td>
                  <td>${row.name}</td>
                  <td>${row.created_at}</td>
                </tr>`;
            })}
          </tbody>
        </table>
      </body>
    </html>
    `;
};
export default template;
