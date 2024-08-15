export const verificationSuccessTemplate = (username, signInUrl, signUpUrl) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                max-width: 600px;
                background: #fff;
                padding: 50px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .header {
                background-color: #023E7D;
                color: #fff;
                padding: 15px;
                border-radius: 8px 8px 0 0;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                padding: 20px;
                font-size: 16px;
                line-height: 1.5;
            }
            .button {
                display: inline-block;
                margin: 10px;
                color: #023E7D;
                text-decoration: none;
                font-weight: bold;
                font-size: 18px;
                transition: background-color 0.3s, color 0.3s;
            }
            .button:hover {
                text-decoration:underline;
            }
            .footer {
                font-size: 14px;
                color: #777;
                padding-top: 20px;
            }
            .emoji {
                font-size: 20px;
            }
            .info-message {
                background-color: #e2e3e5;
                color: #000;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #c6c8ca;
                margin-top: 20px;
            }
            a {
                color: #023E7D;
                text-decoration: none;
                font-weight: bold;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                🎉 Congratulations, ${username}! 🎉
            </div>
            <div class="content">
                <p>Woohoo! 🎊 Your email has been successfully verified. We’re thrilled to have you as part of the DoctorZ family! 🩺🌟</p>
                <p>Ready to get started? You can <a href="${signInUrl}" class="button">Sign In</a> to access your account or <a href="${signUpUrl}" class="button">Sign Up</a> if you want to add more details.</p>
                <p>If you have any questions or need assistance, feel free to reach out. We’re here to support you every step of the way! 🚀</p>
            </div>
            <div class="footer">
                Best regards,<br>
                The DoctorZ Team<br>
                <small>Wishing you a healthy and joyful experience with us! 🌟</small>
            </div>
        </div>
    </body>
    </html>
    `;
};
