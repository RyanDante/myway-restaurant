import { FALLBACK_MENU } from "./constants";

interface EmailParams {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  specialRequests?: string;
  preorderType?: string;
  preorderedFood?: string;
  guestOrders?: string;
}

export async function sendReservationEmail(params: EmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not defined. Email confirmation skipped.");
    return;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  // Build the preorder HTML detail block
  let preorderHTML = "";
  if (params.preorderType === "same" && params.preorderedFood) {
    const item = FALLBACK_MENU.find((i) => i.id === params.preorderedFood);
    if (item) {
      preorderHTML = `
        <div style="background-color: #0d0d0d; border: 1px dashed rgba(212, 175, 55, 0.3); padding: 20px; border-radius: 8px; margin-top: 20px; text-align: left;">
          <h3 style="color: #d4af37; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-family: sans-serif;">Pre-ordered Dish (All Guests)</h3>
          <p style="margin: 5px 0 0; color: #fff; font-size: 15px; font-family: sans-serif;">${item.nameEn} - <span style="color: #888; font-size: 13px;">${item.price.toLocaleString()} XOF</span></p>
        </div>
      `;
    }
  } else if (params.preorderType === "different" && params.guestOrders) {
    try {
      const orders = JSON.parse(params.guestOrders);
      let orderLines = "";
      let total = 0;

      Object.entries(orders).forEach(([guestIndex, order]: [string, any]) => {
        let guestChoice = "";
        if (order.foodId) {
          const food = FALLBACK_MENU.find((i) => i.id === order.foodId);
          if (food) {
            guestChoice += `<div style="margin-bottom: 4px;">Food: <strong>${food.nameEn}</strong> (${food.price.toLocaleString()} XOF)</div>`;
            total += food.price;
          }
        }
        if (order.drinkId) {
          const drink = FALLBACK_MENU.find((i) => i.id === order.drinkId);
          if (drink) {
            guestChoice += `<div style="margin-bottom: 4px;">Drink: <strong>${drink.nameEn}</strong> (${drink.price.toLocaleString()} XOF)</div>`;
            total += drink.price;
          }
        }

        if (guestChoice) {
          orderLines += `
            <div style="margin-bottom: 15px; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px; font-family: sans-serif;">
              <div style="color: #d4af37; font-size: 11px; text-transform: uppercase; font-weight: bold; margin-bottom: 6px; letter-spacing: 0.5px;">Guest ${guestIndex}</div>
              <div style="color: #ccc; font-size: 13px; line-height: 1.4;">${guestChoice}</div>
            </div>
          `;
        }
      });

      if (orderLines) {
        preorderHTML = `
          <div style="background-color: #0d0d0d; border: 1px dashed rgba(212, 175, 55, 0.3); padding: 20px; border-radius: 8px; margin-top: 20px; text-align: left;">
            <h3 style="color: #d4af37; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; font-family: sans-serif;">Guest Pre-order Selections</h3>
            ${orderLines}
            <div style="text-align: right; color: #d4af37; font-size: 15px; font-weight: bold; margin-top: 10px; padding-top: 10px; border-top: 1px double rgba(212, 175, 55, 0.3); font-family: sans-serif;">
              Pre-order Total: ${total.toLocaleString()} XOF
            </div>
          </div>
        `;
      }
    } catch (e) {
      console.error("Failed to parse guest orders for email", e);
    }
  }

  // Construct Email Body HTML for Customer
  const customerEmailHtml = `
    <div style="background-color: #0a0a0a; color: #e5e5e5; font-family: 'Georgia', serif; padding: 40px 20px; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #1a1a1a; padding: 40px; border-radius: 12px; text-align: left;">
        <h1 style="color: #d4af37; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin-top: 0; margin-bottom: 20px; text-transform: uppercase; text-align: center;">
          Reservation Confirmed
        </h1>
        <div style="width: 80px; height: 1px; background-color: #d4af37; margin: 0 auto 30px;"></div>
        
        <p style="font-size: 15px; font-weight: 300; line-height: 1.6; color: #cccccc; margin-bottom: 30px; font-family: sans-serif;">
          Dear ${params.name},<br><br>
          Thank you for choosing MyWay Restaurant. We are pleased to confirm your table reservation. A summary of your booking is listed below:
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; text-align: left; font-size: 13px; font-family: sans-serif;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; font-weight: bold; text-align: right; color: #fff;">${params.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; font-weight: bold; text-align: right; color: #fff;">${params.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888;">Date</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; font-weight: bold; text-align: right; color: #fff;">${params.date}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888;">Time Slot</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; font-weight: bold; text-align: right; color: #fff;">${params.time}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888;">Guests</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; font-weight: bold; text-align: right; color: #fff;">${params.guests}</td>
          </tr>
          ${
            params.specialRequests
              ? `<tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888;">Special Requests</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #222; font-weight: bold; text-align: right; color: #fff;">${params.specialRequests}</td>
                </tr>`
              : ""
          }
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #888;">Pre-order Plan</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; font-weight: bold; text-align: right; color: #d4af37; text-transform: uppercase;">${
              params.preorderType === "different" ? "custom selections" : params.preorderType || "none"
            }</td>
          </tr>
        </table>
        
        ${preorderHTML}
        
        <div style="border-top: 1px solid #1a1a1a; padding-top: 25px; margin-top: 30px; font-size: 11px; color: #666; line-height: 1.6; font-family: sans-serif; text-align: center;">
          <p style="margin-bottom: 6px;">If you need to change your reservation details, please contact us directly at +237 6 51 37 18 00.</p>
          <p style="margin-bottom: 0;">MyWay Restaurant, Douala, Cameroon</p>
        </div>
      </div>
    </div>
  `;

  // Construct Email Body HTML for Restaurant Owner
  const adminEmailHtml = `
    <div style="background-color: #0a0a0a; color: #e5e5e5; font-family: sans-serif; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #1a1a1a; padding: 40px; border-radius: 12px;">
        <h2 style="color: #d4af37; font-size: 20px; font-weight: bold; text-transform: uppercase; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid #222; pb-3;">
          New Booking Notification
        </h2>
        <p style="font-size: 14px; color: #ccc; margin-bottom: 20px;">
          A new table booking has been placed on the website. Details are listed below:
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; text-align: left; font-size: 13px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #888;">Customer</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; font-weight: bold; color: #fff;">${params.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #888;">Email</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; font-weight: bold; color: #fff;">${params.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #888;">Phone</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; font-weight: bold; color: #fff;">${params.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #888;">Guests</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; font-weight: bold; color: #fff;">${params.guests}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #888;">Date / Time</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; font-weight: bold; color: #fff;">${params.date} at ${params.time}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #888;">Special Requests</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #222; color: #fff;">${params.specialRequests || "None"}</td>
          </tr>
        </table>
        
        ${preorderHTML}
      </div>
    </div>
  `;

  try {
    // Send Customer Confirmation Email
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: params.email,
        subject: "Reservation Confirmed - MyWay Restaurant",
        html: customerEmailHtml,
      }),
    });

    // If a notification email is set, send new booking alert to admin
    const adminNotifyEmail = process.env.ADMIN_NOTIFY_EMAIL || "reservations@myway-restaurant.com";
    if (adminNotifyEmail) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: adminNotifyEmail,
          subject: `New Reservation Request - ${params.name}`,
          html: adminEmailHtml,
        }),
      });
    }
  } catch (error) {
    console.error("Resend API failed to dispatch emails:", error);
  }
}
