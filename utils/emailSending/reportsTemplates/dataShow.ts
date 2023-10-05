const template = (data: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
            /* Style for the whole email */
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }
    
            /* Style for the paragraph */
            p {
                margin: 10px 0;
            }
    
            /* Style for the table */
            table {
                border-collapse: collapse;
                width: 100%;
            }
    
            table, th, td {
                border: 1px solid #ccc;
            }
    
            th, td {
                padding: 8px;
                text-align: left;
            }
    
            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to Our Newsletter!</h1>
        <p>Dear Subscriber,</p>
        <p>We are delighted to have you as part of our newsletter community. Stay tuned for exciting updates and news from our company.</p>
        <p>Here's a summary of the latest developments:</p>
        <table>

            <tr>
                <th>email</th>
                <th>name</th>
                <th>nickName</th>
                <th>refererCode</th>
                <th>contactWith</th>
            </tr>
            ${data.map((res: any) => {
              return `
              <tr>
                <td>${res.email}</td>
                <td>${res.name}</td>
                <td>${res.nickName}</td>
                <td>${res.refererCode}</td>
                <td>${res.contactWith}</td>
            </tr>
                `;
            })}
        </table>
        <p>If you have any questions or need assistance, feel free to contact us. We're here to help!</p>
        <p>Best regards,</p>
        <p>The Newsletter Team</p>
    </body>
    </html>    
    `;
};

export default template;
