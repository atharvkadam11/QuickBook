import Queue from "bull";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "geallapallymahithkumar@gmail.com",
    pass: "bjfvflfydwjahdbr",
  },
});

async function run() {
  const messageQueue = new Queue("messageQueue");

  messageQueue.process(async (job) => {
    console.log("Processing : " + job.id);
    console.log("Processing data : " + job.data.name);
    console.log("Processing data : " + job.data.email);

    const name = job.data.name;
    const email = job.data.email;
    const theatreName = job.data.theatreName;
    const movieName = job.data.movieName;
    const seatNumbers = job.data.seatNumbers;

    const mailOptions = {
      from: "geallapallymahithkumar@gmail.com",
      to: email,
      subject: "Event Booking Confirmation",
      html: `<p>Dear ${name},</p>
             <p>Thank you for booking the event "${movieName}"</p>
             <p> The booking venue is "${theatreName}"</p> 
             <p> Seat Numbers is/are "${seatNumbers}"</p>
             
             <p>We look forward to seeing you there!</p>
             <p>Best regards,<br>Your Event Team</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return;
  });
}
run().catch(console.dir);
