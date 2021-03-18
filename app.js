const express = require("express");
const app = express();
const compression = require("compression");
const cors = require("cors");
const schedule = require("node-schedule");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(compression());

app.post("/alert", async (req, res) => {
  try {
    let { start_hour, start_minute, end_hour, end_minute, mode } = req.body;

    const date = new Date();

    const start_rule = new schedule.RecurrenceRule();
    start_rule.dayOfWeek = [0, new schedule.Range(0, 6)];
    start_rule.hour = Number(start_hour);
    start_rule.minute = Number(start_minute);
    const start_ndisturb = await schedule.scheduleJob(start_rule, () => {
      console.log("start_rule is on");
    });
    const end_rule = new schedule.RecurrenceRule();
    end_rule.dayOfWeek = [0, new schedule.Range(0, 6)];
    end_rule.hour = Number(end_hour);
    end_rule.minute = Number(end_minute);
    const end_ndisturb = await schedule.scheduleJob(end_rule, () => {
      console.log("end_rule is on");
    });
    if (mode === 0) return start_ndisturb.cancel() && end_ndisturb.cancel();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(8081, () => {
  console.log("on");
});
