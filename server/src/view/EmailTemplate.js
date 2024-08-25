export const verifyEmailTemplate = (username, verificationUrl) => {
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
                padding: 20px;
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
                padding: 15px 0;
                border-radius: 8px 8px 0 0;
                font-size: 24px;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .content {
                padding: 20px;
                font-size: 16px;
                line-height: 1.5;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                background-color: #023E7D;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                font-size: 18px;
                border: 2px solid #023E7D;
                transition: background-color 0.3s, color 0.3s;
            }
            .button:hover {
                background-color: #001F3F;
                color: #fff;
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
                display: flex;
                flex-direction: column;
                align-items: center;
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
                🎉 Welcome to DoctorZ! 🎉
            </div>
            <div class="content">
                <p>Hi ${username},</p>
                <p>We’re thrilled to have you join DoctorZ, your partner in health and wellness! 🩺😊</p>
                <p>To get started, we need you to verify your email. Just click the link below:</p>
                <a href="${verificationUrl}" class="button">🌟 Verify Your Email 🌟</a>
                <p>If you didn't request this, simply ignore this email. But if you did, we're excited to have you onboard!</p>
                <div class="info-message">
                    <p>If you haven't registered yet, what are you waiting for? 🏃‍♂️💨 <a href="/signup">Sign up</a> and join our health revolution today!</p>
                </div>
            </div>
            <div class="footer">
                Best wishes,<br>
                The DoctorZ Team<br>
                <small>Wishing you health and happiness! 🌟</small>
            </div>
        </div>
    </body>
    </html>
    `;
};
